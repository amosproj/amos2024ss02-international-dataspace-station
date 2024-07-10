package de.uni1.amos.filestorage.service;

import de.uni1.amos.filestorage.entity.FileEntity;
import de.uni1.amos.filestorage.repository.FileRepository;
import de.uni1.amos.filestorage.util.IdGenerator;
import de.uni1.amos.filestorage.repository.UsedIdRepository;
import de.uni1.amos.filestorage.entity.UsedId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private UsedIdRepository usedIdRepository;

    @Autowired
    private IdGenerator idGenerator;

    public FileEntity saveFile(MultipartFile file) throws IOException {
        FileEntity fileEntity = new FileEntity();
        fileEntity.setFileName(file.getOriginalFilename());
        fileEntity.setFileData(file.getBytes());
        
        String id;
        do {
            id = idGenerator.generateId();
        } while (usedIdRepository.existsById(id));

        fileEntity.setId(id);

        usedIdRepository.save(new UsedId(id));
        return fileRepository.save(fileEntity);
    }

    public FileEntity getFile(String id) {
        return fileRepository.findById(id).orElse(null);
    }

    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }

    public boolean deleteFileById(String id) {
        FileEntity file = fileRepository.findById(id).orElse(null);
        if (file == null) return false;
        fileRepository.deleteById(file.getId());
        return true;
    }
}
