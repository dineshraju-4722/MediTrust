package com.meditrust.backend.Repositories;

import java.util.Optional;

import com.meditrust.backend.Entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;




public interface UserRepository extends JpaRepository<UserEntity, Integer>{
    Optional<UserEntity> findByEmail(String email);
    boolean existsByEmail(String email);
}