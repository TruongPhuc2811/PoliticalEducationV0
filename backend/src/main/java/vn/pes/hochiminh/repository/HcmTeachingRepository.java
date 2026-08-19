package vn.pes.hochiminh.repository;

import java.time.LocalDate;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.hochiminh.HcmPublishStatus;
import vn.pes.hochiminh.HcmTeaching;

public interface HcmTeachingRepository extends JpaRepository<HcmTeaching, Long> {

    Optional<HcmTeaching> findFirstByRelevanceDateAndPublishStatusOrderByIdAsc(
            LocalDate businessDate, HcmPublishStatus publishStatus);
}
