package vn.pes.news.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.news.NewsArticle;

public interface NewsArticleRepository extends JpaRepository<NewsArticle, Long> {
}
