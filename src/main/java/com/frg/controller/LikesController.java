package com.frg.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.frg.domain.BoardDTO;
import com.frg.domain.LikesDTO;
import com.frg.domain.ResponseDTO;
import com.frg.service.BoardService;
import com.frg.service.LikesService;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/comm/*")
@AllArgsConstructor
@Log4j
public class LikesController {

	@NonNull
	private LikesService likeService;
	
	@NonNull
	private BoardService brdService;
	
	
	@PostMapping("/addLike")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> clickLike(HttpSession session, Model model, @RequestBody LikesDTO likeDto, BoardDTO brdDto) { // 좋아요 추가
		log.info("좋아요 추가");
		
		String userId = (String) session.getAttribute("SESS_ID");
		
		likeDto.setUser_id(userId);
		brdDto.setBoard_index(likeDto.getBoard_index());

		
		ResponseDTO response = likeService.registerLike(likeDto);
		
		boolean success = true;
		
		if(response.getAffectedRow() <= 0) {
			success = false;
		}

		Map<String, Object> responseMap = new HashMap<>();
		
		// 좋아요 처리 성공
		if (success) {
			int updatedLike = brdService.getChangedLike(brdDto); // 좋아요 수 변화된 값
			responseMap.put("response", response);
			responseMap.put("updatedLike", updatedLike);
			return ResponseEntity.ok(responseMap);
		}
		// 좋아요 처리 실패
		else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap);
		}
		
	}
	
	
	@PostMapping("/cancelLike")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> cancelLike(HttpSession session, Model model, @RequestBody LikesDTO likeDto, BoardDTO brdDto) { // 좋아요 취소
		log.info("좋아요 취소");
		
		String userId = (String) session.getAttribute("SESS_ID");
		
		likeDto.setUser_id(userId);
		brdDto.setBoard_index(likeDto.getBoard_index());
		
		ResponseDTO response = likeService.removeLike(likeDto);
		
		boolean success = true;
		
		if(response.getAffectedRow() <= 0) {
			success = false;
		}

		Map<String, Object> responseMap = new HashMap<>();
		
		// 좋아요 취소 성공
		if (success) {
			int updatedLike = brdService.getChangedLike(brdDto); // 좋아요 수 변화된 값
			responseMap.put("response", response);
			responseMap.put("updatedLike", updatedLike);
			return ResponseEntity.ok(responseMap);
		}
		// 좋아요 취소 실패
		else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap);
		}
		
	}
}
