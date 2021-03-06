package com.baemin.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.baemin.dto.MemberCheckResult;
import com.baemin.dto.Order;
import com.baemin.dto.OrderDetail;
import com.baemin.dto.Page;

public interface OrderService {

	ResponseEntity<?> order(Order order, MemberCheckResult result);

	Map<String, Object> getOrderList(Page page, MemberCheckResult result);

	OrderDetail getOrderDetail(String orderNum, MemberCheckResult result);


}
