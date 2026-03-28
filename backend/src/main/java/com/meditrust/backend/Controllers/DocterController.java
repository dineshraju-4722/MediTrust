package com.meditrust.backend.Controllers;


import java.util.List;

import com.meditrust.backend.Dto.DocterPostDto;
import com.meditrust.backend.Dto.GetDoctersDto;
import com.meditrust.backend.Dto.GetSpecializationDto;
import com.meditrust.backend.Entities.DocterEntity;
import com.meditrust.backend.Services.DocterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class DocterController {

    @Autowired
    private DocterService dserv;



    @GetMapping("/getDoctor/{id}")
    public ResponseEntity<GetDoctersDto> gettingById(@PathVariable("id") int id) {
        return ResponseEntity.ok(dserv.getById(id));
    }

    @GetMapping("/getAllDoctors")
    public ResponseEntity<List<GetDoctersDto>> gettingAll() {
        return ResponseEntity.ok(dserv.getAll());
    }



    @GetMapping("/getDoctorByMail/{email}")
    public ResponseEntity<GetDoctersDto> gettingById(@PathVariable("email") String email) {
        return ResponseEntity.ok(dserv.getById(email));
    }

    @PostMapping("/postDoctor")
    public DocterEntity gettingById(@RequestBody DocterPostDto body) {
        return dserv.postDoctor(body);
    }


    @PostMapping("/acceptStatus")
    public void AcceptRequest(@RequestBody GetSpecializationDto body) {
        dserv.acceptRequest(body);
    }



}
