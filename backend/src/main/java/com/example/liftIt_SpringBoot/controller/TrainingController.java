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

    @GetMapping("/getPage/{page}")
    public ResponseEntity<List<TrainingModel>> getTrainingsByPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<TrainingModel> trainings = trainingService.getByPage(pageable);
        return new ResponseEntity<>(trainings, HttpStatus.OK);
    }
}

