package vn.pes.quiz;

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
@Table(name = "quiz_results")
public class QuizResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "attempt_id", nullable = false)
    private Long attemptId;

    @Column(name = "account_id", nullable = false)
    private Long accountId;

    @Column(name = "quiz_config_id", nullable = false)
    private Long quizConfigId;

    @Column(name = "total_questions", nullable = false)
    private Integer totalQuestions;

    @Column(name = "correct_count", nullable = false)
    private Integer correctCount;

    @Column(name = "is_passed", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean isPassed;

    @Enumerated(EnumType.STRING)
    @Column(name = "finalization_source", nullable = false, length = 20)
    private QuizFinalizationSource finalizationSource;

    @Column(name = "graded_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime gradedAt;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    @Column(name = "raw_score", nullable = false, precision = 6, scale = 2)
    private BigDecimal rawScore;

    protected QuizResult() {
    }
}
