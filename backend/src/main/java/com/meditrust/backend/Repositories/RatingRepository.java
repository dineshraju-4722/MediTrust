package com.meditrust.backend.Repositories;

import com.meditrust.backend.Entities.RatingEntity;
import org.springframework.data.jpa.repository.JpaRepository;



public interface RatingRepository extends JpaRepository<RatingEntity, Integer>{

    RatingEntity findByDoctor_IdAndUser_Id(int did, int uid);

}
