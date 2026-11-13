package com.meditrust.backend.Entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(
    name = "hospital",
    uniqueConstraints = {
        @UniqueConstraint(name = "unique_name_email", columnNames = {"name", "email"})
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HospitalEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String name;

    private String imglink;

    private String location;

    @Column(nullable = false, unique = true)
    private String email;

    private String contact;

    @JsonIgnore
    @OneToMany(mappedBy = "hospital", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<DocterEntity> docters = new ArrayList<>();
}
