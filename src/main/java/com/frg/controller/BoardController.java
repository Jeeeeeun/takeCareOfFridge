package com.frg.controller;

import java.time.LocalDate;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.frg.domain.BoardDTO;
import com.frg.domain.LikesDTO;
import com.frg.service.BoardService;
import com.frg.service.LikesService;
import com.frg.service.LoginService;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/board/*")
@Log4j
public class BoardController {

	@Setter(onMethod_ = @Autowired)
	private BoardService boardService;
	
	@Setter(onMethod_ = @Autowired)
	private LikesService likeService;

	@GetMapping(value = "/list")
	public String getAllPosts(HttpSession session, Model model, LikesDTO likeDto, BoardDTO brdDto) {
		// 게시글 목록 전체 조회
		log.info("getAllPosts");
		
		String userId = (String) session.getAttribute("SESS_ID");
		
		likeDto.setUser_id(userId);

		
		List<BoardDTO> allPosts = boardService.getAllPosts(); // 게시글 전체 목록 조회(내림차순)
		List<LikesDTO> likeStatus = likeService.getAllLikeStatus(likeDto); // 좋아요 상태 조회
		
		model.addAttribute("allPosts", allPosts);
		model.addAttribute("likeStatus", likeStatus);
		model.addAttribute("userId", userId);
		
		return "/board/list";
	}
	
	@GetMapping(value = "/view/{board_index}")
	public String getPostDetails(@PathVariable("board_index") int boardIndex, Model model) {
	    // 게시글 하나 내용 조회
		
		return "/board/view";
	}
	
	@GetMapping("/create")
	public String createNewPost() {
		// 게시글 새로 작성
		return "/board/create";
	}
	
	@GetMapping("/edit/{board_index}")
	public String editPost() {
		// 게시글 수정
		return "/board/edit";
	}
	
	@GetMapping("/searchKeyword")
	public String searchPostsByWord(@RequestParam("search") String search, Model model) {
	    // search 변수를 사용하여 게시글 검색 처리
	    // model.addAttribute를 사용하여 검색 결과를 전달
		return "/board/list";
	}
	
	@GetMapping("/searchDate")
	public String searchPostsByDate(@RequestParam("fromDate") LocalDate fromDate, @RequestParam("toDate") LocalDate toDate, Model model) {
		// fromDate와 toDate 변수를 사용하여 게시글 검색 처리
	    // model.addAttribute를 사용하여 검색 결과를 전달
		return "/board/list";
	}
}