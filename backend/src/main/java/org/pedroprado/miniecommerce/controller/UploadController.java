package org.pedroprado.miniecommerce.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "*")
public class UploadController {

    @Value("${upload.dir}")
    private String uploadDir;

    @PostMapping
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String nomeArquivo = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path destino = uploadPath.resolve(nomeArquivo);
            Files.copy(file.getInputStream(), destino);

            return ResponseEntity.ok("/uploads/" + nomeArquivo);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Erro ao fazer upload");
        }
    }
}