package com.example.liftIt_SpringBoot.repository;
import com.example.liftIt_SpringBoot.model.TrainingModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingRepository extends JpaRepository<TrainingModel, Long> {
    Page<TrainingModel> findAll(Pageable pageable);
}
