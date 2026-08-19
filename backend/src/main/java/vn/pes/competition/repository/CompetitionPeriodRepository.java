package vn.pes.competition.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.competition.CompetitionPeriod;

public interface CompetitionPeriodRepository extends JpaRepository<CompetitionPeriod, Long> {
}
