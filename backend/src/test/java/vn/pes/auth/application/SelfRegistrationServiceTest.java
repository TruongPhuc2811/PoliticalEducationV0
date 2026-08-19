package vn.pes.auth.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.security.crypto.password.PasswordEncoder;
import vn.pes.auth.Invitation;
import vn.pes.auth.InvitationStatus;
import vn.pes.auth.repository.InvitationRepository;
import vn.pes.user.Account;
import vn.pes.user.OrgUnit;
import vn.pes.user.OrgUnitType;
import vn.pes.user.SystemRole;
import vn.pes.user.UserAssignment;
import vn.pes.user.UserAssignmentHistory;
import vn.pes.user.repository.AccountRepository;
import vn.pes.user.repository.OrgUnitRepository;
import vn.pes.user.repository.UserAssignmentHistoryRepository;
import vn.pes.user.repository.UserAssignmentRepository;

class SelfRegistrationServiceTest {

    private static final Clock CLOCK = Clock.fixed(Instant.parse("2026-08-19T12:00:00Z"), ZoneId.of("UTC"));
    private static final LocalDateTime NOW = LocalDateTime.ofInstant(CLOCK.instant(), CLOCK.getZone());

    private final AccountRepository accountRepository = mock(AccountRepository.class);
    private final InvitationRepository invitationRepository = mock(InvitationRepository.class);
    private final OrgUnitRepository orgUnitRepository = mock(OrgUnitRepository.class);
    private final UserAssignmentRepository assignmentRepository = mock(UserAssignmentRepository.class);
    private final UserAssignmentHistoryRepository historyRepository = mock(UserAssignmentHistoryRepository.class);
    private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    private final OrgUnit tieuDoi = mock(OrgUnit.class);
    private final Account persistedAccount = mock(Account.class);

    private SelfRegistrationService service;

    @BeforeEach
    void setUp() {
        service = new SelfRegistrationService(
                accountRepository,
                invitationRepository,
                orgUnitRepository,
                assignmentRepository,
                historyRepository,
                passwordEncoder,
                CLOCK);
        when(tieuDoi.getUnitType()).thenReturn(OrgUnitType.TIEU_DOI);
        when(persistedAccount.getId()).thenReturn(99L);
        when(persistedAccount.getUsername()).thenReturn("new-user");
        when(persistedAccount.getDisplayName()).thenReturn("New User");
        when(accountRepository.save(any(Account.class))).thenReturn(persistedAccount);
        when(passwordEncoder.encode("raw-password")).thenReturn("{bcrypt}encoded-password");
    }

    @Test
    void registersAtomicallyWithInvitationScopedInitialAssignments() {
        Invitation invitation = activeInvitation(NOW.plusDays(1));
        stubHappyPath(invitation);

        RegistrationResult result = service.register(command());

        ArgumentCaptor<Account> accountCaptor = ArgumentCaptor.forClass(Account.class);
        ArgumentCaptor<UserAssignment> assignmentCaptor = ArgumentCaptor.forClass(UserAssignment.class);
        ArgumentCaptor<UserAssignmentHistory> historyCaptor = ArgumentCaptor.forClass(UserAssignmentHistory.class);
        verify(accountRepository).save(accountCaptor.capture());
        verify(assignmentRepository).save(assignmentCaptor.capture());
        verify(historyRepository).save(historyCaptor.capture());

        assertThat(result).isEqualTo(new RegistrationResult(99L, "new-user", "New User"));
        assertThat(accountCaptor.getValue().getPasswordHash()).isEqualTo("{bcrypt}encoded-password");
        assertThat(accountCaptor.getValue().getRole()).isEqualTo(SystemRole.USER);
        assertThat(accountCaptor.getValue().getClassification()).isNull();
        assertThat(assignmentCaptor.getValue().getAccountId()).isEqualTo(99L);
        assertThat(assignmentCaptor.getValue().getOrgUnitId()).isEqualTo(20L);
        assertThat(historyCaptor.getValue().getOrgUnitId()).isEqualTo(20L);
        assertThat(assignmentCaptor.getValue().getEffectiveFrom()).isEqualTo(NOW);
        assertThat(historyCaptor.getValue().getEffectiveFrom()).isEqualTo(NOW);
        assertThat(historyCaptor.getValue().getEffectiveTo()).isNull();
        assertThat(invitation.getStatus()).isEqualTo(InvitationStatus.CONSUMED);
        assertThat(invitation.getConsumedByAccountId()).isEqualTo(99L);
        assertThat(invitation.getConsumedAt()).isEqualTo(NOW);
    }

    @Test
    void hashesRawInvitationUsingSha256Utf8BeforeLookup() throws Exception {
        Invitation invitation = activeInvitation(null);
        stubHappyPath(invitation);

        service.register(command());

        ArgumentCaptor<byte[]> digestCaptor = ArgumentCaptor.forClass(byte[].class);
        verify(invitationRepository).findByCodeHash(digestCaptor.capture());
        byte[] digest = digestCaptor.getValue();
        assertThat(digest).hasSize(32);
        assertThat(digest).containsExactly(
                MessageDigest.getInstance("SHA-256").digest("invite-code".getBytes(StandardCharsets.UTF_8)));
    }

    @Test
    void rejectsInvitationNotFoundWithoutMutations() {
        when(invitationRepository.findByCodeHash(any(byte[].class))).thenReturn(java.util.Optional.empty());

        assertThatThrownBy(() -> service.register(command())).isInstanceOf(InvalidInvitationException.class);

        verify(accountRepository, never()).save(any());
        verify(assignmentRepository, never()).save(any());
        verify(historyRepository, never()).save(any());
    }

    @Test
    void rejectsEveryNonActiveInvitationStatus() {
        for (InvitationStatus status : new InvitationStatus[] {
                InvitationStatus.DISABLED, InvitationStatus.CONSUMED, InvitationStatus.EXPIRED
        }) {
            Invitation invitation = Invitation.issued(new byte[32], 20L, 30L, status, null, NOW, NOW);
            when(invitationRepository.findByCodeHash(any(byte[].class))).thenReturn(java.util.Optional.of(invitation));

            assertThatThrownBy(() -> service.register(command())).isInstanceOf(InvalidInvitationException.class);
        }

        verify(accountRepository, never()).existsByUsername(any());
        verify(accountRepository, never()).save(any());
    }

    @Test
    void rejectsActiveInvitationWhenExpiryHasPassedOrEqualsNow() {
        for (LocalDateTime expiry : new LocalDateTime[] {NOW.minusNanos(1), NOW}) {
            when(invitationRepository.findByCodeHash(any(byte[].class)))
                    .thenReturn(java.util.Optional.of(activeInvitation(expiry)));

            assertThatThrownBy(() -> service.register(command())).isInstanceOf(InvalidInvitationException.class);
        }

        verify(accountRepository, never()).existsByUsername(any());
    }

    @Test
    void allowsActiveInvitationWithoutExpiry() {
        stubHappyPath(activeInvitation(null));

        service.register(command());

        verify(accountRepository).save(any(Account.class));
    }

    @Test
    void rejectsDuplicateUsernameBeforeOrganizationOrMutations() {
        Invitation invitation = activeInvitation(null);
        when(invitationRepository.findByCodeHash(any(byte[].class))).thenReturn(java.util.Optional.of(invitation));
        when(accountRepository.existsByUsername("new-user")).thenReturn(true);

        assertThatThrownBy(() -> service.register(command())).isInstanceOf(DuplicateUsernameException.class);

        verify(orgUnitRepository, never()).findById(any());
        verify(accountRepository, never()).save(any());
        verify(assignmentRepository, never()).save(any());
    }

    @Test
    void rejectsMissingInvitationOrganization() {
        Invitation invitation = activeInvitation(null);
        when(invitationRepository.findByCodeHash(any(byte[].class))).thenReturn(java.util.Optional.of(invitation));
        when(orgUnitRepository.findById(20L)).thenReturn(java.util.Optional.empty());

        assertThatThrownBy(() -> service.register(command())).isInstanceOf(InvitationOrgNotFoundException.class);

        verify(accountRepository, never()).save(any());
    }

    @Test
    void rejectsDaiDoiAndTrungDoiInvitationOrganizations() {
        Invitation invitation = activeInvitation(null);
        when(invitationRepository.findByCodeHash(any(byte[].class))).thenReturn(java.util.Optional.of(invitation));
        for (OrgUnitType type : new OrgUnitType[] {OrgUnitType.DAI_DOI, OrgUnitType.TRUNG_DOI}) {
            OrgUnit invalidUnit = mock(OrgUnit.class);
            when(invalidUnit.getUnitType()).thenReturn(type);
            when(orgUnitRepository.findById(20L)).thenReturn(java.util.Optional.of(invalidUnit));

            assertThatThrownBy(() -> service.register(command())).isInstanceOf(InvitationOrgNotTieuDoiException.class);
        }

        verify(accountRepository, never()).save(any());
    }

    @Test
    void encodesRawPasswordBeforeCreatingAccount() {
        stubHappyPath(activeInvitation(null));

        service.register(command());

        verify(passwordEncoder).encode("raw-password");
        ArgumentCaptor<Account> accountCaptor = ArgumentCaptor.forClass(Account.class);
        verify(accountRepository).save(accountCaptor.capture());
        assertThat(accountCaptor.getValue().getPasswordHash()).isEqualTo("{bcrypt}encoded-password");
        assertThat(accountCaptor.getValue().getPasswordHash()).isNotEqualTo("raw-password");
    }

    @Test
    void propagatesAssignmentFailureInsteadOfReturningSuccessOrConsumingInvitation() {
        Invitation invitation = activeInvitation(null);
        stubHappyPath(invitation);
        when(assignmentRepository.save(any(UserAssignment.class))).thenThrow(new IllegalStateException("persistence"));

        assertThatThrownBy(() -> service.register(command())).isInstanceOf(IllegalStateException.class);

        verify(historyRepository, never()).save(any());
        assertThat(invitation.getStatus()).isEqualTo(InvitationStatus.ACTIVE);
    }

    @Test
    void commandAndResultDoNotExposeOrganizationRoleClassificationOrSecrets() {
        assertThat(RegistrationCommand.class.getRecordComponents())
                .extracting(component -> component.getName())
                .containsExactly("username", "rawPassword", "passwordConfirmation", "displayName", "invitationCode");
        assertThat(RegistrationResult.class.getRecordComponents())
                .extracting(component -> component.getName())
                .containsExactly("accountId", "username", "displayName");
    }

    private void stubHappyPath(Invitation invitation) {
        when(invitationRepository.findByCodeHash(any(byte[].class))).thenReturn(java.util.Optional.of(invitation));
        when(accountRepository.existsByUsername("new-user")).thenReturn(false);
        when(orgUnitRepository.findById(20L)).thenReturn(java.util.Optional.of(tieuDoi));
    }

    private Invitation activeInvitation(LocalDateTime expiresAt) {
        return Invitation.issued(new byte[32], 20L, 30L, InvitationStatus.ACTIVE, expiresAt, NOW, NOW);
    }

    private RegistrationCommand command() {
        return new RegistrationCommand("new-user", "raw-password", "raw-password", "New User", "invite-code");
    }
}
