package com.example.liftIt_SpringBoot.service;

import com.example.liftIt_SpringBoot.model.CalendarModel;
import com.example.liftIt_SpringBoot.model.TrainingModel;
import com.example.liftIt_SpringBoot.model.UserModel;
import com.example.liftIt_SpringBoot.repository.CalendarRepository;
import com.example.liftIt_SpringBoot.repository.TrainingRepository;
import com.example.liftIt_SpringBoot.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final CalendarRepository calendarRepository;

   /* public TrainingModel createTraining(TrainingModel trainingModel) {
        return trainingRepository.save(trainingModel);
    }
*/
    public TrainingModel createTraining(TrainingModel trainingModel) {
        UserModel user = userRepository.findById(trainingModel.getIdUser())
                .orElseThrow(() -> new RuntimeException("User not found"));
        CalendarModel calendar = calendarRepository.findById(trainingModel.getIdCalendar())
                .orElseThrow(() -> new RuntimeException("Calendar not found"));

        trainingModel.setUser(user);
        trainingModel.setCalendar(calendar);

        return trainingRepository.save(trainingModel);
    }

    public TrainingModel updateTraining(Long id, TrainingModel trainingModel) {
        if (trainingRepository.existsById(id)) {

            trainingModel.setId(id);


            UserModel user = userRepository.findById(trainingModel.getIdUser())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            CalendarModel calendar = calendarRepository.findById(trainingModel.getIdCalendar())
                    .orElseThrow(() -> new RuntimeException("Calendar not found"));

            trainingModel.setUser(user);
            trainingModel.setCalendar(calendar);

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

    public TrainingModel findByIdAndUserId(Long id, Long userId) {
    Optional<TrainingModel> training = trainingRepository.findByIdAndUserId(id, userId);
    return training.orElse(null);
}

}

