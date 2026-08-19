package vn.pes.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.quiz.QuizTestType;

public interface QuizTestTypeRepository extends JpaRepository<QuizTestType, Long> {
}
