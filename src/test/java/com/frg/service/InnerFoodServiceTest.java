package com.frg.service;

import static org.junit.Assert.assertEquals;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.frg.domain.InnerDTO;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class InnerFoodServiceTest {

	@Setter(onMethod_=@Autowired)
	InnerFoodService service;
	
//	@Test 
//	public void testRegisterInnerAuto() throws ParseException {
//		
//		log.info(service);
//		
//		InnerDTO dto = new InnerDTO();
//		dto.setFrg_name("samsung");
//		dto.setIn_count(10);
//		String dateString = "2023-07-10";
//		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//		Date date = dateFormat.parse(dateString);
//		dto.setIn_expireDate_custom(date);
//		dto.setIn_state("frozen");
//		
//		assertNotNull(service.registerInnerAuto(dto));
//
//	}
	
	@Test
	public void testRegisterInnerCustom() throws ParseException {
		
		InnerDTO dto = new InnerDTO();
		dto.setFrg_name("samsung");
		dto.setIn_count(10);
		String dateString = "2023-06-10";
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = dateFormat.parse(dateString);
		dto.setIn_expireDate_custom(date);
		dto.setIn_type("다이어트 식품");
		dto.setIn_state("frozen");
		
		int cnt=service.registerInnerCustom(dto);
		
		assertEquals(1, cnt);

	}

}
