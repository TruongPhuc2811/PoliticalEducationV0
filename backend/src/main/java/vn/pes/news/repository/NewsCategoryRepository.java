package vn.pes.news.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.news.NewsCategory;

public interface NewsCategoryRepository extends JpaRepository<NewsCategory, Long> {
}
