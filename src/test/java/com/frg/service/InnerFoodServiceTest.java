package com.frg.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
import com.frg.domain.UserDTO;

import lombok.Setter;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class InnerFoodServiceTest {

	@Setter(onMethod_=@Autowired)
	InnerFoodService service;
	
	@Test 
	public void testRegisterInnerFood() throws ParseException {
		
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("john01");
		dto.setFrg_name("fridge1");
		dto.setIn_state("frozen");
		dto.setIn_name("육회");
		String dateString = "2023-01-30";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate date = LocalDate.parse(dateString, formatter);
		dto.setIn_expireDate(date);
		dto.setIn_type("다이어트 식품");
		dto.setIn_count(2);
		dto.setIn_company("동원");
		
		assertNotNull(service.registerInnerFood(dto));

	}
	
	@Test @Ignore
	public void testSelectFrgName() {
		UserDTO dto = new UserDTO();
		dto.setUser_id("test12");
		List<String> nameList= service.selectFrgName(dto);
		assertNotNull(nameList);
	}
	
	@Test @Ignore
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
	
	@Test @Ignore
	public void testSelectInnerData() {
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("john01");
		dto.setFrg_name("fridge2");
		dto.setIn_name("멸치볶음");
		
		List<InnerDTO> result = service.selectInnerData(dto);
		assertNotNull(result);
	}
}
