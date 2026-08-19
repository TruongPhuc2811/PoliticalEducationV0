package vn.pes.competition.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.competition.CompetitionMemberAttribution;

public interface CompetitionMemberAttributionRepository extends JpaRepository<CompetitionMemberAttribution, Long> {
}
