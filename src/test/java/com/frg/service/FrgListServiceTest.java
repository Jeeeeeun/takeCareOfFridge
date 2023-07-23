package com.frg.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.frg.domain.FrgListDTO;
import com.frg.domain.ResponseDTO;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class FrgListServiceTest {

	@Setter(onMethod_ = @Autowired)
	private FrgListService service;

	@Test
	@Ignore
	public void testRegisterFrgList() {

		FrgListDTO frgDto = new FrgListDTO();

		frgDto.setUser_id("smith01");
		frgDto.setFrg_name("SAMSUNG");
		frgDto.setFrg_shape("V");
		frgDto.setFrg_Astate("cool");
		frgDto.setFrg_Bstate("frozen");

		ResponseDTO response = service.registerFrgList(frgDto);

		log.info("입력값 - " + frgDto);
		log.info("응답" + response);

		assertNotNull(response);
	}

	@Test @Ignore
	public void testGetFrgList() {
		
		FrgListDTO frgDto = new FrgListDTO();

		frgDto.setUser_id("smith01");
		
		List<FrgListDTO> frgList = service.getFrgList(frgDto);
		
		log.info("냉장고 목록 - " + frgList);
		
		assertNotNull(frgList);
	}

	@Test @Ignore
	public void testModifyFrgList() {
		
		int expect = 1;
		
		FrgListDTO frgDto = new FrgListDTO();
		
		frgDto.setFrg_name("SAMSUNG");
		frgDto.setFrg_shape("V");
		frgDto.setFrg_Astate("frozen");
		frgDto.setFrg_Bstate("cool");
		frgDto.setFrg_index(1);
		frgDto.setUser_id("smith01");
		
		ResponseDTO resDto = service.modifyFrgList(frgDto);
		
		log.info("냉장고 객체 - " + frgDto);
		log.info("응답 - " + resDto);
		
		assertEquals(expect, resDto.getAffectedRow());
	}
	
	@Test
	public void testRemoveFrgList() {
		int expect = 1;
		
		FrgListDTO frgDto = new FrgListDTO();
		
		frgDto.setFrg_name("SAMSUNG");
		frgDto.setUser_id("smith01");
		ResponseDTO resDto = service.removeFrgList(frgDto);
		
		log.info("냉장고 객체 - " + frgDto);
		log.info("웅답 객체 - " + resDto);
		
		assertEquals(expect, resDto.getAffectedRow());
	}
}
