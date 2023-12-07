package com.dihson103.onlinelearning.controllers;

import com.dihson103.onlinelearning.dto.common.ApiResponse;
import com.dihson103.onlinelearning.dto.file.FileResponse;
import com.dihson103.onlinelearning.utils.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
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

    @GetMapping(value = "/videos/{videoName}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @ResponseBody
    public ResponseEntity<Resource> getVideo(@PathVariable String videoName) throws IOException {
        Resource resource = resourceLoader.getResource("classpath:static/videos/" + videoName);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=" + videoName);

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

}
