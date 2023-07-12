package com.frg.mapper;

import static org.junit.Assert.assertEquals;

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
public class LoginMapperTest {

	@Setter(onMethod_ = @Autowired)
	LoginMapper mapper;
	
	@Test 
	public void testSelectUser() {
		log.info("메롱");
		
		UserDTO dto = new UserDTO();
		
		dto.setUser_id("smith01");
	    dto.setUser_pw("123");
	    
	    int count = mapper.selectCountUser(dto);
	    
	    assertEquals(1, count);
	}

}
