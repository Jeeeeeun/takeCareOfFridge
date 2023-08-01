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
import com.frg.domain.FrgListDTO;
import com.frg.domain.InnerDTO;
import com.frg.domain.UserDTO;

import lombok.Setter;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class InnerFoodServiceTest {

	@Setter(onMethod_ = @Autowired)
	InnerFoodService service;

	@Test
	@Ignore
	public void testRegisterInnerFood() throws ParseException {
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("john01");
		dto.setFrg_name("fridge2");
		dto.setIn_state("cool");
		dto.setIn_name("알로에");
		String dateString = "2023-08-30";
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = dateFormat.parse(dateString);
		dto.setIn_expireDate(date);
		dto.setIn_type("음료");
		dto.setIn_count(10);
		dto.setIn_company("집");

		service.registerInnerFood(dto);
	}

	@Test
	@Ignore
	public void testSelectFrgName() {
		UserDTO dto = new UserDTO();
		dto.setUser_id("test12");
		List<String> nameList = service.selectFrgName(dto);
		assertNotNull(nameList);
	}

	@Test
	@Ignore
	public void testSelectFoodAPI() {
		FoodApiDTO dto = new FoodApiDTO();
		dto.setApi_name("산채비빔밥");
		List<FoodApiDTO> foodList = service.selectFoodAPI(dto);
		assertNotNull(foodList);
	}

	@Test
	@Ignore
	public void testSelectAllInnerView() throws ParseException {

		InnerDTO dto = new InnerDTO();
		dto.setUser_id("john01");
		dto.setFrg_name("fridge2");

		List<InnerDTO> result = service.selectAllInnerView(dto);
		assertEquals(4, result.size()); // 리스트의 크기가 1인지 확인합니다.
		System.out.println(dto);
	}

	@Test
	public void testSelectFrgNameAll() throws ParseException{
		FrgListDTO dto = new FrgListDTO();
		dto.setUser_id("smith01");
		dto.setFrg_index(2);
		
		service.selectFrgNameAll(dto);
		System.out.println(dto);
	}
	
	@Test
	@Ignore
	public void testSelectPartInnerView() throws ParseException {

		InnerDTO dto = new InnerDTO();
		dto.setUser_id("john01");
		dto.setFrg_name("fridge2");

		List<InnerDTO> result = service.selectPartInnerView(dto);
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

		List<InnerDTO> result = service.selectInnerData(dto);
		assertNotNull(result);
	}
	
	@Test
	@Ignore
	public void testDeleteInnerFood() {
		InnerDTO dto = new InnerDTO();
		dto.setUser_id("john01");
		dto.setFrg_name("fridge2");
		dto.setIn_name("본죽");
		
		service.deleteInnerFood(dto);
		
	}
	
	@Test
	@Ignore
	public void testUpdateInnerFood() throws ParseException {
		
		InnerDTO dto = new InnerDTO();
		dto.setFrg_name("samsung");
		dto.setUser_id("smith01");
		dto.setIn_name("감자만두");
		dto.setIn_count(6);
		String dateString = "2023-05-11";
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		java.util.Date date = formatter.parse(dateString);
		dto.setIn_expireDate(date);
		dto.setIn_company("농심");
		dto.setIn_type("찜");
		dto.setIn_state("frozen");
		dto.setIn_index(40);
		
		assertEquals(1,service.updateInnerFood(dto));
		
	}
}
