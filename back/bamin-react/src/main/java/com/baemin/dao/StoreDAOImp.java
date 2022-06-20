package com.baemin.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.baemin.dto.Menu;
import com.baemin.dto.MenuOption;
import com.baemin.dto.Store;

@Repository
public class StoreDAOImp implements StoreDAO {
	
	@Autowired
	private SqlSession sql;

	@Override
	public List<Store> getStoreList(Map<String, Object> map) {
		return sql.selectList("store.storeList", map);
	}

	@Override
	public Store getStoreDetail(long storeId) {
		return sql.selectOne("store.storeDetail", storeId);
	}

	@Override
	public List<Menu> getMenuList(long storeId) {
		return sql.selectList("store.menuList", storeId);
	}

	@Override
	public List<MenuOption> getOptionList(long storeId) {
		return sql.selectList("store.optionList", storeId);
	}

}
