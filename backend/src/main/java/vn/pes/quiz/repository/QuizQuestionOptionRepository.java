package vn.pes.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.quiz.QuizQuestionOption;

public interface QuizQuestionOptionRepository extends JpaRepository<QuizQuestionOption, Long> {
}
