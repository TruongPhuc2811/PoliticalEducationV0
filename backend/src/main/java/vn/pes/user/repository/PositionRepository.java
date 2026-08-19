package vn.pes.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.user.Position;

public interface PositionRepository extends JpaRepository<Position, Long> {
}
