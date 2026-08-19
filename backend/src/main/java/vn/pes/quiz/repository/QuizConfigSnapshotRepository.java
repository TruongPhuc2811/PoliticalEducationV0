package vn.pes.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.quiz.QuizConfigSnapshot;

public interface QuizConfigSnapshotRepository extends JpaRepository<QuizConfigSnapshot, Long> {
}
