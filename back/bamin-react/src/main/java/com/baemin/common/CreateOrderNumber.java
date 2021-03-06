package com.baemin.common;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class CreateOrderNumber {
	public static String getOrderNumer() {
		LocalDate date = LocalDate.now();
		
		String formatDate = date.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		
		StringBuilder sb = new StringBuilder();
		
		for(int i=0;i<8;i++) {
			sb.append((int)((Math.random()*10)));
		}
		
		return formatDate + sb;
	}
}
