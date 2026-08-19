package vn.pes.user;

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
@Table(name = "user_assignment_history")
public class UserAssignmentHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "account_id", nullable = false)
    private Long accountId;

    @Column(name = "org_unit_id", nullable = false)
    private Long orgUnitId;

    @Column(name = "effective_from", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime effectiveFrom;

    @Column(name = "effective_to", columnDefinition = "DATETIME(3)")
    private LocalDateTime effectiveTo;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    protected UserAssignmentHistory() {
    }

    public static UserAssignmentHistory initialAssignment(
            Long accountId, Long orgUnitId, LocalDateTime effectiveFrom, LocalDateTime createdAt) {
        UserAssignmentHistory history = new UserAssignmentHistory();
        history.accountId = accountId;
        history.orgUnitId = orgUnitId;
        history.effectiveFrom = effectiveFrom;
        history.effectiveTo = null;
        history.createdAt = createdAt;
        return history;
    }

    public Long getAccountId() {
        return accountId;
    }

    public Long getOrgUnitId() {
        return orgUnitId;
    }

    public LocalDateTime getEffectiveFrom() {
        return effectiveFrom;
    }

    public LocalDateTime getEffectiveTo() {
        return effectiveTo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
