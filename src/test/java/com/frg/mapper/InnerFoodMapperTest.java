package com.frg.mapper;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;

import java.time.format.DateTimeFormatter;
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
		dto.setFrg_name("samsung");
		dto.setUser_id("smith01");
		dto.setIn_state("frozen");
		dto.setIn_name("보쌈");
		String dateString = "2020-01-15";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		Date date = (Date) formatter.parse(dateString);
		dto.setIn_expireDate(date);
		dto.setIn_type("밀키트");
		dto.setIn_count(2);
		dto.setIn_company("농심");
		
		// insertFood 메서드를 호출할 때 SomeException이 발생하지 않도록 테스트
		mapper.insertFood(dto);
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
	@Ignore
	public void testselectPartInnerView() throws ParseException, Exception {
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("smith01");
		dto.setFrg_name("fridge2");

		List<InnerDTO> result = mapper.selectPartInnerView(dto);
		log.info("result - " + result);
		System.out.println("result - " + result);

		assertNotEquals(null, result);
	}

	@Test
	@Ignore
	public void testSelectInnerData() {
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("john01");
		dto.setFrg_name("fridge2");
		dto.setIn_name("용가리치킨");

		List<InnerDTO> result = mapper.selectInnerData(dto);
		System.out.println(result);

	}
	
	@Test
	@Ignore
	public void testUpdateFood() {
		
		InnerDTO dto = new InnerDTO();
		dto.setFrg_name("fridge2");
		dto.setUser_id("john01");
		dto.setIn_name("찐만두");
		dto.setIn_count(6);
		String dateString = "2020-01-15";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		Date date = (Date) formatter.parse(dateString);
		dto.setIn_expireDate(date);
		dto.setIn_company("농심");
		dto.setIn_type("찜");
		dto.setIn_state("frozen");
		dto.setIn_index(68);
		
		mapper.updateFood(dto);
		
	}	
	
	@Test
	@Ignore
	public void testDeleteInnerData() {
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("smith01");
		dto.setFrg_name("fridge2");
		dto.setIn_name("김치");
		
		mapper.deleteFood(dto);
	}
}
