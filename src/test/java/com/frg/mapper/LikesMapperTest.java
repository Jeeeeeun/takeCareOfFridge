package com.frg.mapper;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.frg.domain.LikesDTO;

import org.springframework.beans.factory.annotation.Autowired;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class LikesMapperTest {
	
	@Setter(onMethod_ = @Autowired)
	private LikesMapper mapper;

	@Test @Ignore
	public void testSelectAllLikeStatus() {
		LikesDTO likeDto = new LikesDTO();
		
		likeDto.setUser_id("smith01");
		
		List<LikesDTO> likeStatus = mapper.selectAllLikeStatus(likeDto);
		
		log.info("좋아요 상태 - " + likeStatus);
		
		assertNotNull(likeStatus);
	}
	
	@Test @Ignore
	public void testInsertLike() {
		
		int expect = 1;
		
		LikesDTO likeDto = new LikesDTO();
		
		likeDto.setBoard_index(13);
		likeDto.setUser_id("smith01");
		
		int result = mapper.insertLike(likeDto);
		
		assertEquals(expect, result);
		
	}
	
	@Test
	public void testDeleteLike() {
		
		int expect = 1;
		
		LikesDTO likeDto = new LikesDTO();
		
		likeDto.setBoard_index(13);
		likeDto.setUser_id("smith01");
		
		int result = mapper.deleteLike(likeDto);
		
		assertEquals(expect, result);
		
	}

}
