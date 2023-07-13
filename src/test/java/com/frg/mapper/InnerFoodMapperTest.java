package com.frg.mapper;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.frg.domain.InnerDTO;

import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class InnerFoodMapperTest {
	
	@Autowired
	private InnerFoodMapper mapper;
	
	@Test
	public void testInsertInnerAuto() throws ParseException {
		
		InnerDTO dto = new InnerDTO();
		
		dto.setFrg_name("LG");
		dto.setIn_count(5);
		String dateString = "2023-01-30";
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = dateFormat.parse(dateString);
		dto.setIn_expireDate_custom(date);
		dto.setIn_state("frozen");
		
		int cnt = mapper.insertInnerAuto(dto);
		assertEquals(1, cnt);
	}
	
	@Test @Ignore
	public void testInsertInnerCustom() throws ParseException {
		
		InnerDTO dto = new InnerDTO();
		dto.setFrg_name("samsung");
		dto.setIn_name("샐러드");
		dto.setIn_count(10);
		String dateString = "2021-06-10";
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = dateFormat.parse(dateString);
		dto.setIn_expireDate_custom(date);
		dto.setIn_type("다이어트 식품");
		dto.setIn_state("cool");
		
		int cnt = mapper.insertInnerCustom(dto);
		assertEquals(1, cnt);
		
	}
	
//	@Test
//	public void testSelectFrgName() {
//		
//		
//
//	}

}
