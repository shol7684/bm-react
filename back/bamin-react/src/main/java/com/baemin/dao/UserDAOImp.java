package com.baemin.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.baemin.dto.Join;

@Repository
public class UserDAOImp implements UserDAO {

	@Autowired
	private SqlSession sql;

	@Override
	public void Join(Join joinInfo) {
		sql.insert("user.join", joinInfo);
	}

	@Override
	public Map<String, Integer> duplicateCheck(Join joinInfo) {
		return sql.selectOne("user.duplicateCheck", joinInfo);
	}
	

}
