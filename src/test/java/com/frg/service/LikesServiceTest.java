package com.frg.service;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.beans.factory.annotation.Autowired;

import com.frg.domain.LikesDTO;
import com.frg.domain.ResponseDTO;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class LikesServiceTest {

	@Setter(onMethod_ = @Autowired)
	private LikesService service;

	@Test
	@Ignore
	public void testGetAllLikeStatus() {
		LikesDTO likeDto = new LikesDTO();

		likeDto.setUser_id("smith01");

		List<LikesDTO> likeStatus = service.getAllLikeStatus(likeDto);

		log.info("좋아요 상태 - " + likeStatus);

		assertNotNull(likeStatus);
	}

	@Test
	@Ignore
	public void testRegisterLike() {

		LikesDTO likeDto = new LikesDTO();

		likeDto.setBoard_index(13);
		likeDto.setUser_id("smith01");

		ResponseDTO response = service.registerLike(likeDto);

		log.info("좋아요? - " + likeDto);
		log.info("좋아요 성공했어? - " + response);

		assertNotNull(response);
	}

	@Test
	//@Ignore
	public void testRemoveLike() {

		LikesDTO likeDto = new LikesDTO();

		likeDto.setBoard_index(13);
		likeDto.setUser_id("smith01");

		ResponseDTO response = service.removeLike(likeDto);

		log.info("좋아요 취소? - " + likeDto);
		log.info("좋아요 취소 됐어? - " + response);
		
		assertNotNull(response);
	}

}
