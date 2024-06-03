package com.example.liftIt_SpringBoot.controller;

import com.example.liftIt_SpringBoot.model.TrainingModel;
import com.example.liftIt_SpringBoot.service.TrainingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/trainings")
public class TrainingController {

    private final TrainingService trainingService;

    @PostMapping("/create")
    public ResponseEntity<TrainingModel> createTraining(@RequestBody TrainingModel trainingModel) {
        TrainingModel createdTraining = trainingService.createTraining(trainingModel);
        return new ResponseEntity<>(createdTraining, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TrainingModel> updateTraining(@PathVariable Long id, @RequestBody TrainingModel trainingModel) {
        TrainingModel updatedTraining = trainingService.updateTraining(id, trainingModel);
        if (updatedTraining != null) {
            return new ResponseEntity<>(updatedTraining, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTraining(@PathVariable Long id) {
        trainingService.deleteTraining(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/getByUserId/{userId}")
    public ResponseEntity<List<TrainingModel>> getTrainingsByUserId(@PathVariable Long userId) {
        List<TrainingModel> trainingList = trainingService.findByUserId(userId);
        return new ResponseEntity<>(trainingList, HttpStatus.OK);
    }

    @GetMapping("/getById/{id}/{email}")
    public ResponseEntity<TrainingModel> getTrainingById(@PathVariable Long id, String email) {
        TrainingModel training = trainingService.findById(id);
        return new ResponseEntity<>(training, HttpStatus.OK);
    }
}

