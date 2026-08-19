package vn.pes.user.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.user.UserAssignment;

public interface UserAssignmentRepository extends JpaRepository<UserAssignment, Long> {

    Optional<UserAssignment> findByAccountId(Long accountId);

    List<UserAssignment> findAllByOrgUnitId(Long orgUnitId);
}
