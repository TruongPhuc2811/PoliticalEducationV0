package vn.pes.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.quiz.QuizAttemptAnswer;

public interface QuizAttemptAnswerRepository extends JpaRepository<QuizAttemptAnswer, Long> {
}
