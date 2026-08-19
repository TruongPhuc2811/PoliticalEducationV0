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
@Table(name = "weekly_questions")
public class WeeklyQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "period_opens_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime periodOpensAt;

    @Column(name = "period_closes_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime periodClosesAt;

    @Column(name = "period_year")
    private Short periodYear;

    @Column(name = "period_week_label")
    private Short periodWeekLabel;

    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    @Column(name = "correct_explanation", columnDefinition = "TEXT")
    private String correctExplanation;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime updatedAt;

    @Column(name = "created_by")
    private Long createdBy;

    protected WeeklyQuestion() {
    }
}
