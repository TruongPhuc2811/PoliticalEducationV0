package vn.pes.quiz.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.quiz.QuizResult;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {

    Optional<QuizResult> findByAttemptId(Long attemptId);

    List<QuizResult> findAllByAccountIdAndQuizConfigId(Long accountId, Long quizConfigId);
}
