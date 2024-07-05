package de.uni1.amos.filestorage.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/")
public class StatusController {

    @GetMapping("/status")
    public ResponseEntity<Object> getStatus() {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("response", "Running!");
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

}
