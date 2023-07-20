package com.frg.service;

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
public class LoginServiceTest {

	@Setter(onMethod_ = @Autowired)
	LoginService service;

	@Test
	@Ignore
	public void testGetCountUser() {
		UserDTO dto = new UserDTO();
		dto.setUser_id("smith01");
		dto.setUser_pw(
				"3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2");

		assertEquals(1, service.getCountUser(dto));
	}

	@Test
	@Ignore
	public void testGetUserByIdAndPwd() {
		UserDTO dto = new UserDTO();
		dto.setUser_id("smith01");
		dto.setUser_pw(
				"3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2");

		service.getUserByIdAndPwd(dto);
		assertEquals(dto, dto);

		System.out.println(dto);
	}
	
	@Test
	@Ignore
	public void testGetClassUser() {
		UserDTO dto = new UserDTO();
		dto.setUser_id("whatever");
		
		assertEquals(0, service.getClassUser(dto));
		System.out.println(dto);
	}

}
