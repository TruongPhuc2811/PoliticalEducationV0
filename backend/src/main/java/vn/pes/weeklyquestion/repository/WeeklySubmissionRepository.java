package vn.pes.weeklyquestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.weeklyquestion.WeeklySubmission;

public interface WeeklySubmissionRepository extends JpaRepository<WeeklySubmission, Long> {
}
