package com.example.liftIt_SpringBoot.service;

import com.example.liftIt_SpringBoot.model.TrainingModel;
import com.example.liftIt_SpringBoot.repository.TrainingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TrainingService {

    private final TrainingRepository trainingRepository;

    public TrainingModel createTraining(TrainingModel trainingModel) {
        return trainingRepository.save(trainingModel);
    }

    public TrainingModel updateTraining(Long id, TrainingModel trainingModel) {
        if (trainingRepository.existsById(id)) {
            trainingModel.setId(id);
            return trainingRepository.save(trainingModel);
        } else {
            return null;
        }
    }

    public void deleteTraining(Long id) {
        trainingRepository.deleteById(id);
    }

    public List<TrainingModel> findByUserId(Long id) {
        return trainingRepository.findByUserId(id);
    }

    public TrainingModel findById(Long id) {
        Optional<TrainingModel> training = trainingRepository.findById(id);
        return training.orElse(null);
    }

}

