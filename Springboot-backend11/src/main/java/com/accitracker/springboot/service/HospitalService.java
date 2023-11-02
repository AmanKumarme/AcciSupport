package com.accitracker.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accitracker.springboot.model.Hospital;
import com.accitracker.springboot.model.ImageEntity;
import com.accitracker.springboot.repository.IHospitalRepository;
import com.accitracker.springboot.repository.ImageRepository;


@Service
public class HospitalService {
	
	private final IHospitalRepository hospitalRepository;

	@Autowired
	public HospitalService(IHospitalRepository hospitalRepository) {
		this.hospitalRepository= hospitalRepository;
	}
	
	public Hospital loginHospital(String email, String password ,long id) {

		Hospital hospital =hospitalRepository .getUserByEmailIdAndPassword(email, password,id);

		return hospital;
	}
	
	 @Autowired
	    private ImageRepository imageRepository;

	    public List<ImageEntity> getImagesByHospitalId(Long hospitalId) {
	        return imageRepository.findByHospitalId(hospitalId);
	    }
}
