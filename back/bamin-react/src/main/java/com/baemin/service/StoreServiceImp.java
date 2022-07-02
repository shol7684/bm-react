package com.baemin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baemin.dao.StoreDAO;
import com.baemin.dto.Menu;
import com.baemin.dto.MenuOption;
import com.baemin.dto.Page;
import com.baemin.dto.Store;

@Service
public class StoreServiceImp implements StoreService {

	@Autowired
	private StoreDAO storeDAO;

	@Override
	public Map<String, Object> getStoreList(int category, int address, String sort, Page page) {
		Map<String, Object> map = new HashMap<>();
		map.put("category", category);
		map.put("address", address);
		map.put("sort", sort);
		map.put("page", page);
		
		int count = storeDAO.getStoreCount();
		page.setTotalPage(count, true);
		List<Store> storeList = storeDAO.getStoreList(map);
		map.put("storeList", storeList);
		
		return map;
	}

	
	
	@Override
	@Transactional
	public Map<String, Object> getStoreDetail(long storeId) {
		Store storeDetail = storeDAO.getStoreDetail(storeId);
		List<Menu> menuList = storeDAO.getMenuList(storeId);
		List<MenuOption> optionList = storeDAO.getOptionList(storeId);
		
		System.out.println("가게 상세 : " + storeDetail);
		System.out.println("메뉴 목록 : " + menuList);
		System.out.println("옵션 목록 : " + optionList );
		Map<String, Object> map = new HashMap<>();
		
		map.put("storeDetail", storeDetail);
		map.put("menuList", menuList);
		map.put("optionList", optionList);
		
		return map;
	}



	@Override
	public Map<String, Object> storeSearch(int address, String searchKeyword, Page page) {
		Map<String, Object> map = new HashMap<>();
				
		map.put("address", address);
		map.put("searchKeyword", searchKeyword);
		map.put("page", page);
		
		int count = storeDAO.getSearchStoreCount(searchKeyword);
		page.setTotalPage(count, true);
		
		 List<Store> storeList = storeDAO.storeSearch(map);
		 map.put("storeList", storeList);
		
		return map;
	}


}
