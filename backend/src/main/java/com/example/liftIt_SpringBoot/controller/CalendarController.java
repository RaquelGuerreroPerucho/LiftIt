package com.example.liftIt_SpringBoot.controller;

import com.example.liftIt_SpringBoot.model.CalendarModel;
import com.example.liftIt_SpringBoot.service.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/calendars")
public class CalendarController {

    @Autowired
    private CalendarService calendarService;

    @GetMapping
    public ResponseEntity<List<CalendarModel>> getAllCalendars() {
        List<CalendarModel> calendarList = calendarService.findAll();
        return new ResponseEntity<>(calendarList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CalendarModel> getCalendarById(@PathVariable Long id) {
        Optional<CalendarModel> calendar = calendarService.findById(id);
        return calendar.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CalendarModel>> getCalendarsByUserId(@PathVariable Long userId) {
        List<CalendarModel> calendarList = calendarService.findByUserId(userId);
        return new ResponseEntity<>(calendarList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CalendarModel> createCalendar(@RequestBody CalendarModel calendarModel) {
        CalendarModel createdCalendar = calendarService.createCalendar(calendarModel);
        return new ResponseEntity<>(createdCalendar, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CalendarModel> updateCalendar(@PathVariable Long id, @RequestBody CalendarModel calendarModel) {
        CalendarModel updatedCalendar = calendarService.updateCalendar(id, calendarModel);
        if (updatedCalendar != null) {
            return new ResponseEntity<>(updatedCalendar, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCalendar(@PathVariable Long id) {
        calendarService.deleteCalendar(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
