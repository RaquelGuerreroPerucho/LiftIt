package com.example.liftIt_SpringBoot.service;

import com.example.liftIt_SpringBoot.model.TrainingModel;
import com.example.liftIt_SpringBoot.repository.TrainingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<TrainingModel> getByPage(Pageable pageable) {
        Page<TrainingModel> pageResult = trainingRepository.findAll(pageable);
        return pageResult.getContent();
    }
}

