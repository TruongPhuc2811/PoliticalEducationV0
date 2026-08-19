package vn.pes.politicaleducation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.politicaleducation.EduDocument;

public interface EduDocumentRepository extends JpaRepository<EduDocument, Long> {
}
