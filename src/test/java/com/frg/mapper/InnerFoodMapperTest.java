package com.frg.mapper;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
import com.frg.domain.UserDTO;

import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class InnerFoodMapperTest {

	@Autowired
	private InnerFoodMapper mapper;

	@Test
	@Ignore
	public void testInsertInnerFood() throws ParseException, Exception {

		InnerDTO dto = new InnerDTO();
		dto.setFrg_name("fridge1");
		dto.setUser_id("john01");
		dto.setIn_state("frozen");
		dto.setIn_name("사이다");
		String dateString = "2023-11-30";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate date = LocalDate.parse(dateString,formatter);
		dto.setIn_expireDate(date);
		dto.setIn_type("음료");
		dto.setIn_count(3);
		dto.setIn_company("칠성");
		
		assertNotNull(mapper.insertFood(dto));
	}

	@Test
	@Ignore
	public void testSelectFrgName() {

		UserDTO dto = new UserDTO();
		dto.setUser_id("john01");
		List<String> frgList = mapper.selectFrgName(dto);
		log.info(frgList);
		assertNotNull(frgList);
	}

	@Test
	@Ignore
	public void testSelectFoodAPI() {

		FoodApiDTO dto = new FoodApiDTO();
		dto.setApi_name("오삼불고기");
		List<FoodApiDTO> foodList = mapper.selectFoodAPI(dto);
		assertNotNull(foodList);
	}

	@Test
	@Ignore
	public void testselectAllInnerView() throws ParseException, Exception {
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("john01");

		List<InnerDTO> result = mapper.selectAllInnerView(dto);
		assertEquals(4, result.size()); // 리스트의 크기가 1인지 확인합니다.
		System.out.println(dto);
	}

	@Test
	public void testselectPartInnerView() throws ParseException, Exception {
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("john01");
		dto.setFrg_name("fridge2");

		List<InnerDTO> result = mapper.selectPartInnerView(dto);
		assertEquals(3, result.size()); // 리스트의 크기가 1인지 확인합니다.
		System.out.println(dto);
	}

	@Test
	@Ignore
	public void testSelectInnerData() {
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("john01");
		dto.setFrg_name("fridge2");
		dto.setIn_name("멸치볶음");
		
		List<InnerDTO> result = mapper.selectInnerData(dto);
		assertNotNull(result);
				
	}
}
