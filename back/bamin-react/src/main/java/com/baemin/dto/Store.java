package com.baemin.dto;

import lombok.Data;

@Data
public class Store {
	private long storeId;
	private int category;
	private String storeName;
	private int storeAddress1;
	private String storeAddress2;
	private String storeAddress3;
	private String storePhone;
	private String storeImg;
	private String openingTime;
	private String closingTime;
	private int minDelevery;
	private int deleveryTime;
	private int deleveryTip;
	private String storeIntroduction;
	
	private float scoreAvg;
	private int orderCount;
	private int reviewCount;
	private int managerCommentCount;
	private int likesCount;
	
	private int score1; // 리뷰 1점
	private int score2; // 리뷰 2점
	private int score3; // 리뷰 3점
	private int score4; // 리뷰 4점
	private int score5; // 리뷰 5점	
	
	private boolean isBusinessTime; // 지금이 영업시간?
	private boolean isOpen;	// 현재 오픈중?
	
	private int listCount;	// 매장 수
}
