package com.example.liftIt_SpringBoot.repository;

import com.example.liftIt_SpringBoot.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Serializable> {
    Optional <UserModel> findById(Long id);

    Optional<UserModel> findByEmail(String email);
}
