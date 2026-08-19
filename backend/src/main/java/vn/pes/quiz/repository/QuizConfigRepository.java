package vn.pes.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.quiz.QuizConfig;

public interface QuizConfigRepository extends JpaRepository<QuizConfig, Long> {
}
