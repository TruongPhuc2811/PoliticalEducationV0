package vn.pes.auth.repository;

import jakarta.persistence.LockModeType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import vn.pes.auth.Invitation;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Invitation> findByCodeHash(byte[] codeHash);
}
