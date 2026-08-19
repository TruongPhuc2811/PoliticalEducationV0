package vn.pes.competition.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.competition.CompetitionCorrection;

public interface CompetitionCorrectionRepository extends JpaRepository<CompetitionCorrection, Long> {
}
