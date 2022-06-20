package com.baemin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.baemin.dto.Join;
import com.baemin.login.LoginDetails;
import com.baemin.service.UserService;

import ch.qos.logback.core.recovery.ResilientSyslogOutputStream;

@Controller
public class UserController {
	
	@Autowired
	private UserService userService;
	
	// 새로고침시 로그인 정보 전송
	@GetMapping("/loginInfo")
	public ResponseEntity<?> login(@AuthenticationPrincipal LoginDetails user){
		if(user == null) {
			System.out.println("로그인 상태 아님");
			return new ResponseEntity<>(HttpStatus.OK);
		}
		user.getUser().setPassword(null);
		System.out.println("로그인 정보 : " + user);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	
	@PostMapping("/test")
	public ResponseEntity<?> test(@AuthenticationPrincipal LoginDetails principalDetails, String name){
		
		System.out.println("test");
		System.out.println(principalDetails);
		
//		String s = sql.selectOne("user.test");
//		System.out.println(s);
		
		System.out.println("name : " + name);
		
		
		
		return new ResponseEntity<>("112312312", HttpStatus.BAD_REQUEST);
	}
	
	
	
	
	
	@PostMapping("/join")
	public ResponseEntity<?> join(@RequestBody @Valid Join joinInfo, BindingResult bindingResult){
		
		if(bindingResult.hasErrors()) {
			List<FieldError> list = bindingResult.getFieldErrors();
			Map<String, String> errorMsg = new HashMap<>();
			
			for(int i=0;i<list.size();i++) {
				String field = list.get(i).getField(); 
				String message = list.get(i).getDefaultMessage(); 
				errorMsg.put(field, message);
			}
			return new ResponseEntity<>(errorMsg, HttpStatus.BAD_REQUEST);
		}
 		
		return new ResponseEntity<>(userService.join(joinInfo), HttpStatus.OK);
	}
	
	
	
	
	
	
	@PostMapping("/admin/test")
	public ResponseEntity<?> admin(){
		
		System.out.println("admin test page");
		
		
		return new ResponseEntity<>("gdgdgd1", HttpStatus.OK);
	}

	
	
	
}
