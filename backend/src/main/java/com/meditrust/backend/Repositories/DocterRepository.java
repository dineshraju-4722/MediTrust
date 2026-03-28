package com.meditrust.backend.Repositories;

import java.util.List;

import com.meditrust.backend.Entities.DocterEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DocterRepository extends JpaRepository<DocterEntity, Integer>{
    List<DocterEntity> findBySpecialization_Name(String specializationName);
    DocterEntity findByEmail(String email);
}
