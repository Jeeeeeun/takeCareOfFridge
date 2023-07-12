package com.frg.service;

import static org.junit.Assert.assertEquals;

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
public class FrgListServiceTest {

	@Setter(onMethod_=@Autowired)
	private FrgListService service;
	
	@Test
	public void testRegisterFrgList() {
		int expect = 1;
		
		FrgListDTO dto = new FrgListDTO();
		
		dto.setUser_id("smith01");
		dto.setFrg_name("SAMSUNG");
		dto.setFrg_shape("V");
		dto.setFrg_Astate("cool");
		dto.setFrg_Bstate("frozen");
		
		int result = service.registerFrgList(dto);
		
		log.info(dto);
		
		assertEquals(expect, result);
	}

}
