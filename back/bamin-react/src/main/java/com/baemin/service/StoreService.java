package com.baemin.service;

import java.util.List;
import java.util.Map;

import com.baemin.dto.MenuOption;
import com.baemin.dto.Page;
import com.baemin.dto.Store;

public interface StoreService {
	// 가게 목록 가져오기
	Map<String, Object> getStoreList(int category, int address, String sort, Page page);
	
	// 가게 상세
	Map<String, Object> getStoreDetail(long storeId);

	Map<String, Object> storeSearch(int address, String searchKeyword, Page page);

}
