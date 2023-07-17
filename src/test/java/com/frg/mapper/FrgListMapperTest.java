package com.frg.mapper;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.frg.domain.FrgListDTO;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class FrgListMapperTest {

	@Setter(onMethod_ = @Autowired)
	private FrgListMapper mapper;
	
	@Test @Ignore
	public void testInsertFrgList() {
		int expect = 1;
		
		FrgListDTO dto = new FrgListDTO();
		
		dto.setUser_id("smith01");
		dto.setFrg_name("SAMSUNG");
		dto.setFrg_shape("V");
		dto.setFrg_Astate("cool");
		dto.setFrg_Bstate("frozen");
		
		log.info(dto);
		
		int result = mapper.insertFrgList(dto);
		
		assertEquals(expect, result);
	}
	
	@Test
	public void testSelectTrafficLight() {
		
		FrgListDTO dto = new FrgListDTO();
		
		dto.setUser_id("smith01");
		
		List<FrgListDTO> frgList = mapper.selectFrgList(dto);
		
		log.info("냉장고 목록 - " + frgList);
		
		assertNotNull(frgList);
	}

}
