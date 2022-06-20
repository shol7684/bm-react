package com.baemin.dto;

import lombok.Data;

@Data
public class Order {
	
	private Cart[] cartList;
	private int usedPoint;
	private int totalPrice;
	
	private String payMethod;
	private String request;
	private String address;
	
	private User user;
}

