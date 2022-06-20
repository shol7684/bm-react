package com.baemin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.google.gson.Gson;

@Configuration
public class WebConfig {

//	@Bean 
//  public CorsFilter corsConfigurationSource() {
//	System.err.println("cors 필터");
//      CorsConfiguration configuration = new CorsConfiguration();
//
//      configuration.addAllowedOriginPattern("*");
//      configuration.addAllowedHeader("*");
//      configuration.addAllowedMethod("*");
//      configuration.setAllowCredentials(true);
//
//      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//      source.registerCorsConfiguration("/**", configuration);
//      return new CorsFilter(source);
//  }
}
