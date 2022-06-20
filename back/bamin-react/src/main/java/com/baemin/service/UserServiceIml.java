package com.baemin.service;

import java.util.Iterator;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.baemin.dao.UserDAO;
import com.baemin.dto.Join;
import com.baemin.dto.User;

import ch.qos.logback.core.recovery.ResilientSyslogOutputStream;

@Service
public class UserServiceIml implements UserService {

	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	
	@Override
	public String join(Join joinInfo) {
		
		// 아이디, 닉네임 중복검사
		Map<String, Integer> map = userDAO.duplicateCheck(joinInfo);
		// 결과 {nickname=1, username=0} 인데 
		// int a = map.get("nickname") 하면 형변환 에러나는지 모르겠음
		
		// 하나라도 중복(1)이 있다면 중복된 컬럼명 return  
		if(String.valueOf((map.get("username"))).equals("1")) {
			return "username";
		}
		
		if(String.valueOf((map.get("nickname"))).equals("1")) {
			return "nickname";
		}
		
		joinInfo.setPassword(encoder.encode(joinInfo.getPassword()));
		userDAO.Join(joinInfo);
		
		return null;
	}

	
	

}
