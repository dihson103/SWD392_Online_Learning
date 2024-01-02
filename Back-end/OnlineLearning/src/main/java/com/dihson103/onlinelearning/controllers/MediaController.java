package com.dihson103.onlinelearning.controllers;

import com.dihson103.onlinelearning.dto.common.ApiResponse;
import com.dihson103.onlinelearning.dto.file.FileResponse;
import com.dihson103.onlinelearning.utils.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("api/media")
@RequiredArgsConstructor
public class MediaController {

    private final ResourceLoader resourceLoader;

    @PostMapping("images")
    public ApiResponse<FileResponse> uploadImage(@RequestParam("file") MultipartFile multipartFile) throws Exception {
        String filename = FileUtil.saveFile("images", multipartFile);
        return ApiResponse.<FileResponse>builder()
                .message("Upload image success")
                .data(FileResponse.builder().filename(filename).build())
                .build();
    }

    @GetMapping(value = "images/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
        try {
            Resource resource = FileUtil.getFileAsResource("images", imageName);

            if (resource == null) {
                return ResponseEntity.notFound().build();
            }

            try (InputStream inputStream = resource.getInputStream()) {
                byte[] imageBytes = readAllBytes(inputStream);

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_JPEG);
                headers.setContentLength(imageBytes.length);

                return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
            }
        } catch (IOException e) {
            // Handle the exception appropriately (log it or return an error response)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private byte[] readAllBytes(InputStream inputStream) throws IOException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        int nRead;
        byte[] data = new byte[1024];
        while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
            buffer.write(data, 0, nRead);
        }
        return buffer.toByteArray();
    }



    @PostMapping("videos")
    public ApiResponse<FileResponse> uploadVideo(@RequestParam("file") MultipartFile multipartFile) throws Exception {
        String filename = FileUtil.saveFile("videos", multipartFile);
        return ApiResponse.<FileResponse>builder()
                .message("Upload video success")
                .data(FileResponse.builder().filename(filename).build())
                .build();
    }

    @GetMapping(value = "/videos/{videoName}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @ResponseBody
    public ResponseEntity<Resource> getVideo(@PathVariable String videoName) throws IOException {
        Resource resource = FileUtil.getFileAsResource("videos", videoName);

        if (resource == null){
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=" + videoName);

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

}
