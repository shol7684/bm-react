package com.baemin.dto;

import java.util.Date;

import lombok.Data;

@Data
public class OrderDetail {
	private String orderNum;
	private long storeId;
	private Date orderDate;
	private String deleveryStatus;
	private String orderMenuJson;
	
//	private long userId;
//	private int deleveryAddress;
	private String deleveryAddress;
//	private String deleveryAddress3;
	private String payMethod;
	private int totalPrice;
	private int usedPoint;
	private String request;

	
	private String storeName;
	private String storeImg;
//	private String StoreThumb;
	private int deleveryTip;
	
	// 리뷰 상태 추가
//	private String reviewContent;
//	private float score;
//	private String reviewImg;
	
//	private int listCount; // 목록 총 갯수
//	
//	private int count1;	// 대기중 갯수
//	private int count2;	// 처리중 갯수
//	
//	private String impUid;
	

}
