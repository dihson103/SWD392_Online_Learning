package com.dihson103.onlinelearning.utils;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class FileUtil {

    public static String saveFile(String path, MultipartFile multipartFile) throws Exception {
        String filename = StringUtils.cleanPath(multipartFile.getOriginalFilename());

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path uploadDirectory = Paths.get("file", path);

            Path filePath = uploadDirectory.resolve(filename);

            Files.createDirectories(filePath.getParent());
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);

            return filename;
        } catch (IOException ioException) {
            throw new Exception("Error saving uploaded file: " + filename, ioException);
        }
    }

    public static Resource getFileAsResource(String path, String filename){
        Path uploadDirectory = Paths.get("file", path);
        Path fileFound = null;

        try {
            fileFound = Files.list(uploadDirectory)
                    .filter(file -> filename.equals(file.getFileName().toString()))
                    .findFirst()
                    .orElse(null);
        } catch (IOException e) {
            e.printStackTrace();
        }

        if (fileFound != null) {
            try {
                return new UrlResource(fileFound.toUri());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return null;
    }

}
