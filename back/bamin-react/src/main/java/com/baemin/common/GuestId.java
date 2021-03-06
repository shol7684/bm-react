package com.baemin.common;

import java.util.Random;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class GuestId {
	
	private static final String COOKIE_ID = "gid";
	private static final int COOKIE_EXP = 60 * 60 * 24 * 30; // 한달	
	
	public static String getId() {
		
		ServletRequestAttributes attr = (ServletRequestAttributes)RequestContextHolder.currentRequestAttributes();
		
		Cookie[] cookies = attr.getRequest().getCookies();
		
		for(int i=0;i<cookies.length;i++) {
			if(cookies[i].getName().equals(COOKIE_ID)) {
				return cookies[i].getValue();
			}
		}
		
		return createId(attr.getResponse());
	}
	
	private static String createId(HttpServletResponse response) {
		String guestId = System.currentTimeMillis() + "_" + UUID.randomUUID().toString().substring(0,8);
		
		Cookie cookie = new Cookie(COOKIE_ID, guestId);
		
		cookie.setMaxAge(COOKIE_EXP);
		cookie.setHttpOnly(true);
		response.addCookie(cookie);
		
		return guestId;
	}
	
	
	

}
