package vn.pes.weeklyquestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.weeklyquestion.WeeklyQuestionOption;

public interface WeeklyQuestionOptionRepository extends JpaRepository<WeeklyQuestionOption, Long> {
}
