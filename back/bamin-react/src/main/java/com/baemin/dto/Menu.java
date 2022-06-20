package com.baemin.dto;

import lombok.Data;

@Data
public class Menu {
	private long menuId;
  private long storeId;
  private String name;
  private int price;
  private String introduction;
  private String img;
  
  // 옵션 번호 1,2,4 ... 
  private String optionIds;
}