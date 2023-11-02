package com.accitracker.springboot.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import com.accitracker.springboot.model.ImageEntity;

public interface ImageRepository extends JpaRepository<ImageEntity, Long> {

	List<ImageEntity> findByUserId(Long userId);
	List<ImageEntity> findByHospitalId(Long hospitalId);
	  
}
