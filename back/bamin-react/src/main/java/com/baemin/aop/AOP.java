package com.baemin.aop;

import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.baemin.common.GuestId;
import com.baemin.dto.MemberCheckResult;
import com.baemin.dto.User;
import com.baemin.login.LoginDetails;

import ch.qos.logback.core.recovery.ResilientSyslogOutputStream;

@Aspect
@Component
public class AOP {

	@Around("@annotation(com.baemin.aop.MemberCheck)")
	public Object memberCheck(ProceedingJoinPoint j) throws Throwable   {
		
		ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		
		HttpServletRequest request = attr.getRequest();
		
//		MethodSignature methodSignature = (MethodSignature) j.getSignature();
//		System.out.println(methodSignature.getMethod());
		
		Object[] resultParameter = j.getArgs();
		
		for(int i=0;i<resultParameter.length;i++) {
			
			// 파라미터에 MemberCheckResult가 있을때
			if(resultParameter[i] instanceof MemberCheckResult) {
				Object sessionUser = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
				MemberCheckResult result = new MemberCheckResult();
				
				// 세션에 로그인 정보가 있으면 (로그인 상태)
				// userId, member = true 
				if(sessionUser instanceof LoginDetails) {
					LoginDetails user = (LoginDetails) sessionUser;
					result.setUserId(user.getUser().getUserId());
					result.setMember(true);
					result.setUser(user.getUser());
					
				} else {
				// 로그인 상태 아니면 userId = guestId, memeber = false
					result.setUserId(GuestId.getId());
					result.setMember(false);
				}
				
				resultParameter[i] = result;
			}
		}
		
		return j.proceed(j.getArgs());
		
		
	}
	

}
