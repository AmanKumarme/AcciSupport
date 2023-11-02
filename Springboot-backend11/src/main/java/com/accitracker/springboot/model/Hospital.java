package com.accitracker.springboot.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Hospitals", uniqueConstraints = @UniqueConstraint(columnNames = "email_id"))
public class Hospital {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "licence_no")
	private String licenceNo;
	
	@Column(name = "mobile_no")
	private String mobileNo;
	
	
	@Column(name = "email_id")
	private String emailId;
	
	@Column(name = "city")
	private String city;
	
	@Column(name = "pincode")
	private String pincode;
	
	@Column(name = "latitude")
	private String latitude;
	
	
	@Column(name = "longitude")
	private String longitude;
	
	@Column(name = "password")
	private String password;

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

	public String getLicenceNo() {
		return licenceNo;
	}

	public void setLicenceNo(String licenceNo) {
		this.licenceNo = licenceNo;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Hospital(long id, String name, String licenceNo, String mobileNo, String emailId, String city,
			String pincode, String latitude, String longitude, String password) {
		super();
		this.id = id;
		this.name = name;
		this.licenceNo = licenceNo;
		this.mobileNo = mobileNo;
		this.emailId = emailId;
		this.city = city;
		this.pincode = pincode;
		this.latitude = latitude;
		this.longitude = longitude;
		this.password = password;
	}

	public Hospital() {
		super();
	}
	
	

}
