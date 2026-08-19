package vn.pes.resolution.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.resolution.ResolutionDocument;

public interface ResolutionDocumentRepository extends JpaRepository<ResolutionDocument, Long> {
}
