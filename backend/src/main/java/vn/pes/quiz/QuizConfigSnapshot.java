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
@Table(name = "quiz_config_snapshot")
public class QuizConfigSnapshot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "quiz_config_id", nullable = false)
    private Long quizConfigId;

    @Column(name = "question_count", nullable = false)
    private Integer questionCount;

    @Column(name = "duration_seconds", nullable = false)
    private Integer durationSeconds;

    @Column(name = "attempt_limit", nullable = false)
    private Integer attemptLimit;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    @Column(name = "pass_threshold", nullable = false, precision = 5, scale = 2)
    private BigDecimal passThreshold;

    protected QuizConfigSnapshot() {
    }
}
