package com.frg.service;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.log;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.frg.domain.UserDTO;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class MyPageServiceTest {
	
	@Setter(onMethod_ = @Autowired)
	private SignUpService sguService;
	
	@Setter(onMethod_ = @Autowired)
	private MyPageService service;
	
	@Test @Ignore
	public void testMyInfo() {
		UserDTO user = new UserDTO();
		user.setUser_id("test1");
		
		UserDTO result = service.selectMyInfo(user);
		
		log.info("service - " + result);
		
		assertNotNull(result);
	}
	
	@Test @Ignore
	public void testUpdateMyInfo() {
		//테스트 회원가입 이름 , 아이디 , 비밀번호 , 이메일
		UserDTO user = new UserDTO();
//		user.setUser_name("Test3");
//		user.setUser_id("Test3");
//		user.setUser_pw("test123!");
//		user.setUser_email("test3@com");
		
		//비밀번호 제약 조건X
		user.setUser_id("test1");
		user.setUser_name("test1");
		user.setUser_pw("test123!");
		user.setUser_email("test1@com");
		
		boolean registerd = service.updateMyInfo(user);
		log.info("service.isExistEmail(user.getUser_이메일())" + sguService.isExistEmail(user.getUser_email()));
		log.info("servie.policyPwd(user.getUser_비밀번호())" + sguService.policyPwd(user.getUser_pw()));
		log.info("service.업데이트(user)" + service.updateMyInfo(user));
		assertTrue("실패", registerd);
	}
}
