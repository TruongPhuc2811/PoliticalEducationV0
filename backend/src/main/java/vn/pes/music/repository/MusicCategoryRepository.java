package vn.pes.music.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.music.MusicCategory;

public interface MusicCategoryRepository extends JpaRepository<MusicCategory, Long> {
}
