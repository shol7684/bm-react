package com.baemin.dto;

import lombok.Data;

@Data
public class Page {
	private int page;
	
	private int pageSize;
	private int firstList;
//	private int lastList;
	
	private int navigationSize;
	private int navigationStart;
	private int navigationEnd;
	
	private boolean prevPage;
	private boolean nextPage;

	public Page(Integer page) {
		this.page = page != null ? page : 1;
		init();
	}
	
	
	private void init() {
		this.pageSize = 10;
		this.navigationSize = 5;
		
		init(pageSize, navigationSize);
	}
	
	private void init(int pageSize, int navigationSize) {
		this.firstList = (page - 1) * pageSize;
		
		this.navigationStart = page - (page-1) % navigationSize;
		this.navigationEnd = navigationStart + navigationSize -1;
		
		if(navigationStart > 1) {
			this.prevPage = true;
		}
	}
	
	
	
	
	public void setTotalPage(int total, boolean infinityScroll) {
		int lastPage = (int) Math.ceil(total / (double) pageSize);
		System.out.println("마지막 페이지 : "+ lastPage) ;
		
		if(infinityScroll == true) {
			init(this.pageSize, 1);
		}
		
		if(this.navigationEnd > lastPage) {
			this.navigationEnd = lastPage;
		}
		
		if(navigationStart + navigationSize <= lastPage) {
			this.nextPage = true;
		}
	}
	
	
	
	
	
	
	
	
}
