package vn.pes.auth;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "invitations")
public class Invitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "code_hash", nullable = false, columnDefinition = "BINARY(32)")
    private byte[] codeHash;

    @Column(name = "org_unit_id", nullable = false)
    private Long orgUnitId;

    @Column(name = "issuer_account_id", nullable = false)
    private Long issuerAccountId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private InvitationStatus status;

    @Column(name = "expires_at", columnDefinition = "DATETIME(3)")
    private LocalDateTime expiresAt;

    @Column(name = "consumed_by_account_id")
    private Long consumedByAccountId;

    @Column(name = "consumed_at", columnDefinition = "DATETIME(3)")
    private LocalDateTime consumedAt;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime updatedAt;

    protected Invitation() {
    }
}
