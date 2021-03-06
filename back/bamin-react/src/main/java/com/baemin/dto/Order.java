package com.baemin.dto;

import lombok.Data;

@Data
public class Order {
	private String orderNum;
	private long storeId;
	private int usedPoint;
	private int totalPrice;
	
	private String payMethod;
	private String request;
	private String address;
	private Cart[] cartList;

	// 로그인 중 아닐때 사용함
	private String guestId;
}

