package com.meditrust.backend.Controllers;


import java.util.List;

import com.meditrust.backend.Dto.GetDoctersDto;
import com.meditrust.backend.Dto.GetSpecializationDto;
import com.meditrust.backend.Entities.SpecializationEntity;
import com.meditrust.backend.Services.SpecializationService;
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
public class SpecializationController {

    @Autowired
    private SpecializationService sserv;

    @GetMapping("/getSpecialization/{id}")
    public ResponseEntity<SpecializationEntity> gettingById(@PathVariable("id") int id) {
        return ResponseEntity.ok(sserv.getById(id));
    }

    @GetMapping("/getAllSpecilizations")
    public List<GetSpecializationDto> getAll(){
        return sserv.getAllSpecialations();
    }

    @GetMapping("/getSpecializationByName/{name}")
    public ResponseEntity<List<GetDoctersDto>> gettingByName(@PathVariable("name") String name) {
        return ResponseEntity.ok(sserv.getDoctorsByName(name));
    }

    @PostMapping("/postSpecialization")
    public SpecializationEntity gettingById(@RequestBody SpecializationEntity body) {
        return sserv.postSpecialization(body);
    }



}
