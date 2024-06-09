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
        System.out.println(trainingModel.toString());
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
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getByUserId/{userId}")
    public ResponseEntity<List<TrainingModel>> getTrainingsByUserId(@PathVariable Long userId) {
        List<TrainingModel> trainingList = trainingService.findByUserId(userId);
        return new ResponseEntity<>(trainingList, HttpStatus.OK);
    }

    @GetMapping("/getById/{id}/{userId}")
    public ResponseEntity<TrainingModel> getTrainingById(@PathVariable Long id, @PathVariable Long userId) {
    TrainingModel training = trainingService.findByIdAndUserId(id, userId);
    if (training != null) {
        return new ResponseEntity<>(training, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
}

