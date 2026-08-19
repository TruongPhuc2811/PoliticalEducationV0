package vn.pes.competition.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.competition.CompetitionQuizSourceSelection;

public interface CompetitionQuizSourceSelectionRepository
        extends JpaRepository<CompetitionQuizSourceSelection, Long> {

    Optional<CompetitionQuizSourceSelection> findByPeriodIdAndAccountIdAndQuizConfigId(
            Long periodId, Long accountId, Long quizConfigId);
}
