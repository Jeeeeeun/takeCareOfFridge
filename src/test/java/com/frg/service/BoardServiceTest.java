package com.frg.service;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.beans.factory.annotation.Autowired;

import com.frg.domain.BoardDTO;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class BoardServiceTest {

	@Setter(onMethod_ = @Autowired)
	private BoardService service;
	
	@Test @Ignore
	public void testGetAllPosts() {
		List<BoardDTO> allPosts = service.getAllPosts();
		
		log.info("게시글 전체 목록 - " + allPosts);
		
		assertNotNull(allPosts);
	}
	
	@Test
	public void testGetChangedLike() {
		BoardDTO brdDto = new BoardDTO();
		
		brdDto.setBoard_index(13);
		
		int updatedLike = service.getChangedLike(brdDto);
		
		assertEquals(0, updatedLike);
	}

}
