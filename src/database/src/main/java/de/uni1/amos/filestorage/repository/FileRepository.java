package de.uni1.amos.filestorage.repository;

import de.uni1.amos.filestorage.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<FileEntity, Long> {
}
