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
@Table(name = "quiz_attempt_question_options")
public class QuizAttemptQuestionOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "attempt_question_id", nullable = false)
    private Long attemptQuestionId;

    @Column(name = "source_option_id")
    private Long sourceOptionId;

    @Column(name = "position", nullable = false)
    private Integer position;

    @Column(name = "option_text_snapshot", nullable = false, columnDefinition = "TEXT")
    private String optionTextSnapshot;

    @Column(name = "is_correct_snapshot", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean isCorrectSnapshot;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    protected QuizAttemptQuestionOption() {
    }
}
