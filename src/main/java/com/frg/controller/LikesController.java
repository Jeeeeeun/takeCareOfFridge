package com.frg.controller;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.frg.domain.LikesDTO;
import com.frg.domain.ResponseDTO;
import com.frg.service.FrgListService;
import com.frg.service.LikesService;
import com.frg.service.TrafficService;

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
	
	
	@PostMapping("/addLike")
	@ResponseBody
	public ResponseEntity<ResponseDTO> clickLike(HttpSession session, @RequestBody LikesDTO likeDto) { // 좋아요 추가
		log.info("좋아요 추가");
		
		String userId = (String) session.getAttribute("SESS_ID");
		
		likeDto.setUser_id(userId);
		
		ResponseDTO response = likeService.registerLike(likeDto);
		
		boolean success = true;
		
		if(response.getAffectedRow() <= 0) {
			success = false;
		}

		// 좋아요 처리 성공
		if (success) {
			return ResponseEntity.ok(response);
		}
		// 좋아요 처리 실패
		else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
		
	}
	
	
	@PostMapping("/cancelLike")
	@ResponseBody
	public ResponseEntity<ResponseDTO> cancelLike(HttpSession session, @RequestBody LikesDTO likeDto) { // 좋아요 취소
		log.info("좋아요 취소");
		
		String userId = (String) session.getAttribute("SESS_ID");
		
		likeDto.setUser_id(userId);
		
		ResponseDTO response = likeService.removeLike(likeDto);
		
		boolean success = true;
		
		if(response.getAffectedRow() <= 0) {
			success = false;
		}

		// 좋아요 취소 성공
		if (success) {
			return ResponseEntity.ok(response);
		}
		// 좋아요 취소 실패
		else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
		
	}
}
