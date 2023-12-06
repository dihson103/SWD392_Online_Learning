package com.dihson103.onlinelearning.controllers;

import com.dihson103.onlinelearning.dto.common.ApiResponse;
import com.dihson103.onlinelearning.dto.file.FileResponse;
import com.dihson103.onlinelearning.utils.FileUtil;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;

@RestController
@RequestMapping("api/media")
public class MediaController {

    @PostMapping("images")
    public ApiResponse<FileResponse> uploadImage(@RequestParam("file") MultipartFile multipartFile) throws Exception {
        String filename = FileUtil.saveFile("images", multipartFile);
        return ApiResponse.<FileResponse>builder()
                .message("Upload image success")
                .data(FileResponse.builder().filename(filename).build())
                .build();
    }

    @GetMapping(value = "images/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getImage(@PathVariable String imageName) throws IOException {
        Resource resource = new ClassPathResource("static/images/" + imageName);
        return Files.readAllBytes(resource.getFile().toPath());
    }

    @PostMapping("videos")
    public ApiResponse<FileResponse> uploadVideo(@RequestParam("file") MultipartFile multipartFile) throws Exception {
        String filename = FileUtil.saveFile("videos", multipartFile);
        return ApiResponse.<FileResponse>builder()
                .message("Upload video success")
                .data(FileResponse.builder().filename(filename).build())
                .build();
    }

    @GetMapping(value = "videos/{videoName}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<StreamingResponseBody> getVideo(@PathVariable String videoName) throws IOException {
        Resource resource = new ClassPathResource("static/videos/" + videoName);

        InputStream videoStream = resource.getInputStream();

        StreamingResponseBody responseBody = outputStream -> {
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = videoStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            videoStream.close();
        };

        return ResponseEntity.ok()
                .header("Content-Disposition", "inline;filename=" + videoName)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(responseBody);
    }
}
