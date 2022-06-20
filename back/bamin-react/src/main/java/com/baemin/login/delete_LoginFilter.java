package com.baemin.login;
//package com.baemin.login;
//
//import java.io.BufferedReader;
//import java.io.IOException;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.Cookie;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.stereotype.Component;
//
//import com.baemin.dto.Login;
//import com.baemin.dto.User;
//import com.google.gson.Gson;
//
//
//// /login 으로 로그인 요청을 하면 동작하는 필터
//// 시큐리티 설정에서 form로그인을 disable해서 동작하지 않음
//// 그래서 다시 시큐리티 설정에 addFilter로 등록함
////@Component
//public class LoginFilter extends UsernamePasswordAuthenticationFilter {
//	
//	private AuthenticationManager authenticationManager;
//	
//	public LoginFilter(AuthenticationManager authenticationManager) {
//		this.authenticationManager = authenticationManager;
//	}
//	
//	@Override
//	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
//			throws AuthenticationException {
//		Gson gson = new Gson();
//		
//		try {
//			BufferedReader br = request.getReader();
//			
//			String r = br.readLine();
//			Login login = gson.fromJson(r, Login.class);
//			
//			// detailsService 실행
//			// 입력한 아이디, 비번과 db값 일치하는지 확인
//			System.out.println(1);
//			Authentication authenticaion = 
//					authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));
//			
//			System.out.println(2);
//			
//			// 로그인 실패시 실행 안됨
//			// 자동로그인 체크
//			if(login.isRemember() == true) {
//				System.out.println("자동로그인 체크");
//				Remember re = new Remember();
//				
//				re.test();
//			}
//			
//			return authenticaion;
//			
//			
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		
//		return null;
//		
//	}
//	
//	
//	@Override
//	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
//	 	Authentication authResult) throws IOException, ServletException {
//		
//		LoginDetails principalDetails = (LoginDetails) authResult.getPrincipal();
//		User user = principalDetails.getUser();
//		user.setPassword(null);
//		
//		// 유저 객체 세션에 등록
//		Authentication authenticaion = 
//				new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
//		SecurityContextHolder.getContext().setAuthentication(authenticaion);
//		
//		response.getWriter().write(new Gson().toJson(user));
//		
//	}
//	
//	@Override
//	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
//			AuthenticationException failed) throws IOException, ServletException {
//
//		System.out.println("로그인 필터 로그인 실패");
//		super.unsuccessfulAuthentication(request, response, failed);
//	}
//	
//	
//	
//}
