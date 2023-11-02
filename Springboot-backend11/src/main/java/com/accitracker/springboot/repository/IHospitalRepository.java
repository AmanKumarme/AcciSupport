package com.accitracker.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.accitracker.springboot.model.Hospital;



public interface IHospitalRepository extends JpaRepository<Hospital, Long>  {
	
	@Query("SELECT u FROM Hospital u WHERE u.emailId = :emailId AND u.password = :password AND  u.id = :id")
	 public  Hospital getUserByEmailIdAndPassword( String emailId, String password ,long id );
}
