package com.meditrust.backend.Services;

import java.util.List;

import com.meditrust.backend.Dto.AppointmentPostDto;
import com.meditrust.backend.Dto.GetAppointmentsByUserDto;
import com.meditrust.backend.Dto.GetDocterAvailabilityDto;
import com.meditrust.backend.Entities.AppointmentEntity;
import com.meditrust.backend.Repositories.AppointmentsRepository;
import com.meditrust.backend.Repositories.DocterRepository;
import com.meditrust.backend.Repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class AppointmentsService {


    @Autowired
    private AppointmentsRepository apprepo;

    @Autowired
    private DocterRepository drepo;

    @Autowired
    private UserRepository userrepo;

    @Autowired
    private DocterAvailabilityService daserv;

    @Autowired
    private ModelMapper modelmapper;

    public AppointmentEntity getById(int id) {
        return apprepo.findById(id).orElse(null);

    }

    public List<GetAppointmentsByUserDto> getByUserId(int id) {
        List<AppointmentEntity> appointmentsByUserId = apprepo.findAppointmentsByUserId(id);

        return appointmentsByUserId.stream().map(a -> {
            GetAppointmentsByUserDto dto = new GetAppointmentsByUserDto();
            dto.setId(a.getId());
            dto.setDate(a.getAppointmentDate());
            dto.setTime(a.getAppointmentTime());
            dto.setDoctorName(a.getDoctor().getName());
            dto.setHospitalName(a.getDoctor().getHospital().getName());
            dto.setSpecializationName(a.getDoctor().getSpecialization().getName());
            return dto;
        }).toList();

    }

    public int postAppointment(AppointmentPostDto body) {
        // TODO Auto-generated method stub
        AppointmentPostDto abc=body;



        AppointmentEntity map = modelmapper.map(body,AppointmentEntity.class);
        map.setDoctor(drepo.findById(body.getDocter()).orElse(null));
        map.setUser(userrepo.findById(body.getUser()).orElse(null));
        apprepo.save(map);

        GetDocterAvailabilityDto bydateAndTime = daserv.getBydateAndTime(abc.getAppointmentDate(), abc.getDocter(), abc.getAppointmentTime());
        return bydateAndTime.getId();

    }



}

