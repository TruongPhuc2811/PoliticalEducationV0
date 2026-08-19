package vn.pes.handbook.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.handbook.HandbookArticle;
import vn.pes.handbook.HandbookPublishStatus;

public interface HandbookArticleRepository extends JpaRepository<HandbookArticle, Long> {

    Page<HandbookArticle> findAllByCategoryIdAndPublishStatus(
            Long categoryId, HandbookPublishStatus publishStatus, Pageable pageable);
}
