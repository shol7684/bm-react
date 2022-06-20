package com.baemin.dao;

import java.util.List;
import java.util.Map;

import com.baemin.dto.Menu;
import com.baemin.dto.MenuOption;
import com.baemin.dto.Store;

public interface StoreDAO {

	List<Store> getStoreList(Map<String, Object> map);

	Store getStoreDetail(long storeId);

	List<Menu> getMenuList(long storeId);

	List<MenuOption> getOptionList(long storeId);
	
}
