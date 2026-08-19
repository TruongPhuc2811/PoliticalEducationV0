package vn.pes.music.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.music.MusicItem;

public interface MusicItemRepository extends JpaRepository<MusicItem, Long> {
}
