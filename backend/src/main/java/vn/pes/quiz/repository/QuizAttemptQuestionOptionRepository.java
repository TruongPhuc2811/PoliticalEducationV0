package vn.pes.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.quiz.QuizAttemptQuestionOption;

public interface QuizAttemptQuestionOptionRepository extends JpaRepository<QuizAttemptQuestionOption, Long> {
}
