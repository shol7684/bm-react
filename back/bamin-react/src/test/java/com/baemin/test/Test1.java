package com.baemin.test;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

//@SpringBootTest
public class Test1 {
	
	@Autowired
	private SqlSession sql;
	
	@Test
	public void test1() throws IllegalArgumentException, IllegalAccessException {
		
//		User user = User.builder()
//				.username("")
//				.password("123")
//				.email("shol7684@naver.conm")
//				.nickname("sss")
//				.phone("01021112222")
//				.build();
		
		
//		System.out.println(user);
//		sql.insert("user.join", user);
//		String s = sql.selectOne("user.test");
		
		System.out.println(HttpStatus.BAD_REQUEST.value());
		

		
		
			
	}
}
