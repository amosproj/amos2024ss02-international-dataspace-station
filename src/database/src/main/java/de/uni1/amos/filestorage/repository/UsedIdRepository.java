package de.uni1.amos.filestorage.repository;

import de.uni1.amos.filestorage.entity.UsedId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsedIdRepository extends JpaRepository<UsedId, String> {
}
