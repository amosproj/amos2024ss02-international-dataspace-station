package de.uni1.amos.filestorage.repository;

import de.uni1.amos.filestorage.entity.ContractAgreement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractAgreementRepository extends JpaRepository<ContractAgreement, String> {
}
