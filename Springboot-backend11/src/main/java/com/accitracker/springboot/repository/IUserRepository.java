package com.accitracker.springboot.repository;




import org.springframework.data.jpa.repository.JpaRepository;

import com.accitracker.springboot.model.User;

public interface IUserRepository extends JpaRepository<User, Long> {


	
	


}
