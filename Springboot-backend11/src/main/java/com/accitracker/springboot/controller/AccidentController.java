package com.accitracker.springboot.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.accitracker.springboot.dto.HospitalResponse;
import com.accitracker.springboot.model.Hospital;
import com.accitracker.springboot.model.ImageEntity;
import com.accitracker.springboot.service.AccidentService;

@RestController
@RequestMapping("/api/v1")
public class AccidentController {

    @Autowired
    private AccidentService accidentService;


    @GetMapping("/nearest-hospital")
    public ResponseEntity<HospitalResponse> getNearestHospital(@RequestParam double latitude, @RequestParam double longitude) {
        ImageEntity accidentImage = new ImageEntity();
        accidentImage.setLatitude(String.valueOf(latitude));
        accidentImage.setLongitude(String.valueOf(longitude));
        
        Hospital nearestHospital = accidentService.findNearestHospital(accidentImage);
        HospitalResponse response = new HospitalResponse(nearestHospital);
        return ResponseEntity.ok(response);
    }
}
