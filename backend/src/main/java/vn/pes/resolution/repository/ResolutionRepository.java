package vn.pes.resolution.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.resolution.Resolution;

public interface ResolutionRepository extends JpaRepository<Resolution, Long> {
}
