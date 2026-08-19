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
@Table(name = "comp_member_attributions")
public class CompetitionMemberAttribution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "period_id", nullable = false)
    private Long periodId;

    @Column(name = "account_id", nullable = false)
    private Long accountId;

    @Column(name = "tieu_doi_id", nullable = false)
    private Long tieuDoiId;

    @Column(name = "trung_doi_id", nullable = false)
    private Long trungDoiId;

    @Column(name = "dai_doi_id", nullable = false)
    private Long daiDoiId;

    @Column(name = "source_assignment_history_id")
    private Long sourceAssignmentHistoryId;

    @Column(name = "attributed_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime attributedAt;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    protected CompetitionMemberAttribution() {
    }
}
