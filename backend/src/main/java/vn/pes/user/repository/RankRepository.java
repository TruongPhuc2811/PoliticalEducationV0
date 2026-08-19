package vn.pes.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.user.Rank;

public interface RankRepository extends JpaRepository<Rank, Long> {
}
