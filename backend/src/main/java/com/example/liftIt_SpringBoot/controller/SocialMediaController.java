package com.example.liftIt_SpringBoot.controller;

import com.example.liftIt_SpringBoot.model.SocialMediaModel;
import com.example.liftIt_SpringBoot.service.SocialMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/social-media")
public class SocialMediaController {

    @Autowired
    private SocialMediaService socialMediaService;

    @GetMapping
    public ResponseEntity<List<SocialMediaModel>> getAllSocialMedia() {
        List<SocialMediaModel> socialMediaList = socialMediaService.findAll();
        return new ResponseEntity<>(socialMediaList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SocialMediaModel> getSocialMediaById(@PathVariable Long id) {
        Optional<SocialMediaModel> socialMedia = socialMediaService.findById(id);
        return socialMedia.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<SocialMediaModel>> getSocialMediaByUser(@PathVariable String username) {
        List<SocialMediaModel> socialMediaList = socialMediaService.findByUsername(username);
        return new ResponseEntity<>(socialMediaList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SocialMediaModel> createSocialMedia(@RequestBody SocialMediaModel socialMediaModel) {
        SocialMediaModel createdSocialMedia = socialMediaService.createSocialMedia(socialMediaModel);
        return new ResponseEntity<>(createdSocialMedia, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SocialMediaModel> updateSocialMedia(@PathVariable Long id, @RequestBody SocialMediaModel socialMediaModel) {
        SocialMediaModel updatedSocialMedia = socialMediaService.updateSocialMedia(id, socialMediaModel);
        if (updatedSocialMedia != null) {
            return new ResponseEntity<>(updatedSocialMedia, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSocialMedia(@PathVariable Long id) {
        socialMediaService.deleteSocialMedia(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

