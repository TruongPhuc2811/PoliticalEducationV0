package vn.pes.weeklyquestion;

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
@Table(name = "weekly_submissions")
public class WeeklySubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "account_id", nullable = false)
    private Long accountId;

    @Column(name = "weekly_question_id", nullable = false)
    private Long weeklyQuestionId;

    @Column(name = "selected_option_id", nullable = false)
    private Long selectedOptionId;

    @Column(name = "is_correct", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean isCorrect;

    @Column(name = "submitted_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime submittedAt;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    protected WeeklySubmission() {
    }
}
