package com.frg.mapper;

import static org.junit.Assert.*;

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
public class TrafficMapperTest {

	@Setter(onMethod_ = @Autowired)
	private TrafficMapper mapper;
	
	@Test @Ignore
	public void testSelectTrafficLight() {
		
		TrafficDTO dto = new TrafficDTO();
		
		dto.setUser_id("smith01");
		
		List<Integer> trfResult = mapper.selectTrafficLight(dto);
		
		log.info(trfResult); // 반환하는 값에 user_id가 없기 때문에 toString에서 user_id는 null로 나오는 게 정상이다.
		assertNotNull(trfResult);
	}
	
	@Test
	public void testSelectTrafficStandard() {
		TrafficDTO dto = new TrafficDTO();
		
		dto.setUser_id("smith01");
		
		List<TrafficDTO> trfStandard = mapper.selectTrafficStandard(dto);
		
		log.info(trfStandard);
		
		assertNotNull(trfStandard);
	}

	@Test @Ignore
	public void testUpdateTrafficStandard() {
		
		int expect = 1;
		
		TrafficDTO dto = new TrafficDTO();
		
		dto.setDangerous(5);
		dto.setWarning(-20);
		dto.setUser_id("smith01");
		
		int result = mapper.updateTrafficStandard(dto);
		
		assertEquals(expect, result);
	}
}
