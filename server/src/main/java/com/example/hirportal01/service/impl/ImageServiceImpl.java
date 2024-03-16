package com.example.hirportal01.service.impl;

import com.example.hirportal01.service.ImageService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;

@Service
public class ImageServiceImpl implements ImageService {
    @Override
    public String add(String image) {
        LocalDateTime currentTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH:mm:ss");
        String filePath ="";

        try {

            byte[] imageBytes = Base64.getDecoder().decode(image);

            filePath = "./uploads/"+currentTime.format(formatter)+".jpeg";
            try (FileOutputStream fos = new FileOutputStream(filePath)) {
                fos.write(imageBytes);
                System.out.println("A kép sikeresen mentve: " + filePath);
            } catch (IOException e) {
                e.printStackTrace();
                System.err.println("Hiba történt a kép mentése közben.");
            }

        } catch (Exception e) {
            e.printStackTrace();

        }
        // return ResponseEntity.status(HttpStatus.CREATED).body(null);
        return filePath;
    }

    @Override
    public Resource get(String imageName) {
        Path imagePath = Paths.get("uploads", imageName);
        try {
            return new UrlResource(imagePath.toUri());
        } catch (IOException ioe){
            return null;
        }
    }
}
