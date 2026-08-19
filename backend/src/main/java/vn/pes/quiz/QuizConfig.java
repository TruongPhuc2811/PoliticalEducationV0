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
import jakarta.persistence.Version;
import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_configs")
public class QuizConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "title", nullable = false, length = 300)
    private String title;

    @Column(name = "test_type_id")
    private Long testTypeId;

    @Column(name = "question_count", nullable = false)
    private Integer questionCount;

    @Column(name = "duration_seconds", nullable = false)
    private Integer durationSeconds;

    @Column(name = "attempt_limit", nullable = false)
    private Integer attemptLimit;

    @Column(name = "shuffle_questions", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean shuffleQuestions;

    @Column(name = "shuffle_answers", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean shuffleAnswers;

    @Column(name = "is_active", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean isActive;

    @Version
    @Column(name = "version", nullable = false)
    private Integer version;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime updatedAt;

    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "pass_threshold", nullable = false, precision = 5, scale = 2)
    private BigDecimal passThreshold;

    protected QuizConfig() {
    }
}
