package com.baemin.config;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.baemin.login.LoginDetailsService;
import com.baemin.login.LoginFailureHandler;
import com.baemin.login.LoginSuccessHandler;
import com.baemin.login.LogoutHandler;

@Configuration
@EnableWebSecurity
//@EnableWebSecurity(debug = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Bean
	public BCryptPasswordEncoder encodePwd() {
		return new BCryptPasswordEncoder();
	}
	
	@Autowired
	private LoginDetailsService loginDetailsService;
	
	@Autowired 
	private LoginSuccessHandler loginSuccessHandler;
	
	@Autowired 
	private LoginFailureHandler loginFailureHandler;
	
	@Autowired
	private LogoutHandler logoutHandler;


	@Override
	protected void configure(HttpSecurity http) throws Exception {
//		http.csrf().disable();
//		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//			.and()
//		.addFilter(new JwtAuthenticationFilter(authenticationManager(), jwtUtil))
//		.addFilter(new JwtAuthoraztionFilter(authenticationManager(), jwtUtil))
//		.formLogin().disable()
//		.httpBasic().disable()
//		.authorizeRequests()
//		.antMatchers("/api/admin/**").hasRole("ADMIN")
//		.antMatchers("/api/manager/**").hasAnyRole("ADMIN, MANAGER")
//		.antMatchers("/api/user/**").hasAnyRole("ADMIN, MANAGER, USER")
//		.anyRequest().permitAll();
		http.csrf().disable();
		http
			.httpBasic().disable()
			.authorizeRequests()
			.antMatchers("/admin/**").hasRole("ADMIN")
			.antMatchers("/manager/**").hasAnyRole("ADMIN, MANAGER")
			.antMatchers("/user/**").hasAnyRole("ADMIN, MANAGER, USER")
			.anyRequest().permitAll()
		.and()
			.formLogin()
//			.loginPage("/") // 인증 필요한 페이지 접근시 이동페이지
			.loginProcessingUrl("/login")
			.successHandler(loginSuccessHandler)
			.failureHandler(loginFailureHandler)
		.and()
			.rememberMe()
			.key("remember-me-key")
			.rememberMeParameter("remember")
			.rememberMeCookieName("R-ID")
			.tokenValiditySeconds(60 * 1000 * 24 * 7)
			.userDetailsService(loginDetailsService)
		.and()
			.logout()
			.logoutSuccessHandler(logoutHandler)
			;
			
					
				
	}
	
	

	
	
	
	
}
