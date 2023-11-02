package com.accitracker.springboot.controller;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accitracker.springboot.exception.ResourceNotFoundException;
import com.accitracker.springboot.model.Hospital;
import com.accitracker.springboot.model.ImageEntity;
import com.accitracker.springboot.repository.IHospitalRepository;
import com.accitracker.springboot.service.HospitalService;


@RestController
@RequestMapping("/api/v1/hospitals")
public class HospitalController {
	
	
	@Autowired
	private IHospitalRepository hospitalRepository;
	@Autowired
	private HospitalService hospitalService;
	
	
	@GetMapping("/")
	public List<Hospital> getAllHospital(){
		
		return hospitalRepository.findAll();
	}
	
	@PostMapping("/")
	public Hospital createHospital( @RequestBody  Hospital hospital) {
		
		return hospitalRepository.save(hospital);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Hospital> getHospitalById(@PathVariable long id){
		Hospital hospital= hospitalRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("user not exist with id "+ id));
		
		return ResponseEntity.ok(hospital) ;
	}
	@PutMapping("/{id}")
	public ResponseEntity<Hospital> updateHospital( @PathVariable long id,  @RequestBody Hospital hospitalDetails){
		Hospital updateHospital= hospitalRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("user not exist with id "+ id));
		updateHospital.setName(hospitalDetails.getName());
		updateHospital.setLicenceNo(hospitalDetails.getLicenceNo());
		updateHospital.setMobileNo(hospitalDetails.getMobileNo());
		updateHospital.setEmailId(hospitalDetails.getEmailId());
		updateHospital.setCity(hospitalDetails.getCity());
		updateHospital.setPincode(hospitalDetails.getPincode());
		updateHospital.setLatitude(hospitalDetails.getLatitude());
		updateHospital.setLongitude(hospitalDetails.getLongitude());
		updateHospital.setPassword(hospitalDetails.getPassword());
		
		
		hospitalRepository.save(updateHospital);
		
		return ResponseEntity.ok(updateHospital);
		
	}
	@GetMapping("/Acci/{hospitalId}")
    public ResponseEntity<List<ImageEntity>> getImagesByHospitalId(@PathVariable Long hospitalId) {
        List<ImageEntity> images = hospitalService.getImagesByHospitalId(hospitalId);
        return ResponseEntity.ok(images);
    }
	
	
	
}
