package com.example.liftIt_SpringBoot.repository;

import com.example.liftIt_SpringBoot.model.ImageModel;
import com.example.liftIt_SpringBoot.model.TrainingModel;
import com.example.liftIt_SpringBoot.service.ImageService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<ImageModel, Long> {

    @Query("SELECT i FROM ImageModel i WHERE i.user.id = :userId AND i.training.id = :trainingId")
    List<ImageModel> findByUserId(Long userId, Long trainingId);

}