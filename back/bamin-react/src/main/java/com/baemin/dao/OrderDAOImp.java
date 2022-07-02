package com.baemin.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.baemin.dto.MemberCheckResult;
import com.baemin.dto.Order;
import com.baemin.dto.OrderDetail;
import com.baemin.dto.User;
import com.baemin.login.LoginDetails;

@Repository
public class OrderDAOImp implements OrderDAO {

	@Autowired
	private SqlSession sql;

	@Override
	public void order(Map<String, Object> map) {
		sql.insert("order.order", map);
	}


	@Override
	public List<OrderDetail> getOrderList(Map<String, Object> map) {
		return sql.selectList("order.orderList", map);
	}
	
	@Override
	public OrderDetail getOrderDetail(Map<String, Object> map) {
		return sql.selectOne("order.orderDetail", map);
	}


	@Override
	public int getOrderListCount(MemberCheckResult result) {
		return sql.selectOne("order.orderListCount", result);
	}

	
	
	



}
