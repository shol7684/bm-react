package com.baemin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.baemin.aop.MemberCheck;
import com.baemin.dto.MemberCheckResult;
import com.baemin.dto.Order;
import com.baemin.dto.OrderDetail;
import com.baemin.dto.Page;
import com.baemin.service.OrderService;

@Controller
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@MemberCheck
	@PostMapping("/order")
	public ResponseEntity<?> order(@RequestBody Order order, MemberCheckResult result){
		System.out.println("주문하기");
		return orderService.order(order, result);
	}
	
	
	@MemberCheck
	@GetMapping("/orderList")
	public ResponseEntity<?> orderList(Page page, MemberCheckResult result){
		System.out.println("주문목록");
		
		Map<String, Object> list = orderService.getOrderList(page, result);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@MemberCheck
	@GetMapping("/orderDetail")
	public ResponseEntity<?> orderDeteail(String orderNum, MemberCheckResult result) {
		System.out.println("주문 상세");
		OrderDetail detail = orderService.getOrderDetail(orderNum, result);
		return new ResponseEntity<>(detail, HttpStatus.OK);
	}
	
	
	

}
