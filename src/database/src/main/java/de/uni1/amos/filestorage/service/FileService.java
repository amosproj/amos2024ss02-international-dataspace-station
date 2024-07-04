package de.uni1.amos.filestorage.service;

import de.uni1.amos.filestorage.entity.FileEntity;
import de.uni1.amos.filestorage.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    public FileEntity saveFile(MultipartFile file) throws IOException {
        FileEntity fileEntity = new FileEntity();
        fileEntity.setFileName(file.getOriginalFilename());
        fileEntity.setFileData(file.getBytes());
        return fileRepository.save(fileEntity);
    }

    public FileEntity getFile(Long id) {
        return fileRepository.findById(id).orElse(null);
    }

    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }
}
