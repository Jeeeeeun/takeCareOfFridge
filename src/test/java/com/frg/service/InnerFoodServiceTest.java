package com.frg.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.frg.domain.FoodApiDTO;
import com.frg.domain.InnerDTO;

import lombok.Setter;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class InnerFoodServiceTest {

	@Setter(onMethod_=@Autowired)
	InnerFoodService service;
	
	@Test  @Ignore
	public void testRegisterInnerAuto() throws ParseException {
		
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("smith01");
		dto.setFrg_name("LG");
		dto.setIn_count(30);
		String dateString = "2023-01-30";
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = dateFormat.parse(dateString);
		dto.setIn_expireDate_custom(date);
		dto.setIn_state("frozen");
		
		int cnt = service.registerInnerAuto(dto);
		assertEquals(1, cnt);

	}
	
	@Test @Ignore 
	public void testRegisterInnerCustom() throws ParseException {
		
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("smith01");
		dto.setFrg_name("samsung");
		dto.setIn_name("산채비빔밥");
		dto.setIn_count(3);
		String dateString = "2023-02-20";
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = dateFormat.parse(dateString);
		dto.setIn_expireDate_custom(date);
		dto.setIn_type("유기농 식품");
		dto.setIn_state("cool");
		
		int cnt=service.registerInnerCustom(dto);
		assertEquals(1, cnt);

	}
	
	@Test
	public void testSelectFoodAPI() {
		FoodApiDTO dto = new FoodApiDTO();
		dto.setApi_name("산채비빔밥");
		List<FoodApiDTO> foodList = service.selectFoodAPI(dto);
		assertNotNull(foodList);
	}
	
	@Test @Ignore
	public void testSelectAllInnerView() throws ParseException {
		
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("john01");
		dto.setFrg_name("fridge2");
		
	    List<InnerDTO> result = service.selectAllInnerView(dto); 
	    assertEquals(4, result.size()); // 리스트의 크기가 1인지 확인합니다.
	    System.out.println(dto);
	}
	
	
	@Test @Ignore
	public void testSelectPartInnerView() throws ParseException {
		
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("john01");
		dto.setFrg_name("fridge2");
		
	    List<InnerDTO> result = service.selectPartInnerView(dto); 
	    assertEquals(3, result.size()); // 리스트의 크기가 1인지 확인합니다.
	    System.out.println(dto);

	}

}
