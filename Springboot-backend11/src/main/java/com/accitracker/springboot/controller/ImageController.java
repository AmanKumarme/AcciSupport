package com.accitracker.springboot.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.accitracker.springboot.model.ImageEntity;
import com.accitracker.springboot.repository.ImageRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/v1")
public class ImageController {
	@Autowired
    private ImageRepository imageRepository;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image,
                                              @RequestParam("date") String date, 
                                              @RequestParam("latitude") String latitude, 
                                              @RequestParam("longitude") String longitude, 
                                              @RequestParam("city") String city,
                                              @RequestParam("userId") long userId ,
                                              @RequestParam("hospitalId") long hospitalId ) {
    	
    	
    	
    	System.out.println(userId);
        if (image.isEmpty()) {
            return ResponseEntity.badRequest().body("Image file is empty");
        }

        try {
            ImageEntity imageEntity = new ImageEntity();
            imageEntity.setDate(date);
            imageEntity.setLatitude(latitude);
            imageEntity.setLongitude(longitude);
            imageEntity.setCity(city);
            imageEntity.setImageData(image.getBytes()); // Get image data from the MultipartFile
            imageEntity.setUserId(userId);
            imageEntity.setHospitalId(hospitalId);

            imageRepository.save(imageEntity);

            return ResponseEntity.ok("Image uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload image");
        }
    }
    @GetMapping("/images")
    public ResponseEntity<List<ImageEntity>> getImages() {
        List<ImageEntity> images = imageRepository.findAll();
        
        return ResponseEntity.ok(images);
    }
    @PutMapping("/{imageId}/flag")
    public ResponseEntity<String> flagImage(@PathVariable Long imageId, @RequestBody boolean flag) {
        Optional<ImageEntity> imageOptional = imageRepository.findById(imageId);
        if (imageOptional.isPresent()) {
            ImageEntity image = imageOptional.get();
            image.setFlag(flag);
            imageRepository.save(image);
            return ResponseEntity.ok("Image flag updated successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
   
    
}
