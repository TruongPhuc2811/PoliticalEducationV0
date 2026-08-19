package vn.pes.competition;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "comp_unit_outcomes")
public class CompetitionUnitOutcome {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "period_id", nullable = false)
    private Long periodId;

    @Column(name = "org_unit_id", nullable = false)
    private Long orgUnitId;

    @Enumerated(EnumType.STRING)
    @Column(name = "unit_type", nullable = false, length = 20)
    private CompetitionUnitType unitType;

    @Column(name = "eligible_member_count", nullable = false)
    private Integer eligibleMemberCount;

    @Column(name = "ranking_position")
    private Integer rankingPosition;

    @Column(name = "computed_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime computedAt;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    @Column(name = "total_score_sum", nullable = false, precision = 14, scale = 4)
    private BigDecimal totalScoreSum;

    @Column(name = "normalized_avg", nullable = false, precision = 12, scale = 6)
    private BigDecimal normalizedAvg;

    protected CompetitionUnitOutcome() {
    }
}
