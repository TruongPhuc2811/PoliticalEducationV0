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
@Table(name = "comp_quiz_source_selections")
public class CompetitionQuizSourceSelection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "period_id", nullable = false)
    private Long periodId;

    @Column(name = "account_id", nullable = false)
    private Long accountId;

    @Column(name = "quiz_config_id", nullable = false)
    private Long quizConfigId;

    @Column(name = "selected_quiz_result_id", nullable = false)
    private Long selectedQuizResultId;

    @Column(name = "selected_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime selectedAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime updatedAt;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    protected CompetitionQuizSourceSelection() {
    }
}
