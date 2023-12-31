package com.frg.mapper;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.frg.domain.FrgListDTO;
import com.frg.domain.UserDTO;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class MyPageMapperTest {

	@Setter(onMethod_ = @Autowired)
	private MyPageMapper mapper;
	
	//마이페이지 내 정보 불러오는지 확인
	@Test @Ignore
	public void testSelectMyInfo() {
		UserDTO dto = new UserDTO();
		
		dto.setUser_id("test1");
		
		UserDTO myInfo = mapper.selectMyInfo(dto);
		
		log.info("내 정보 - " + myInfo);
		
		assertNotNull(myInfo);
	}
	//마이페이지에서 내 정보를 수정하고 그 값이 데이터베이스에 잘 적용되는지 확인
	@Test @Ignore
	public void testUpdateMyInfo() {
		UserDTO dto = new UserDTO();
		dto.setUser_id("test1");
		dto.setUser_name("test2");
		dto.setUser_pw("test123!");
		dto.setUser_email("test2@com");
		
		mapper.updateMyInfo(dto);
	}
	
	@Test @Ignore
	public void testDelete() {
		String id = "test1";
		
		int result = mapper.deleteUser(id);
		
		assertEquals(1, result);
	}
}
