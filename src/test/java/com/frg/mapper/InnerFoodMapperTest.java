package com.frg.mapper;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.ognl.ParseException;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.frg.domain.FoodApiDTO;
import com.frg.domain.InnerDTO;

import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class InnerFoodMapperTest {
	
	@Autowired
	private InnerFoodMapper mapper;
	
	@Test @Ignore
	public void testInsertInnerAuto() throws ParseException, Exception {
		
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("smith01");
		dto.setFrg_name("LG");
		dto.setIn_count(2);
		String dateString = "2023-11-30";
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = dateFormat.parse(dateString);
		dto.setIn_expireDate_custom(date);
		dto.setIn_state("frozen");
		
		int cnt = mapper.insertInnerAuto(dto);
		assertEquals(1, cnt);
	}
	
	@Test @Ignore 
	public void testInsertInnerCustom() throws ParseException, Exception {
		
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("smith01");
		dto.setFrg_name("samsung");
		dto.setIn_name("샐러드");
		dto.setIn_count(3);
		String dateString = "2021-06-10";
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = dateFormat.parse(dateString);
		dto.setIn_expireDate_custom(date);
		dto.setIn_type("다이어트 식품");
		dto.setIn_state("cool");
		
		int cnt = mapper.insertInnerCustom(dto);
		assertEquals(1, cnt);
		
	}
	
	@Test @Ignore
	public void testSelectFrgName() {
		
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("john01");
		List<String> frgList =  mapper.selectFrgName(dto);
		log.info(frgList);
		assertNotNull(frgList);
	}
	
	@Test @Ignore
	public void testSelectFoodAPI() {

		FoodApiDTO dto = new FoodApiDTO();
		dto.setApi_name("산채비빔밥");
		List<FoodApiDTO> foodList = mapper.selectFoodAPI(dto);
		assertNotNull(foodList);
	}
	
	
	@Test @Ignore
	public void testselectAllInnerView() throws ParseException, Exception {
	    InnerDTO dto = new InnerDTO();
	    dto.setUser_id("john01");

	    List<InnerDTO> result = mapper.selectAllInnerView(dto); 
	    assertEquals(4, result.size()); // 리스트의 크기가 1인지 확인합니다.
	    System.out.println(dto);
	}
	
	@Test @Ignore
	public void testselectPartInnerView() throws ParseException, Exception {
	    InnerDTO dto = new InnerDTO();
	    dto.setUser_id("john01");
	    dto.setFrg_name("fridge2");

	    List<InnerDTO> result = mapper.selectPartInnerView(dto); 
	    assertEquals(3, result.size()); // 리스트의 크기가 1인지 확인합니다.
	    System.out.println(dto);
	}
}
