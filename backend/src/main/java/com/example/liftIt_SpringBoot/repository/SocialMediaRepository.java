package com.example.liftIt_SpringBoot.repository;

import java.util.List;

import com.example.liftIt_SpringBoot.model.SocialMediaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocialMediaRepository extends JpaRepository<SocialMediaModel, Long> {
    List<SocialMediaModel> findByUserUsername(String name);
}
