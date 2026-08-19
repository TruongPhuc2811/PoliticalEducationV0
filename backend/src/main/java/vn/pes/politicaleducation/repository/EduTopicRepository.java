package vn.pes.politicaleducation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.politicaleducation.EduTopic;

public interface EduTopicRepository extends JpaRepository<EduTopic, Long> {
}
