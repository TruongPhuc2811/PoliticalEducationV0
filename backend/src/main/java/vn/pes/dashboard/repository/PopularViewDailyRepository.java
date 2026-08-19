package vn.pes.dashboard.repository;

import java.time.LocalDate;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.dashboard.PopularContentDomain;
import vn.pes.dashboard.PopularViewDaily;

public interface PopularViewDailyRepository extends JpaRepository<PopularViewDaily, Long> {

    Optional<PopularViewDaily> findByContentDomainAndContentIdAndViewDate(
            PopularContentDomain contentDomain, Long contentId, LocalDate viewDate);
}
