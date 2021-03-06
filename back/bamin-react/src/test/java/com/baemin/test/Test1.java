package com.baemin.test;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import com.baemin.dto.MenuOption;
import com.baemin.dto.Store;
import com.baemin.dto.User;
import com.google.gson.Gson;

import lombok.Data;

@SpringBootTest
public class Test1 {
	
	@Autowired
	private SqlSession sql;
	
	
	@Test
	public void test5() {
		Store s = new Store();
		s.setCategory(100);
		s.setStoreName("테스트19");
		s.setStoreAddress1(31099);
		s.setStoreAddress2("두정동 1313442");
		s.setStoreAddress3("");
		s.setStorePhone("010-1111-2222");
		s.setStoreImg("");
		s.setOpeningTime("01:30");
		s.setClosingTime("23:50");
		s.setMinDelevery(2000);
		s.setDeleveryTime(50);
		s.setDeleveryTip(5000);
		s.setStoreIntroduction("테스트");
		
		
		
		for(int i=151;i<350;i++) {
			String name = "테스트";
			s.setStoreName(name + i);
			
//			System.out.println(s.getStoreName());
		sql.insert("store.testInsert", s);
		}
		
		
		System.out.println();
	}
	
	
//	@Test
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
		
		Gson gson = new Gson();
		
		List<MenuOption> list = new ArrayList<>();
		MenuOption m = new MenuOption();
		m.setOptionId(1);
		m.setName("치즈");
		m.setPrice(500);
		
		MenuOption m2 = new MenuOption();
		m2.setOptionId(2);
		m2.setName("베이컨");
		m2.setPrice(1000);
		
		list.add(m);
		list.add(m2);
		
		
		String j = gson.toJson(list);
		
		System.out.println(j);
		
			
	}
	
	@Data
	class Login {
		
		private User user;
	}
	
//	@Test
	public void test2() {
		System.out.println("test2");
		User user = new User();
		
//		user.setUsername("admin");
		user.setNickname("sumin");
		
		Login login = null;
		login = new Login();
		login.setUser(user);
		
		System.out.println(Optional.ofNullable(login).map(Login::getUser)
			.map(User::getUsername));		
	}
	
	
//	@Test
	public void test3() {
		LocalDate date = LocalDate.now();
		
		String formatDate = date.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		
		StringBuilder sb = new StringBuilder();
		
		for(int i=0;i<8;i++) {
			sb.append((int)((Math.random()*10)));
		}
		
		System.out.println(formatDate + sb);
	}
	
	
//	@Test
	public void test4() {
		String s = null;
		
		boolean r = s != null;
		
		System.out.println(r);

	}
	
	
	
}
