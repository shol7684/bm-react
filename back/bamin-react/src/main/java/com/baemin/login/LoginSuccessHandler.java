package com.baemin.login;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import com.baemin.dto.User;
import com.google.gson.Gson;

@Service
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		
		LoginDetails principalDetails = (LoginDetails) authentication.getPrincipal();
		User user = principalDetails.getUser();
		user.setPassword(null);
			
		response.getWriter().write(new Gson().toJson(user));
	}

}
