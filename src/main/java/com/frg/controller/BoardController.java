package com.frg.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.frg.domain.BoardDTO;
import com.frg.domain.LikesDTO;
import com.frg.service.BoardService;
import com.frg.service.LikesService;
import com.frg.service.LoginService;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/comm/*")
@Log4j
public class BoardController {

	@Setter(onMethod_ = @Autowired)
	private BoardService boardService;
	
	@Setter(onMethod_ = @Autowired)
	private LikesService likeService;

	@GetMapping(value = "/board")
	public String getAllPosts(HttpSession session, Model model, LikesDTO likeDto) {
		log.info("getAllPosts");
		
		String userId = (String) session.getAttribute("SESS_ID");
		
		likeDto.setUser_id(userId);
		
		List<BoardDTO> allPosts = boardService.getAllPosts(); // 게시글 전체 목록 조회
		List<LikesDTO> likeStatus = likeService.getAllLikeStatus(likeDto); // 좋아요 상태 조회
		
		model.addAttribute("allPosts", allPosts);
		model.addAttribute("likeStatus", likeStatus);
		model.addAttribute("userId", userId);
		
		return "/comm/board";
	}
}