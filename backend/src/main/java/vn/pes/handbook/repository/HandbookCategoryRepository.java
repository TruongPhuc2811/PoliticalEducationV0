package vn.pes.handbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.handbook.HandbookCategory;

public interface HandbookCategoryRepository extends JpaRepository<HandbookCategory, Long> {
}
