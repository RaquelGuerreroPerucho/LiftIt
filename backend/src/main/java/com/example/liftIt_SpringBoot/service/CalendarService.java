package com.example.liftIt_SpringBoot.service;

import com.example.liftIt_SpringBoot.model.CalendarModel;
import com.example.liftIt_SpringBoot.repository.CalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CalendarService {

    @Autowired
    private CalendarRepository calendarRepository;

    public List<CalendarModel> findAll() {
        return calendarRepository.findAll();
    }

    public Optional<CalendarModel> findById(Long id) {
        return calendarRepository.findById(id);
    }

    public List<CalendarModel> findByUserId(Long userId) {
        return calendarRepository.findByUserId(userId);
    }

    public CalendarModel createCalendar(CalendarModel calendarModel) {
        return calendarRepository.save(calendarModel);
    }

    public CalendarModel updateCalendar(Long id, CalendarModel calendarModel) {
        if (calendarRepository.existsById(id)) {
            calendarModel.setId(id);
            return calendarRepository.save(calendarModel);
        } else {
            return null; // Maneja el error de la manera que prefieras
        }
    }

    public void deleteCalendar(Long id) {
        calendarRepository.deleteById(id);
    }
}
