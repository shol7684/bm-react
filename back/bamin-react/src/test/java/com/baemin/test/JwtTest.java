package com.baemin.test;

import java.util.Date;
import java.util.Map;

import org.junit.jupiter.api.Test;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.google.gson.Gson;

public class JwtTest {

	@Test
	public void jwtText() {
		String secretKey = "test";
		
		String jwtToken = JWT.create()
		.withSubject("token")
		.withExpiresAt(new Date(System.currentTimeMillis() + (1000 * 60 * 5) ))
		.withClaim("id", 1)
		.withClaim("username", "sumin")
		.sign(Algorithm.HMAC512(secretKey));

		
		System.out.println(jwtToken);
		
		
//		String username = 
		System.out.println(JWT.require(Algorithm.HMAC512(secretKey)).build()
				.verify(jwtToken).getClaim("as").asString());
		
		String json = "{\"username\":\"admin\",\"password\":\"1234\"}";
		
		Gson gson = new Gson();
		
		Map map = gson.fromJson(json, Map.class);
		
		System.out.println(map);
		
		System.out.println(map.get("username"));
		
		
	}
}
