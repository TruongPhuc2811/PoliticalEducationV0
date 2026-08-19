package vn.pes.user.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.pes.user.UserAssignmentHistory;

public interface UserAssignmentHistoryRepository extends JpaRepository<UserAssignmentHistory, Long> {

    List<UserAssignmentHistory> findAllByAccountIdOrderByEffectiveFromDesc(Long accountId);

    @Query("""
            select history
            from UserAssignmentHistory history
            where history.accountId = :accountId
              and history.effectiveFrom <= :effectiveAt
              and (history.effectiveTo is null or history.effectiveTo > :effectiveAt)
            order by history.effectiveFrom desc, history.id desc
            """)
    List<UserAssignmentHistory> findAllEffectiveAt(
            @Param("accountId") Long accountId, @Param("effectiveAt") LocalDateTime effectiveAt);
}
