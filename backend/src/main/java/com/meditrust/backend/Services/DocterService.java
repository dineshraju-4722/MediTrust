package com.meditrust.backend.Services;

import java.util.List;

import com.meditrust.backend.Dto.DocterPostDto;
import com.meditrust.backend.Dto.GetDoctersDto;
import com.meditrust.backend.Dto.GetSpecializationDto;
import com.meditrust.backend.Entities.DocterEntity;
import com.meditrust.backend.Repositories.DocterRepository;
import com.meditrust.backend.Repositories.HospitalRepository;
import com.meditrust.backend.Repositories.RatingRepository;
import com.meditrust.backend.Repositories.SpecializationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DocterService {

    @Autowired
    private DocterRepository drepo;

    @Autowired
    private SpecializationRepository srepo;

    @Autowired
    private HospitalRepository hrepo;

    @Autowired
    private ModelMapper modelmapper;

    @Autowired
    private RatingRepository rrepo;

    public GetDoctersDto getById(int id) {
        DocterEntity doctor = drepo.findById(id).orElse(null);
        if (doctor == null) {
            return null;
        }
        GetDoctersDto map = modelmapper.map(doctor, GetDoctersDto.class);
        Double avgRating = rrepo.findAll().stream()
                .filter(r -> r.getDoctor().getId() == map.getId())
                .mapToInt(r -> r.getRatingValue())
                .average()
                .orElse(0.0);

        map.setAverageRating(avgRating);
        map.setUserRating(2);
        return map;
    }

    public DocterEntity postDoctor(DocterPostDto body) {
        DocterEntity newfield = new DocterEntity();
        newfield.setContact(body.getContact());
        newfield.setEmail(body.getEmail());
        newfield.setImglink(body.getImglink());
        newfield.setStatus("false");
        newfield.setName(body.getName());
        newfield.setExperience(body.getExperience());
        newfield.setHospital(hrepo.findById(body.getHospitalId()).orElse(null));
        newfield.setSpecialization(srepo.findById(body.getSpecializationId()).orElse(null));
        return drepo.save(newfield);
    }

    public GetDoctersDto getById(String email) {
        DocterEntity byEmail = drepo.findByEmail(email);
        if (byEmail == null) {
            return null;
        }
        return modelmapper.map(byEmail, GetDoctersDto.class);
    }

    public List<GetDoctersDto> getAll() {
        List<DocterEntity> all = drepo.findAll();
        return all.stream().map(e -> modelmapper.map(e, GetDoctersDto.class)).toList();
    }

    public void acceptRequest(GetSpecializationDto body) {
        DocterEntity byId = drepo.findById(body.getId()).orElse(null);
        if (byId != null) {
            byId.setStatus("true");
            drepo.save(byId);
        }
    }
}
