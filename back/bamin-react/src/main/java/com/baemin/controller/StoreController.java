package com.baemin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.baemin.dto.MenuOption;
import com.baemin.dto.Store;
import com.baemin.service.StoreService;

@Controller
public class StoreController {
	
	@Autowired
	private StoreService storeService;
	
	@GetMapping("/storeList/{category}/{address}")
	public ResponseEntity<?> getStoreList(@PathVariable int category, @PathVariable int address) {
		System.out.println("주소 : " +address  );
		System.out.println("카테고리 : " + category);
		
		System.out.println("가게목록");
		
		List<Store> storeList = storeService.getStoreList(category, address / 100);
		
		System.out.println("가게목록 : "  + storeList);
		return new ResponseEntity<>(storeList, HttpStatus.OK);
	}
	
	
	@GetMapping("/store/detail/{storeId}")
	public ResponseEntity<?> getStoreDetail(@PathVariable long storeId) {
		System.out.println("가게 번호 : " + storeId  );
		
		Map<String, Object> map = storeService.getStoreDetail(storeId);
		
		
		return new ResponseEntity<>(map, HttpStatus.OK);
	}
	
	
	
	
	
	
	
	
	
	

}
