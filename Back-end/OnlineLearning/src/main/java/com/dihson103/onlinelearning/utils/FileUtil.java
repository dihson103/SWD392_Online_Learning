package com.dihson103.onlinelearning.utils;

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
        Path uploadDirectory = Paths.get("src/main/resources/static/" + path);

        String filename = StringUtils.cleanPath(multipartFile.getOriginalFilename());

        try(InputStream inputStream =  multipartFile.getInputStream()){
            Path filePath = uploadDirectory.resolve(filename);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            return filename;
        }catch (IOException ioException){
            throw new Exception("Error saving uploaded file: " + filename, ioException);
        }
    }

}
