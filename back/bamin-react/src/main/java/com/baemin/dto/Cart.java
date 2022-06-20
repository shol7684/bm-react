package com.baemin.dto;

import java.util.List;

import lombok.Data;

@Data
public class Cart {
	private String menuName;
	private int menuPrice;
	private int quantity;
	private List<MenuOption> option;
	private int total;
}
