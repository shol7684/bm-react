package com.baemin.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.baemin.dto.Cart;
import com.baemin.dto.Login;
import com.baemin.dto.Order;
import com.baemin.dto.User;
import com.baemin.login.LoginDetails;
import com.baemin.service.OrderService;
import com.google.gson.Gson;

@Controller
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@PostMapping("/order")
	public ResponseEntity<?> order(@RequestBody Order order, @AuthenticationPrincipal LoginDetails user){
		System.out.println("주문하기");
		System.out.println("주문 유저 : " + order.getUser());
		
		System.out.println("세션 유저 : " + user);
		if(user != null) {
			
			// 세션 유저정보와 state 유저정보가 다르다면
			if(!user.getUser().equals(order.getUser())) {
				return new ResponseEntity<>("회원정보가 변경되었습니다. 다시 로그인 해주세요.", HttpStatus.BAD_REQUEST);
			}
			
			System.out.println();
		}
		
		
		
//		System.out.println(order.getUser().equals(user.getUser()));
		
		
		ResponseEntity<?> result = orderService.order(order, user);
		
		return result;
	}

}
