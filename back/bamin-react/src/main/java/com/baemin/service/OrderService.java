package com.baemin.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.baemin.dto.MemberCheckResult;
import com.baemin.dto.Order;
import com.baemin.dto.OrderDetail;
import com.baemin.dto.User;

public interface OrderService {

	ResponseEntity<?> order(Order order, MemberCheckResult result);

	List<OrderDetail> getOrderList(MemberCheckResult result);

	OrderDetail getOrderDetail(String orderNum, MemberCheckResult result);


}
