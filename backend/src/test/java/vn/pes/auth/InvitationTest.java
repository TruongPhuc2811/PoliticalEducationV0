package vn.pes.auth;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import org.junit.jupiter.api.Test;

class InvitationTest {

    @Test
    void consumeChangesOnlyAcceptedConsumptionFields() {
        byte[] codeHash = new byte[32];
        codeHash[0] = 7;
        LocalDateTime createdAt = LocalDateTime.of(2026, 8, 19, 12, 0);
        LocalDateTime expiresAt = createdAt.plusDays(1);
        Invitation invitation = Invitation.issued(
                codeHash, 20L, 30L, InvitationStatus.ACTIVE, expiresAt, createdAt, createdAt);
        LocalDateTime consumedAt = createdAt.plusHours(1);

        invitation.consume(40L, consumedAt);

        assertThat(invitation.getStatus()).isEqualTo(InvitationStatus.CONSUMED);
        assertThat(invitation.getConsumedByAccountId()).isEqualTo(40L);
        assertThat(invitation.getConsumedAt()).isEqualTo(consumedAt);
        assertThat(invitation.getCodeHash()).containsExactly(codeHash);
        assertThat(invitation.getOrgUnitId()).isEqualTo(20L);
        assertThat(invitation.getIssuerAccountId()).isEqualTo(30L);
        assertThat(invitation.getExpiresAt()).isEqualTo(expiresAt);
    }
}
