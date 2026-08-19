package vn.pes.dashboard;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "popular_view_daily")
public class PopularViewDaily {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "content_domain", nullable = false, length = 30)
    private PopularContentDomain contentDomain;

    @Column(name = "content_id", nullable = false)
    private Long contentId;

    @Column(name = "view_date", nullable = false, columnDefinition = "DATE")
    private LocalDate viewDate;

    @Column(name = "view_count", nullable = false, columnDefinition = "INT UNSIGNED")
    private Integer viewCount;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime updatedAt;

    protected PopularViewDaily() {
    }
}
