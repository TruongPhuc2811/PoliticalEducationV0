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
@Table(name = "comp_corrections")
public class CompetitionCorrection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "corrected_contribution_id", nullable = false)
    private Long correctedContributionId;

    @Enumerated(EnumType.STRING)
    @Column(name = "correction_type", nullable = false, length = 20)
    private CorrectionType correctionType;

    @Column(name = "reason", nullable = false, columnDefinition = "TEXT")
    private String reason;

    @Column(name = "authorized_by_account_id", nullable = false)
    private Long authorizedByAccountId;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    @Column(name = "new_value", precision = 10, scale = 4)
    private BigDecimal newValue;

    protected CompetitionCorrection() {
    }
}
