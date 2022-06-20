package com.baemin.dao;

import java.util.Map;

import com.baemin.dto.Join;

public interface UserDAO {
	//	아이디, 닉네임 중복확인
	Map<String, Integer> duplicateCheck(Join joinInfo);
	void Join(Join joinInfo);


}
