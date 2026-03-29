package com.meditrust.backend.Entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
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

    @Column(nullable = false,unique = true)
    private String name;


    private String imglink;

    private String location;

    @Column(nullable = false,unique = true)
    private String email;

    private String contact;

        @JsonIgnore
    @OneToMany(mappedBy = "hospital", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<DocterEntity> docters = new ArrayList<>();
}