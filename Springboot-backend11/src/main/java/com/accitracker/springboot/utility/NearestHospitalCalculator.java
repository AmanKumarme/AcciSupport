package com.accitracker.springboot.utility;
import java.util.List;

import org.springframework.stereotype.Component;

import com.accitracker.springboot.model.Hospital;
import com.accitracker.springboot.model.ImageEntity;

@Component
public class NearestHospitalCalculator {

    public Hospital findNearestHospital(ImageEntity accidentImage, List<Hospital> hospitals) {
        Hospital nearestHospital = null;
        double minDistance = Double.MAX_VALUE;

        for (Hospital hospital : hospitals) {
            double distance = calculateDistance(
                    Double.parseDouble(accidentImage.getLatitude()),
                    Double.parseDouble(accidentImage.getLongitude()),
                    Double.parseDouble(hospital.getLatitude()),
                    Double.parseDouble(hospital.getLongitude())
            );

            if (distance < minDistance) {
                minDistance = distance;
                nearestHospital = hospital;
            }
        }

        return nearestHospital;
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of the Earth in kilometers

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c;

        return distance;
    }
}
