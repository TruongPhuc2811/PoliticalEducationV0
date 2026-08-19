package vn.pes.competition.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.competition.CompetitionCriterion;

public interface CompetitionCriterionRepository extends JpaRepository<CompetitionCriterion, Long> {
}
