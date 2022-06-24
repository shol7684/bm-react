package com.baemin.dto;

import java.util.Objects;

import lombok.Builder;
import lombok.Data;

@Data
public class User {
	private Object userId;
	private String username;
	private String password;
	private String email;
	private String nickname;
	private String phone;
	private String role;
	private int point;
	
}
