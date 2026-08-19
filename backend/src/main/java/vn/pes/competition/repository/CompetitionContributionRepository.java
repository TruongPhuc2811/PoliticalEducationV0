package vn.pes.competition.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.competition.CompetitionContribution;

public interface CompetitionContributionRepository extends JpaRepository<CompetitionContribution, Long> {
}
