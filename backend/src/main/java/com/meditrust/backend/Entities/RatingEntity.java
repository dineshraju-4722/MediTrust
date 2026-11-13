package com.meditrust.backend.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ratings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RatingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int ratingValue;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private DocterEntity doctor;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
