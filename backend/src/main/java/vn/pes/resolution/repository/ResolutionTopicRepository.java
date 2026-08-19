package vn.pes.resolution.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.resolution.ResolutionTopic;

public interface ResolutionTopicRepository extends JpaRepository<ResolutionTopic, Long> {
}
