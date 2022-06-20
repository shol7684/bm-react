package com.baemin.login;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.baemin.dto.User;

@Service
public class LoginDetailsService implements UserDetailsService {

	@Autowired
	private SqlSession sql;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = sql.selectOne("user.login", username);
		
		if(user == null) {
			throw new UsernameNotFoundException("login fail");
		}
		
		LoginDetails principalDetails = new LoginDetails();
		principalDetails.setUser(user);
		
		return principalDetails;
	}
	

}
