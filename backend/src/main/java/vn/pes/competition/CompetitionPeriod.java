package vn.pes.competition;

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
@Table(name = "comp_periods")
public class CompetitionPeriod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "period_type", nullable = false, length = 10)
    private CompetitionPeriodType periodType;

    @Column(name = "period_year", nullable = false)
    private Short periodYear;

    @Column(name = "period_number", nullable = false)
    private Short periodNumber;

    @Column(name = "policy_id", nullable = false)
    private Long policyId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 10)
    private CompetitionPeriodStatus status;

    @Column(name = "starts_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime startsAt;

    @Column(name = "ends_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime endsAt;

    @Column(name = "closed_at", columnDefinition = "DATETIME(3)")
    private LocalDateTime closedAt;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    protected CompetitionPeriod() {
    }
}
