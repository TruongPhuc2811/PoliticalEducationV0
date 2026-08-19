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
@Table(name = "comp_individual_outcomes")
public class CompetitionIndividualOutcome {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "period_id", nullable = false)
    private Long periodId;

    @Column(name = "account_id", nullable = false)
    private Long accountId;

    @Column(name = "ranking_position")
    private Integer rankingPosition;

    @Column(name = "computed_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime computedAt;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    @Column(name = "total_score", nullable = false, precision = 12, scale = 4)
    private BigDecimal totalScore;

    protected CompetitionIndividualOutcome() {
    }
}
