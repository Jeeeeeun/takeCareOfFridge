package com.frg.mapper;

import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.log;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class InnerFoodMapperTest {
	
	@Autowired
	private InnerFoodMapper mapper;

	@Test
	public void testInsertInnerAuto() {
		assertNotNull(mapper.insertInnerAuto());
	}
	
//	@Test 
//	public void testInsertInnerCustom() {
//
//	}
//	
//	@Test
//	public void testSelectFrgName() {
//
//	}

}
