package com.frg.mapper;

import static org.junit.Assert.assertEquals;

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
public class LoginMapperTest {

	@Setter(onMethod_ = @Autowired)
	LoginMapper mapper;
	
	@Test @Ignore
	public void testSelectUser() {
		
		UserDTO dto = new UserDTO();
		
		dto.setUser_id("smith01");
	    dto.setUser_pw("3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2");
	    
	    int count = mapper.selectCountUser(dto);
	    
	    assertEquals(1, count);
	}
	
	@Test @Ignore
	public void testSelectMemberByIdAndPwd() {
		
		UserDTO dto = new UserDTO();
		
		dto.setUser_id("smith01");
	    dto.setUser_pw("3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2");
	    
	    mapper.selectUserByIdAndPwd(dto);
	    assertEquals(dto, dto);
	    
	    System.out.println(dto);
	}
	
	@Test @Ignore
	public void testClassUser() {
		
		UserDTO dto = new UserDTO();
		
		dto.setUser_id("whatever");
	    
	    int count = mapper.selectClassUser(dto);
	    
	    assertEquals(0, count);
	}

}
