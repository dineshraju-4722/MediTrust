package com.meditrust.backend.Controllers;

import java.util.List;

import com.meditrust.backend.Dto.GetHospitalsDto;
import com.meditrust.backend.Entities.HospitalEntity;
import com.meditrust.backend.Services.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class HospitalController {

    @Autowired
    private HospitalService hserv;

    @GetMapping("/getHospital/{id}")
    public ResponseEntity<GetHospitalsDto> getHospitalById(@PathVariable("id") int id) {
        return ResponseEntity.ok(hserv.getById(id));
    }

    @GetMapping("/getAllHospitals")
    public ResponseEntity<List<GetHospitalsDto>> getAllHospitals() {
        return ResponseEntity.ok(hserv.getAllHosp());
    }

    @PostMapping("/postHospital")
    public HospitalEntity postHospital(@RequestBody HospitalEntity body) {
        return hserv.postHospital(body);
    }
}
