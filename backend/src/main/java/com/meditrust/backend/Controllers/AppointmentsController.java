package com.meditrust.backend.Controllers;

import java.util.List;
import java.util.Map;

import com.meditrust.backend.Dto.AppointmentPostDto;
import com.meditrust.backend.Dto.GetAppointmentsByUserDto;
import com.meditrust.backend.Entities.AppointmentEntity;
import com.meditrust.backend.Services.AppointmentsService;
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
public class AppointmentsController {

    @Autowired
    private AppointmentsService appserv;

    @GetMapping("/getAppointment/{id}")
    public ResponseEntity<AppointmentEntity> getAppointmentById(@PathVariable("id") int id) {
        return ResponseEntity.ok(appserv.getById(id));
    }

    @GetMapping("/getAppointmentsByUsers/{id}")
    public ResponseEntity<List<GetAppointmentsByUserDto>> getAppointmentsByUserId(@PathVariable("id") int id) {
        return ResponseEntity.ok(appserv.getByUserId(id));
    }

    @PostMapping("/postAppointment")
    public Map<String, Integer> createAppointment(@RequestBody AppointmentPostDto body) {
        int id = appserv.postAppointment(body);
        return Map.of("id", id);
    }
}
