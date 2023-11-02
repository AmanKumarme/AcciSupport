package com.accitracker.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accitracker.springboot.dto.ApiResponse;
import com.accitracker.springboot.dto.LoginRequest;
import com.accitracker.springboot.model.Hospital;
import com.accitracker.springboot.model.User;
import com.accitracker.springboot.service.HospitalService;
import com.accitracker.springboot.service.UserService;


@RestController
@RequestMapping("/api/v1/login")
public class LoginController {

    @Autowired
    private UserService userService;
    @Autowired
     private HospitalService HospitalService;

    @PostMapping("/")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest loginRequest) {
    	System.out.println(loginRequest);
    	 String email = loginRequest.getEmail();
         String password = loginRequest.getPassword();
         long id =loginRequest.getId();
         String role= loginRequest.getRole();       
         
         System.out.println(email);
         System.out.println(id);
         User user = userService.loginUser(email,password, role,id  );
        
        if (user != null) {
            ApiResponse response = new ApiResponse("Login successful!");
            return ResponseEntity.ok(response);
        } else {
            ApiResponse response = new ApiResponse("Invalid credentials.");
            return ResponseEntity.status(401).body(response);
        }
    }

    @PostMapping("/hospital")
    public ResponseEntity<ApiResponse> HospitalLogin(@RequestBody LoginRequest loginRequest) {
    	 String email = loginRequest.getEmail();
         String password = loginRequest.getPassword();
         long id =loginRequest.getId();
         
         System.out.println(id);
         System.out.println(email);
         System.out.println(password);
         Hospital hospital = HospitalService.loginHospital(email, password, id   );
        
        
        if (hospital!= null) {
        	
        	
            ApiResponse response = new ApiResponse("Login successful!");
            return ResponseEntity.ok(response);
        } else {
            ApiResponse response = new ApiResponse("Invalid credentials.");
            return ResponseEntity.status(401).body(response);
        }
    }
    
    
    
}

