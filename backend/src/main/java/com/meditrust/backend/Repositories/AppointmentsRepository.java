package com.meditrust.backend.Repositories;



import java.util.List;

import com.meditrust.backend.Entities.AppointmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;




public interface AppointmentsRepository extends JpaRepository<AppointmentEntity, Integer>{

    @Query("""
	        SELECT a FROM AppointmentEntity a
	        JOIN FETCH a.doctor d
	        JOIN FETCH d.hospital
	        WHERE a.user.id = :userId
	        ORDER BY a.appointmentDate DESC 
	    """)
    List<AppointmentEntity> findAppointmentsByUserId(@Param("userId") int userId);

}
