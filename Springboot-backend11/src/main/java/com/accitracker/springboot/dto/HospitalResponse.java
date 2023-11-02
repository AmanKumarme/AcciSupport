package com.accitracker.springboot.dto;

import com.accitracker.springboot.model.Hospital;

public class HospitalResponse {
    private long id;
    private String name;
    private String city;
    private String latitude;
    private String longitude;

    public HospitalResponse(Hospital hospital) {
        this.id = hospital.getId();
        this.name = hospital.getName();
        this.city = hospital.getCity();
        this.latitude = hospital.getLatitude();
        this.longitude = hospital.getLongitude();
    }

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

  
}
