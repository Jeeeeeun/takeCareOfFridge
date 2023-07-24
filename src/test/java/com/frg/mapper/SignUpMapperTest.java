package com.frg.mapper;

import static org.junit.Assert.*;

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
@Log4j
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class SignUpMapperTest {
	
	@Setter(onMethod_ = @Autowired)
	SignUpMapper mapper;

	@Test @Ignore
	public void testInsertUser() {
		UserDTO user = new UserDTO();
		user.setUser_name("Test2");
		user.setUser_id("Test02");
		user.setUser_pw("test123!");
		user.setUser_email("test1@com");
		
		mapper.insertUser(user);
	}
	
	@Test @Ignore
	public void testIdExist() {
		String id = "Test01";
		int count = mapper.idExist(id);
		
		log.info("출력 - "+count);
		assertEquals(1, count);
	}
}
