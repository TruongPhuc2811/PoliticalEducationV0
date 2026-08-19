package vn.pes.auth.application;

import java.time.Clock;
import java.time.LocalDateTime;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.pes.auth.Invitation;
import vn.pes.auth.InvitationStatus;
import vn.pes.auth.repository.InvitationRepository;
import vn.pes.user.Account;
import vn.pes.user.OrgUnit;
import vn.pes.user.OrgUnitType;
import vn.pes.user.UserAssignment;
import vn.pes.user.UserAssignmentHistory;
import vn.pes.user.repository.AccountRepository;
import vn.pes.user.repository.OrgUnitRepository;
import vn.pes.user.repository.UserAssignmentHistoryRepository;
import vn.pes.user.repository.UserAssignmentRepository;

@Service
public class SelfRegistrationService {

    private final AccountRepository accountRepository;
    private final InvitationRepository invitationRepository;
    private final OrgUnitRepository orgUnitRepository;
    private final UserAssignmentRepository userAssignmentRepository;
    private final UserAssignmentHistoryRepository userAssignmentHistoryRepository;
    private final PasswordEncoder passwordEncoder;
    private final Clock clock;
    private final InvitationCodeDigest invitationCodeDigest;

    public SelfRegistrationService(
            AccountRepository accountRepository,
            InvitationRepository invitationRepository,
            OrgUnitRepository orgUnitRepository,
            UserAssignmentRepository userAssignmentRepository,
            UserAssignmentHistoryRepository userAssignmentHistoryRepository,
            PasswordEncoder passwordEncoder,
            Clock clock) {
        this.accountRepository = accountRepository;
        this.invitationRepository = invitationRepository;
        this.orgUnitRepository = orgUnitRepository;
        this.userAssignmentRepository = userAssignmentRepository;
        this.userAssignmentHistoryRepository = userAssignmentHistoryRepository;
        this.passwordEncoder = passwordEncoder;
        this.clock = clock;
        this.invitationCodeDigest = new InvitationCodeDigest();
    }

    @Transactional
    public RegistrationResult register(RegistrationCommand command) {
        validateCommand(command);

        LocalDateTime now = LocalDateTime.now(clock);
        byte[] invitationCodeHash = invitationCodeDigest.sha256(command.invitationCode());
        Invitation invitation = invitationRepository.findByCodeHash(invitationCodeHash)
                .orElseThrow(InvalidInvitationException::new);

        validateInvitation(invitation, now);

        if (accountRepository.existsByUsername(command.username())) {
            throw new DuplicateUsernameException();
        }

        OrgUnit orgUnit = orgUnitRepository.findById(invitation.getOrgUnitId())
                .orElseThrow(InvitationOrgNotFoundException::new);
        if (orgUnit.getUnitType() != OrgUnitType.TIEU_DOI) {
            throw new InvitationOrgNotTieuDoiException();
        }

        String passwordHash = passwordEncoder.encode(command.rawPassword());
        Account account = accountRepository.save(Account.registeredUser(
                command.username(), passwordHash, command.displayName(), now, now));
        Long accountId = account.getId();
        if (accountId == null) {
            throw new IllegalStateException("Persisted account must have an ID.");
        }

        Long orgUnitId = invitation.getOrgUnitId();
        userAssignmentRepository.save(UserAssignment.initialAssignment(accountId, orgUnitId, now, now));
        userAssignmentHistoryRepository.save(
                UserAssignmentHistory.initialAssignment(accountId, orgUnitId, now, now));
        invitation.consume(accountId, now);

        return new RegistrationResult(accountId, account.getUsername(), account.getDisplayName());
    }

    private void validateInvitation(Invitation invitation, LocalDateTime now) {
        if (invitation.getStatus() != InvitationStatus.ACTIVE) {
            throw new InvalidInvitationException();
        }
        if (invitation.getExpiresAt() != null && !now.isBefore(invitation.getExpiresAt())) {
            throw new InvalidInvitationException();
        }
    }

    private void validateCommand(RegistrationCommand command) {
        if (command == null
                || isBlank(command.username())
                || command.username().length() > 100
                || isBlank(command.rawPassword())
                || !command.rawPassword().equals(command.passwordConfirmation())
                || isBlank(command.displayName())
                || command.displayName().length() > 200
                || isBlank(command.invitationCode())) {
            throw new IllegalArgumentException("Registration input is invalid.");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
