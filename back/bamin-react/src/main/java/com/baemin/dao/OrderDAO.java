package com.baemin.dao;

import java.util.List;
import java.util.Map;

import com.baemin.dto.MemberCheckResult;
import com.baemin.dto.Order;
import com.baemin.dto.OrderDetail;
import com.baemin.dto.User;
import com.baemin.login.LoginDetails;

public interface OrderDAO {

	// 주문하기
	void order(Map<String, Object> map);

	// 주문목록
	List<OrderDetail> getOrderList(Map<String, Object> map);

	// 주문 상세
	OrderDetail getOrderDetail(Map<String, Object> map);

	int getOrderListCount(MemberCheckResult result);

	

	
}
