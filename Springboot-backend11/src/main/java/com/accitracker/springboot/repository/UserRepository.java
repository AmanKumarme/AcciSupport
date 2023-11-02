package com.accitracker.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.accitracker.springboot.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	@Query("SELECT u FROM User u WHERE u.emailId = :emailId AND u.password = :password AND u.role = :role AND u.id = :id")
	public User getUserByEmailIdAndPassword(
	    @Param("emailId") String emailId,
	    @Param("password") String password,
	    @Param("role") String role,
	    @Param("id") long id
	);


	
}

