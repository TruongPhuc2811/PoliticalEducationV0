package vn.pes.competition.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.competition.CompetitionPolicy;

public interface CompetitionPolicyRepository extends JpaRepository<CompetitionPolicy, Long> {
}
