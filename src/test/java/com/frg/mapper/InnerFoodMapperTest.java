package com.frg.mapper;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
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
	public void testInsertInnerFood() throws ParseException, Exception {
		InnerDTO dto = new InnerDTO();
		dto.setFrg_name("fridge1");
		dto.setUser_id("john01");
		dto.setIn_state("frozen");
		dto.setIn_name("대패삼겹살");
		String dateString = "2023-05-20";
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = dateFormat.parse(dateString);
		dto.setIn_expireDate(date);
		dto.setIn_type("여행용");
		dto.setIn_count(5);
		dto.setIn_company("마트");

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
		dto.setUser_id("john01");
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
		dto.setIn_name("멸치볶음");

		List<InnerDTO> result = mapper.selectInnerData(dto);
		assertNotNull(result);

	}
}
