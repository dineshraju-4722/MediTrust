package com.meditrust.backend.Repositories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.meditrust.backend.Entities.DoctorAvailabilityEntity;
import org.springframework.data.jpa.repository.JpaRepository;



public interface DocterAvailabilityRepository extends JpaRepository<DoctorAvailabilityEntity, Integer>{


    List<DoctorAvailabilityEntity> findByDoctor_IdAndDate(int doctorId, LocalDate date);
    DoctorAvailabilityEntity findByDoctor_IdAndDateAndStartTime(int doctorId, LocalDate date,LocalTime time);

}
