package com.example.liftIt_SpringBoot.controller;

import com.example.liftIt_SpringBoot.model.ImageModel;
import com.example.liftIt_SpringBoot.model.TrainingModel;
import com.example.liftIt_SpringBoot.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/images")
public class ImageController {

    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/create")
    public ResponseEntity<ImageModel> createImage(@RequestBody ImageModel image) {
        System.out.println("Creating image");
        System.out.println(image);
        ImageModel createdImage = imageService.createImage(image);
        return new ResponseEntity<>(createdImage, HttpStatus.CREATED);
    }

 @GetMapping("getByUserId/{userId}/{trainingId}")
    public ResponseEntity<List<ImageModel>> getImagesById(@PathVariable Long userId, @PathVariable Long trainingId) {
    List<ImageModel> imageList = imageService.findByUserId(userId, trainingId);

    return new ResponseEntity<>(imageList, HttpStatus.OK);
}
}