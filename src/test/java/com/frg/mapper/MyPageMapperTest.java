package com.frg.mapper;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.frg.domain.FrgListDTO;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class MyPageMapperTest {

	@Setter(onMethod_ = @Autowired)
	private MyPageMapper mapper;

	@Test
	public void testSelectFrgList() {
		FrgListDTO frgDto = new FrgListDTO();

		frgDto.setUser_id("smith01");

		List<FrgListDTO> frgList = mapper.selectFrgList(frgDto);

		log.info("냉장고 목록 - " + frgList);

		assertNotNull(frgList);
	}

}
