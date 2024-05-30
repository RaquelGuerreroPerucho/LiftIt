package com.example.liftIt_SpringBoot.repository;
import com.example.liftIt_SpringBoot.model.TrainingModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingRepository extends JpaRepository<TrainingModel, Long> {
        List<TrainingModel> findByUserId(Long userId);


}
