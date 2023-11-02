package com.accitracker.springboot.dto;

public class LoginRequest {
	
	private String email;
    private String password;
    private long Id;
    private String role;
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	
	public long getId() {
		return Id;
	}
	public void setId(long id) {
		Id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

}
