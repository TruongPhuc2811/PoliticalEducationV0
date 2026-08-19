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
@Table(name = "comp_contributions")
public class CompetitionContribution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "period_id", nullable = false)
    private Long periodId;

    @Column(name = "account_id", nullable = false)
    private Long accountId;

    @Column(name = "criteria_id", nullable = false)
    private Long criteriaId;

    @Enumerated(EnumType.STRING)
    @Column(name = "source_type", nullable = false, length = 30)
    private CompetitionSourceType sourceType;

    @Column(name = "quiz_source_selection_id")
    private Long quizSourceSelectionId;

    @Column(name = "weekly_submission_id")
    private Long weeklySubmissionId;

    @Column(name = "manual_adjustment_id")
    private Long manualAdjustmentId;

    @Column(name = "is_voided", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean isVoided;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    @Column(name = "contribution_value", nullable = false, precision = 10, scale = 4)
    private BigDecimal contributionValue;

    protected CompetitionContribution() {
    }
}
