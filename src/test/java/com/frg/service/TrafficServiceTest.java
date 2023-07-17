package com.frg.service;

import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.frg.domain.TrafficDTO;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class TrafficServiceTest {
	
	@Setter(onMethod_ = @Autowired)
	private TrafficService service;
	
	@Test
	public void testGetTrafficLight() {

		TrafficDTO trfDto = new TrafficDTO();

		trfDto.setUser_id("smith01");

		List<Integer> trfResult = service.getTrafficLight(trfDto);

		log.info("신호등 결과 - " + trfResult);

		assertNotNull(trfResult);
	}
}
