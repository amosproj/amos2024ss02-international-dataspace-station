package de.uni1.amos.filestorage.controller;

import de.uni1.amos.filestorage.entity.ContractAgreement;
import de.uni1.amos.filestorage.service.ContractAgreementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/contracts")
public class ContractAgreementController {

    @Autowired
    private ContractAgreementService contractAgreementService;

    @PostMapping("/store")
    public ResponseEntity<String> uploadFile(@RequestBody ContractAgreement contract) throws IOException {
        contractAgreementService.saveContract(contract);
        return new ResponseEntity<>("Contract saved!", HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Object> getContract(@PathVariable String id) {
        ContractAgreement contract = contractAgreementService.getContractAgreement(id);
        if (contract == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(contract, HttpStatus.OK);
    }

}
