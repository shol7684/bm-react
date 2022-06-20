package com.baemin.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.baemin.dto.Order;
import com.baemin.login.LoginDetails;

@Service
public class OrderServiceImp implements OrderService {

	@Override
	public ResponseEntity<?> order(Order order, LoginDetails user) {
		System.out.println("사용 포인트 : " + order.getUsedPoint());
		
		// 회원 유저
		if(user != null) {
			// 사용한 포인트가 회원 포인트보다 많을때 
			System.out.println("사용 포인트 : " + order.getUsedPoint());
			if(order.getUsedPoint() > user.getUser().getPoint()) {
				return new ResponseEntity<>("포인트 사용 에러", HttpStatus.BAD_REQUEST);
			}
			
		}
		
		order.setCartList(null);
		System.out.println(order);
		
		
		return new ResponseEntity<>(HttpStatus.OK);
	}



}
