package vn.pes.news;

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
@Table(name = "news_articles")
public class NewsArticle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "category_id", nullable = false)
    private Long categoryId;

    @Column(name = "title", nullable = false, length = 500)
    private String title;

    @Column(name = "body", columnDefinition = "LONGTEXT")
    private String body;

    @Column(name = "video_url", length = 2000)
    private String videoUrl;

    @Column(name = "external_link", length = 2000)
    private String externalLink;

    @Column(name = "source_origin", length = 50)
    private String sourceOrigin;

    @Enumerated(EnumType.STRING)
    @Column(name = "publish_status", nullable = false, length = 20)
    private NewsPublishStatus publishStatus;

    @Column(name = "thumbnail_file_id")
    private Long thumbnailFileId;

    @Column(name = "published_at", columnDefinition = "DATETIME(3)")
    private LocalDateTime publishedAt;

    @Column(name = "created_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "DATETIME(3)")
    private LocalDateTime updatedAt;

    @Column(name = "created_by")
    private Long createdBy;

    protected NewsArticle() {
    }
}
