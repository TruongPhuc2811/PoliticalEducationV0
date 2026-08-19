package vn.pes.hochiminh;

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
@Table(name = "hcm_teachings")
public class HcmTeaching {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "content", nullable = false, columnDefinition = "LONGTEXT")
    private String content;

    @Column(name = "relevance_date", columnDefinition = "DATE")
    private LocalDate relevanceDate;

    @Column(name = "source_citation", length = 500)
    private String sourceCitation;

    @Column(name = "context", columnDefinition = "TEXT")
    private String context;

    @Column(name = "meaning", columnDefinition = "TEXT")
    private String meaning;

    @Column(name = "image_file_id")
    private Long imageFileId;

    @Column(name = "related_content_refs", columnDefinition = "TEXT")
    private String relatedContentRefs;

    @Enumerated(EnumType.STRING)
    @Column(name = "publish_status", nullable = false, length = 20)
    private HcmPublishStatus publishStatus;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime updatedAt;

    @Column(name = "created_by")
    private Long createdBy;

    protected HcmTeaching() {
    }
}
