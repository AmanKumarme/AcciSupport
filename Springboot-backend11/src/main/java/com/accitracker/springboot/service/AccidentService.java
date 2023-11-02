package com.accitracker.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accitracker.springboot.model.Accident;
import com.accitracker.springboot.model.Hospital;
import com.accitracker.springboot.model.ImageEntity;
import com.accitracker.springboot.repository.AccidentRepository;
import com.accitracker.springboot.repository.IHospitalRepository;
import com.accitracker.springboot.utility.NearestHospitalCalculator;

@Service
public class AccidentService {

    @Autowired
    private AccidentRepository accidentRepository;

    @Autowired
    private IHospitalRepository hospitalRepository;

    @Autowired
    private NearestHospitalCalculator nearestHospitalCalculator;

    public void saveAccidentReport(ImageEntity accidentImage) {
        Accident accident = new Accident();
        accident.setDate(accidentImage.getDate());
        accident.setCity(accidentImage.getCity());
        accident.setLatitude(accidentImage.getLatitude());
        accident.setLongitude(accidentImage.getLongitude());
        accident.setImageData(accidentImage.getImageData());
        
        
        // Save the accident entity to the repository
        accidentRepository.save(accident);

        // After saving the accident, find the nearest hospital and process it
        Hospital nearestHospital = findNearestHospital(accidentImage);
     
    }

    public Hospital findNearestHospital(ImageEntity accidentImage) {
        List<Hospital> hospitals = hospitalRepository.findAll(); // Retrieve all hospitals from the repository
        return nearestHospitalCalculator.findNearestHospital(accidentImage, hospitals);
    }
}
