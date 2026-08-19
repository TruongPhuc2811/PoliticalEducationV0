package vn.pes.user;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import org.junit.jupiter.api.Test;

class RegistrationEntityConstructionTest {

    @Test
    void registeredUserForcesAcceptedInitialAccountState() {
        LocalDateTime createdAt = LocalDateTime.of(2026, 8, 19, 12, 0);
        LocalDateTime updatedAt = createdAt.plusSeconds(1);

        Account account = Account.registeredUser(
                "new-user", "{bcrypt}encoded-password-hash", "New User", createdAt, updatedAt);

        assertThat(account.getUsername()).isEqualTo("new-user");
        assertThat(account.getPasswordHash()).isEqualTo("{bcrypt}encoded-password-hash");
        assertThat(account.getDisplayName()).isEqualTo("New User");
        assertThat(account.getRole()).isEqualTo(SystemRole.USER);
        assertThat(account.getClassification()).isNull();
        assertThat(account.getIsActive()).isTrue();
        assertThat(account.getCreatedAt()).isEqualTo(createdAt);
        assertThat(account.getUpdatedAt()).isEqualTo(updatedAt);
    }

    @Test
    void initialAssignmentPreservesProvidedIdentityAndTime() {
        LocalDateTime now = LocalDateTime.of(2026, 8, 19, 12, 0);

        UserAssignment assignment = UserAssignment.initialAssignment(10L, 20L, now, now);

        assertThat(assignment.getAccountId()).isEqualTo(10L);
        assertThat(assignment.getOrgUnitId()).isEqualTo(20L);
        assertThat(assignment.getEffectiveFrom()).isEqualTo(now);
        assertThat(assignment.getCreatedAt()).isEqualTo(now);
    }

    @Test
    void initialAssignmentHistoryStartsOpenAtProvidedInstant() {
        LocalDateTime now = LocalDateTime.of(2026, 8, 19, 12, 0);

        UserAssignmentHistory history = UserAssignmentHistory.initialAssignment(10L, 20L, now, now);

        assertThat(history.getAccountId()).isEqualTo(10L);
        assertThat(history.getOrgUnitId()).isEqualTo(20L);
        assertThat(history.getEffectiveFrom()).isEqualTo(now);
        assertThat(history.getEffectiveTo()).isNull();
        assertThat(history.getCreatedAt()).isEqualTo(now);
    }
}
