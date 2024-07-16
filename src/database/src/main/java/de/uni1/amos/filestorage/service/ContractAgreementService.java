package de.uni1.amos.filestorage.service;

import de.uni1.amos.filestorage.repository.ContractAgreementRepository;
import de.uni1.amos.filestorage.entity.ContractAgreement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ContractAgreementService {

    @Autowired
    private ContractAgreementRepository contractRepository;

    public ContractAgreement saveContract(ContractAgreement contract) throws IOException {
        return contractRepository.save(contract);
    }

    public ContractAgreement getContractAgreement(String id) {
        return contractRepository.findById(id).orElse(null);
    }

}
