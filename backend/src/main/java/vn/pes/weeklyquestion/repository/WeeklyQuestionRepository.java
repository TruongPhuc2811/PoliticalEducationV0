package vn.pes.weeklyquestion.repository;

import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.pes.weeklyquestion.WeeklyQuestion;

public interface WeeklyQuestionRepository extends JpaRepository<WeeklyQuestion, Long> {

    @Query("""
            SELECT q
            FROM WeeklyQuestion q
            WHERE q.periodOpensAt <= :now
              AND q.periodClosesAt > :now
            """)
    Optional<WeeklyQuestion> findCurrentAt(@Param("now") LocalDateTime now);
}
