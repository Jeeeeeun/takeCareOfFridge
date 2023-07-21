package com.frg.service;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.event.annotation.BeforeTestClass;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.frg.domain.UserDTO;
import com.frg.mapper.SignUpMapper;
import com.frg.service.impl.SignUpServiceImpl;
import com.frg.util.SHAEncodeUtil;

import junit.framework.Assert;
import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class SignUpServiceTest {
	
	@Setter(onMethod_ = @Autowired)
	SignUpMapper mapper;
	
	@Setter(onMethod_ = @Autowired)
	SignUpService service;
	
	
	@Test @Ignore
	public void testPolicyPwd() {
		String inalidPwd = "test123";
		String validPwd = "test123!";
		
		log.info("inalidPwd - "+inalidPwd);
		log.info("service.policyPwd - " + service.policyPwd(inalidPwd));
		log.info("validPwd - "+validPwd);
		log.info("service.policyPwd - " + service.policyPwd(validPwd));
		assertFalse(service.policyPwd(inalidPwd));
		assertTrue("실패" , service.policyPwd(validPwd));
	}
	
	@Test @Ignore
	public void testIsExistId() {
		//중복 있는 아이디 (임의로 DB에 있는걸 지정해줘서 사용)
		String id = "Test01";
		//중복 없는 아이디
		String di2 = "Test03";
		//서비스레이어에 있는 메소드가 제대로 작동하는지 확인하고 원하는 값이 반환하는지 검토를 위해 테스트
		//중복이랑 true || 중복이 아니라면 false를 반환
		//이유는 중복된 것이 있다면 쿼리문에 따라 1이 나옴
		//아니라면 0이 나와서 그 값에 따라서 참 거짓으로 나눠짐
		boolean serviceResult = service.isExistId(id);
		boolean serviceResult2 = service.isExistId(di2);
		
		//String 메세지를 쓸수 있는 assertTrue를 사용해서 여러 테스트 결과중 어떤게 잘 못 됐는지 확인하기 위해서 사용
		//중복
		assertTrue("실패", serviceResult);
		//중복 아님
		assertFalse("실패2", serviceResult2);
	}
	
	@Test @Ignore
	public void testRegisterUser() {
		//테스트 회원가입 이름 , 아이디 , 비밀번호 , 이메일
		UserDTO user = new UserDTO();
//		user.setUser_name("Test3");
//		user.setUser_id("Test3");
//		user.setUser_pw("test123!");
//		user.setUser_email("test3@com");
		
		//비밀번호 제약 조건X
		user.setUser_name("test3");
		user.setUser_id("test3");
		user.setUser_pw("test123!");
		user.setUser_email("test04@com");
		
		boolean registerd = service.registerUser(user);
		log.info("service.isExistId(user.getUser_id())" + service.isExistId(user.getUser_id()));
		log.info("servie.policyPwd(user.getUser_pw())" + service.policyPwd(user.getUser_pw()));
		log.info("service.registerUser(user)" + service.registerUser(user));
		assertTrue("실패", registerd);
		
		
	}
	
}