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

	@Test
	@Ignore
	public void testInsertFrgList() { // 냉장고 정보 삽입
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

	@Test @Ignore
	public void testSelectFrgList() { // 냉장고 정보 가져오기
		FrgListDTO frgDto = new FrgListDTO();

		frgDto.setUser_id("smith01");

		List<FrgListDTO> frgList = mapper.selectFrgList(frgDto);

		log.info("냉장고 목록 - " + frgList);

		assertNotNull(frgList);
	}

	@Test
	public void testUpdateFrgList() {
		
		int expect = 1;
		
		FrgListDTO frgDto = new FrgListDTO();
		
		frgDto.setFrg_name("fridge1");
		frgDto.setFrg_shape("H");
		frgDto.setFrg_Astate("frozen");
		frgDto.setFrg_Bstate("cool");
		frgDto.setFrg_index(1);
		frgDto.setUser_id("smith01");
		
		int result = mapper.updateFrgList(frgDto);
		
		log.info(frgDto);
		
		assertEquals(expect, result);
	}
}
