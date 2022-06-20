package com.baemin.service;

import java.util.List;
import java.util.Map;

import com.baemin.dto.MenuOption;
import com.baemin.dto.Store;

public interface StoreService {
	// 가게 목록 가져오기
	List<Store> getStoreList(int category, int address);
	
	// 가게 상세
	Map<String, Object> getStoreDetail(long storeId);

}
