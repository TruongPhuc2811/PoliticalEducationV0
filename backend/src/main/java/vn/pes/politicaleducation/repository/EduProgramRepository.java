package vn.pes.politicaleducation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.pes.politicaleducation.EduProgram;

public interface EduProgramRepository extends JpaRepository<EduProgram, Long> {
}
