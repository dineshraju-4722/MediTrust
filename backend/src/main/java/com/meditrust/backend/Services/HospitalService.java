package com.meditrust.backend.Services;

import java.util.List;

import com.meditrust.backend.Dto.GetHospitalsDto;
import com.meditrust.backend.Entities.HospitalEntity;
import com.meditrust.backend.Repositories.HospitalRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HospitalService {

    @Autowired
    private HospitalRepository hrepo;

    @Autowired
    private ModelMapper modelmapper;

    public GetHospitalsDto getById(int id) {
        HospitalEntity orElse = hrepo.findById(id).orElse(null);
        return modelmapper.map(orElse, GetHospitalsDto.class);
    }

    public HospitalEntity postHospital(HospitalEntity body) {
        return hrepo.save(body);
    }

    public List<GetHospitalsDto> getAllHosp() {
        return hrepo.findAll().stream().map(e -> modelmapper.map(e, GetHospitalsDto.class)).toList();
    }
}
