package com.frg.service;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.log;

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
	private MyPageService service;
	
	@Test
	public void testMyInfo() {
		UserDTO user = new UserDTO();
		user.setUser_id("test1");
		
		UserDTO result = service.selectMyInfo(user);
		
		log.info("service - " + result);
		
		assertNotNull(result);
	}

}
