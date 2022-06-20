package com.baemin.dto;

import java.util.Objects;

import lombok.Builder;
import lombok.Data;

@Data
public class User {
	private long userId;
	private String username;
	private String password;
	private String email;
	private String nickname;
	private String phone;
	private String role;
	private int point;
	
	
	// 리액트 state와
	// 세션 유저정보가 같은지 확인
	// password 빼고
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return Objects.equals(email, other.email) && Objects.equals(nickname, other.nickname)
				&& Objects.equals(phone, other.phone) && point == other.point && Objects.equals(role, other.role)
				&& userId == other.userId && Objects.equals(username, other.username);
	}
	@Override
	public int hashCode() {
		return Objects.hash(email, nickname, phone, point, role, userId, username);
	}
	
	
	
}
