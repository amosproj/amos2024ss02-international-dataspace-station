package de.uni1.amos.filestorage.config;

import de.uni1.amos.filestorage.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.mock.web.MockMultipartFile;

import java.io.InputStream;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.List;

@Configuration
public class DataInitializer {

    @Autowired
    private FileService fileService;

    @Autowired
    private Environment env;

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            String container = env.getProperty("CONNECTOR_NAME", "bank");

            List<String> defaultFiles;
            switch (container) {
                case "company":
                    defaultFiles = List.of("company/company1.txt", "company/company2.txt", "company/company3.txt");
                    break;
                case "taxadvisor":
                    defaultFiles = List.of("taxadvisor/taxadvisor1.txt", "taxadvisor/taxadvisor2.txt", "taxadvisor/taxadvisor3.txt");
                    break;
                default:
                    defaultFiles = List.of("bank/bank1.txt", "bank/bank2.txt", "bank/bank3.txt");
                    break;
            }

            for (String filePath : defaultFiles) {
                try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("static/" + filePath)) {
                    if (inputStream == null) {
                        throw new IOException("File not found: " + filePath);
                    }
                    String fileName = Paths.get(filePath).getFileName().toString();
                    MultipartFile multipartFile = new MockMultipartFile(fileName, fileName, "text/plain", inputStream);

                    fileService.saveFile(multipartFile);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        };
    }
}
