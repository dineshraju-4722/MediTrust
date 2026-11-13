package com.meditrust.backend.Controllers;

import java.time.LocalDate;
import java.util.List;

import com.meditrust.backend.Dto.GetDocterAvailabilityDto;
import com.meditrust.backend.Dto.PostDocterAvailabilityDto;
import com.meditrust.backend.Services.DocterAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class DocterAvailabilityController {

    @Autowired
    private DocterAvailabilityService daserv;

    @GetMapping("/getDoctorAvailability/{id}/{date}")
    public ResponseEntity<List<GetDocterAvailabilityDto>> getDoctorAvailability(
            @PathVariable("date") LocalDate date,
            @PathVariable("id") int id) {
        return ResponseEntity.ok(daserv.getBydate(date, id));
    }

    @PostMapping("/postDoctorAvailability")
    public void postDoctorAvailability(@RequestBody PostDocterAvailabilityDto body) {
        daserv.postDoctorAvailabliity(body);
    }

    @PutMapping("/incrementBookedAppointments/{id}")
    public void updateCount(@PathVariable("id") int id) {
        daserv.update(id);
    }
}
