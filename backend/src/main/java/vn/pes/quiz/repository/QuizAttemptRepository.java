package vn.pes.quiz.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.quiz.QuizAttempt;
import vn.pes.quiz.QuizAttemptStatus;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {

    Optional<QuizAttempt> findByAccountIdAndQuizConfigIdAndStatus(
            Long accountId, Long quizConfigId, QuizAttemptStatus status);

    List<QuizAttempt> findAllByAccountIdAndQuizConfigId(Long accountId, Long quizConfigId);
}
