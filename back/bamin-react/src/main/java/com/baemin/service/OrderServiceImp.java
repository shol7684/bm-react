package com.baemin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.baemin.common.GuestId;
import com.baemin.aop.MemberCheck;
import com.baemin.common.CreateOrderNumber;
import com.baemin.dao.OrderDAO;
import com.baemin.dto.MemberCheckResult;
import com.baemin.dto.Order;
import com.baemin.dto.OrderDetail;
import com.baemin.dto.Page;
import com.baemin.dto.User;
import com.google.gson.Gson;

@Service
public class OrderServiceImp implements OrderService {

	@Autowired
	private OrderDAO orderDAO;
	
	@Override
	@Transactional
	public ResponseEntity<?> order(Order order, MemberCheckResult result) {
		System.out.println("사용 포인트 : " + order.getUsedPoint());
		
		// 회원 유저
		if(result.isMember() == true) {
			// 사용한 포인트가 회원 포인트보다 많을때 
			System.out.println("사용 포인트 : " + order.getUsedPoint());
			if(order.getUsedPoint() > result.getUser().getPoint()) {
				return new ResponseEntity<>("포인트 사용 에러", HttpStatus.BAD_REQUEST);
			}
			
		}
		order.setOrderNum(CreateOrderNumber.getOrderNumer());
		
		Gson gson = new Gson();
		
		String orderMenuJson = gson.toJson(order.getCartList());
		
		String ss = GuestId.getId();
		
		System.out.println("ss: "+ ss);
		
		
		// 로그인 상태에 사용 포인트가 있다면 포인트 감소
		
		// 로그인 상태 시 포인트 적립
		
		
		Map<String, Object> map = new HashMap<>();
		map.put("userId", result.getUserId());
		map.put("order", order);
		map.put("orderMenuJson", orderMenuJson);
		map.put("member", result.isMember());
		
		orderDAO.order(map);
		
		Map<String, Object> orderList = getOrderList(new Page(1), result);
			
		return new ResponseEntity<>(orderList, HttpStatus.OK);
		
	}
		
	public Map<String, Object> getOrderList(Page page, MemberCheckResult result) {
		Map<String, Object> map = new HashMap<>();
		int count = orderDAO.getOrderListCount(result);
		page.setTotalPage(count, false);
		
		map.put("page", page);
		map.put("result", result);
		System.out.println(page);
		List<OrderDetail> orderList = orderDAO.getOrderList(map);
		
		map.put("orderList", orderList);
		
		return map;
	}

	
	
	@Override
	public OrderDetail getOrderDetail(String orderNum, MemberCheckResult result) {
		Map<String,Object> map = new HashMap<>();
		map.put("orderNum", orderNum);
		map.put("member", result.isMember());
		
		return orderDAO.getOrderDetail(map);
	}



}
