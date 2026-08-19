package vn.pes.file.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.file.FileMetadata;

public interface FileMetadataRepository extends JpaRepository<FileMetadata, Long> {
}
