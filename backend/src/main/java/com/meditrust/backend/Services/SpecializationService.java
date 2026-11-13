package com.meditrust.backend.Services;

import java.util.List;

import com.meditrust.backend.Dto.GetDoctersDto;
import com.meditrust.backend.Dto.GetSpecializationDto;
import com.meditrust.backend.Entities.DocterEntity;
import com.meditrust.backend.Entities.SpecializationEntity;
import com.meditrust.backend.Repositories.DocterRepository;
import com.meditrust.backend.Repositories.RatingRepository;
import com.meditrust.backend.Repositories.SpecializationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SpecializationService {

    @Autowired
    private SpecializationRepository srepo;

    @Autowired
    private DocterRepository drepo;

    @Autowired
    private RatingRepository rrepo;

    @Autowired
    private ModelMapper modelmapper;

    public SpecializationEntity getById(int id) {
        return srepo.findById(id).orElse(null);
    }

    public List<GetDoctersDto> getDoctorsByName(String name) {
        List<DocterEntity> bySpecializationName = drepo.findBySpecialization_Name(name);
        return bySpecializationName.stream().map(ele -> {
            GetDoctersDto dto = modelmapper.map(ele, GetDoctersDto.class);

            Double avgRating = rrepo.findAll().stream()
                    .filter(r -> r.getDoctor().getId() == dto.getId())
                    .mapToInt(r -> r.getRatingValue())
                    .average()
                    .orElse(0.0);

            dto.setAverageRating(avgRating);
            dto.setUserRating(2);
            return dto;
        }).toList();
    }

    public SpecializationEntity postSpecialization(SpecializationEntity body) {
        SpecializationEntity newfield = new SpecializationEntity();
        newfield.setName(body.getName());
        return srepo.save(newfield);
    }

    public List<GetSpecializationDto> getAllSpecialations() {
        return srepo.findAll().stream()
                .map(e -> modelmapper.map(e, GetSpecializationDto.class))
                .toList();
    }
}
