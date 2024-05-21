package com.example.liftIt_SpringBoot.repository;

import com.example.liftIt_SpringBoot.model.CalendarModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<CalendarModel, Long> {
    List<CalendarModel> findByUserId(Long userId);
}
