package com.frg.mapper;

import static org.junit.Assert.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.frg.domain.BoardDTO;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class BoardMapperTest {
	
	@Setter(onMethod_ = @Autowired)
	private BoardMapper mapper;
	
	@Test @Ignore
	public void testSelectAllPosts() { // 게시글 목록 전체 조회(내림차순)
		List<BoardDTO> allPosts = mapper.selectAllPosts();
		
		log.info("전체 게시글 목록 - " + allPosts);
		
		assertNotNull(allPosts);
	}

	@Test @Ignore
	public void testSelectChangedLike() {
		
		BoardDTO brdDto = new BoardDTO();
		
		brdDto.setBoard_index(13);
		
		int updatedLike = mapper.selectChangedLike(brdDto);
		
		assertEquals(0, updatedLike);
	}

	@Test @Ignore
	public void testSelectPostsByWord() {
		
		Map<String, Object> params = new HashMap<>();
		
		params.put("search", "추천");
		
		List<BoardDTO> filteredPosts = mapper.selectPostsByWord(params);
		
		log.info("검색된 데이터들 - " + filteredPosts);
		
		assertNotNull(filteredPosts);
	}
	
	@Test
	public void testSelectPostsByDate() {
		LocalDate fromDate = LocalDate.of(2023, 7, 14);
		LocalDate toDate = LocalDate.of(2023, 7, 20);
		
		List<BoardDTO> filteredPosts = mapper.selectPostsByDate(fromDate, toDate);
		
		log.info("검색된 데이터들 - " + filteredPosts);
		
		assertNotNull(filteredPosts);
	}
}
