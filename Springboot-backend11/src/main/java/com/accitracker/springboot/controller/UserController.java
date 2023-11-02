package com.accitracker.springboot.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.accitracker.springboot.exception.ResourceNotFoundException;
import com.accitracker.springboot.model.ImageEntity;
import com.accitracker.springboot.model.User;
import com.accitracker.springboot.repository.IUserRepository;
import com.accitracker.springboot.repository.ImageRepository;





@RestController
@RequestMapping("/api/v1/users")
public class UserController {
	
 @Autowired
	private IUserRepository userRepository;
 @Autowired
 private ImageRepository imageRepository;

	@GetMapping("/")
	public List<User> getAllUser() {
		return userRepository.findAll();

	}
	@PostMapping("/")
	public User createUser( @RequestBody User user) {
		return userRepository.save(user);
		
	}
	
    //get user by id 
	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable long id){
		User user= userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("user not exist with id "+ id));
		
		return ResponseEntity.ok(user) ;
		
	}
	//update user api
	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser( @PathVariable long id,  @RequestBody User userDetails){
		User updateUser= userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("user not exist with id "+ id));
		updateUser.setFirstName(userDetails.getFirstName());
		updateUser.setLastName(userDetails.getLastName());
		updateUser.setEmailId(userDetails.getEmailId());
		updateUser.setMobileNo(userDetails.getMobileNo());
		updateUser.setRole(userDetails.getRole());
		userRepository.save(updateUser);
		
		return ResponseEntity.ok(updateUser);
		
	}
	//delete user 
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable long id){
		User user= userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("user not exist with id "+ id));
		userRepository.delete(user);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		
	}
	
	 @PostMapping("/upload")
	    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image,
	                                              @RequestParam("date") String date) {
	        if (image.isEmpty()) {
	            return ResponseEntity.badRequest().body("Image file is empty");
	        }

	        try {
	            ImageEntity imageEntity = new ImageEntity();
	            imageEntity.setDate(date);
	            imageEntity.setImageData(image.getBytes());

	            imageRepository.save(imageEntity);

	            return ResponseEntity.ok("Image uploaded successfully");
	        } catch (IOException e) {
	            return ResponseEntity.status(500).body("Failed to upload image");
	        }
	    }
	 @GetMapping("/images")
	    public ResponseEntity<List<ImageEntity>> getImages() {
	        List<ImageEntity> images = imageRepository.findAll();
	        return ResponseEntity.ok(images);
	    }

	

}
