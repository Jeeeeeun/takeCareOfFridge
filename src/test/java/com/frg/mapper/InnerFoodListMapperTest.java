package com.frg.mapper;

import static org.junit.Assert.*;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.ibatis.ognl.ParseException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.frg.domain.InnerDTO;
import com.frg.domain.InnerDTOList;

import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class InnerFoodListMapperTest {
	
	@Autowired
	private InnerFoodListMapper innerDTOListMapper;


	@Test
	//@Ignore
	public void testInsertInnerFood() throws ParseException, Exception {
		
			InnerDTOList dtoList = new InnerDTOList();

	        InnerDTO dto1 = new InnerDTO();
	        dto1.setFrg_name("samsung");
	        dto1.setUser_id("smith01");
	        dto1.setIn_state("frozen");
	        dto1.setIn_name("보쌈곱배기");
	        String dateString = "2020-01-15";
	        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	        Date date = formatter.parse(dateString);
	        dto1.setIn_expireDate(date);
	        dto1.setIn_type("밀키트");
	        dto1.setIn_count(2);
	        dto1.setIn_company("농심");
	
	        InnerDTO dto2 = new InnerDTO();
	        dto2.setFrg_name("samsung");
	        dto2.setUser_id("smith01");
	        dto2.setIn_state("frozen");
	        dto2.setIn_name("꿀고구마");
	        String dateString2 = "2020-01-15";
	        SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd");
	        Date date2 = formatter2.parse(dateString2);
	        dto2.setIn_expireDate(date2);
	        dto2.setIn_type("밀키트");
	        dto2.setIn_count(2);
	        dto2.setIn_company("농심");
	
	        dtoList.getList().add(dto1);
	        dtoList.getList().add(dto2);
	
	        innerDTOListMapper.insertFoodList(dtoList);
	}


}
