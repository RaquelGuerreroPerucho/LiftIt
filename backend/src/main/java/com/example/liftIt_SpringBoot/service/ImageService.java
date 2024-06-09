package com.example.liftIt_SpringBoot.service;

import com.example.liftIt_SpringBoot.model.CalendarModel;
import com.example.liftIt_SpringBoot.model.ImageModel;
import com.example.liftIt_SpringBoot.model.TrainingModel;
import com.example.liftIt_SpringBoot.model.UserModel;
import com.example.liftIt_SpringBoot.repository.CalendarRepository;
import com.example.liftIt_SpringBoot.repository.ImageRepository;
import com.example.liftIt_SpringBoot.repository.TrainingRepository;
import com.example.liftIt_SpringBoot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {

    private final ImageRepository imageRepository;
    private final UserRepository userRepository;
    private final TrainingRepository trainingRepository;

    @Autowired
    public ImageService(ImageRepository imageRepository, UserRepository userRepository, TrainingRepository trainingRepository) {
        this.imageRepository = imageRepository;
        this.userRepository = userRepository;
        this.trainingRepository = trainingRepository;
    }


    public ImageModel createImage(ImageModel imageModel) {
        UserModel user = userRepository.findById(imageModel.getIdUser())
                .orElseThrow(() -> new RuntimeException("User not found"));
        TrainingModel trainingModel = trainingRepository.findById(imageModel.getIdTraining())
                .orElseThrow(() -> new RuntimeException("Image not found"));

        imageModel.setUser(user);
        imageModel.setTraining(trainingModel);

        return imageRepository.save(imageModel);
    }

    public List<ImageModel> findByUserId(Long userId, Long trainingId) {
        List<ImageModel> imageList = imageRepository.findByUserId(userId, trainingId);
        for (ImageModel imageModel : imageList) {
            System.out.println(imageModel);
            imageModel.setIdTraining(imageModel.getTraining().getId());
            imageModel.setIdUser(imageModel.getUser().getId());
        }

        return imageList;
    }


}