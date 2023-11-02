package com.accitracker.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.accitracker.springboot.model.User;
import com.accitracker.springboot.repository.UserRepository;

@Service
public class UserService {
	private final UserRepository userRepository;

	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public User loginUser(String email, String password, String role, long id) {
	    System.out.println("Input values - email: " + email + ", password: " + password + ", role: " + role + ", id: " + id);
	    User user = userRepository.getUserByEmailIdAndPassword(email, password, role, id);
	    System.out.println("User from database: " + user);
	    return user;
	}

	public User findByEmail(String email) {
		
		return null;
	}

}
