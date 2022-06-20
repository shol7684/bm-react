package com.baemin.dto;

import lombok.Data;

@Data
public class Login {
	private String username;
	private String password;
	private boolean remember;
}
