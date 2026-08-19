package vn.pes.quiz;

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
@Table(name = "quiz_attempts")
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "account_id", nullable = false)
    private Long accountId;

    @Column(name = "quiz_config_id", nullable = false)
    private Long quizConfigId;

    @Column(name = "config_snapshot_id", nullable = false)
    private Long configSnapshotId;

    @Column(name = "attempt_number", nullable = false)
    private Integer attemptNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private QuizAttemptStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "finalization_source", length = 20)
    private QuizFinalizationSource finalizationSource;

    @Column(name = "started_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime startedAt;

    @Column(name = "expires_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime expiresAt;

    @Column(name = "finalized_at", columnDefinition = "DATETIME(3)")
    private LocalDateTime finalizedAt;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    @Column(name = "active_guard", insertable = false, updatable = false, columnDefinition = "TINYINT")
    private Boolean activeGuard;

    protected QuizAttempt() {
    }
}
