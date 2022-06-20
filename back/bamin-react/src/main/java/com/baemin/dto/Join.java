package com.baemin.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Pattern;

import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.validation.annotation.Validated;

import lombok.Builder.Default;
import lombok.Data;

@Data
public class Join {
	
	@Pattern(regexp = "[A-Za-z0-9]{4,15}$", message = "아이디는 영어, 숫자 4 ~15자리로 입력 가능합니다")
	private String username;
	
	private String password;
		
	@Pattern(regexp = "^([0-9a-zA-Z_\\.-]+)@([0-9a-zA-Z_-]+)(\\.[0-9a-zA-Z_-]+){1,2}$" , message = "이메일을 정확히 입력해 주세요")
	private String email;
	
	@Pattern(regexp = "^[가-힣|a-z|A-Z|0-9|]{4,10}", message = "닉네임은 한글, 영어, 숫자만 4 ~10자리로 입력 가능합니다")
	private String nickname;
	
	@Pattern(regexp = "^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$", message = "전화번호를 확인해 주세요")
	private String phone;
}