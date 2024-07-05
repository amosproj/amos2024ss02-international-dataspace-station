package de.uni1.amos.filestorage.controller;

import de.uni1.amos.filestorage.entity.FileEntity;
import de.uni1.amos.filestorage.service.FileService;
import de.uni1.amos.filestorage.dto.FileDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.stream.Collectors;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/files")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        FileEntity savedFile = fileService.saveFile(file);
        return new ResponseEntity<>(savedFile.getId(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        FileEntity fileEntity = fileService.getFile(id);
        if (fileEntity == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileEntity.getFileName() + "\"")
                .body(fileEntity.getFileData());
    }

    @GetMapping("/list")
    public ResponseEntity<List<FileDTO>> listFiles() {
        List<FileDTO> files = fileService.getAllFiles().stream().map(item -> new FileDTO(item.getId(), item.getFileName())).collect(Collectors.toList());
        return new ResponseEntity<>(files, HttpStatus.OK);
    }
}
