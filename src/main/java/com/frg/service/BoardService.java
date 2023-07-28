package com.frg.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.frg.domain.BoardDTO;

public interface BoardService {
	List<BoardDTO> getAllPosts(); // 게시글 목록 전체 조회(내림차순)
	
	int getChangedLike(BoardDTO dto); // 좋아요 수 바뀐 값 가져오기
	
	List<BoardDTO> getPostsByWord(Map<String, Object> params); // 검색어로 게시글 목록 필터링
	
	List<BoardDTO> getPostsByDate(@Param("fromDate") LocalDate fromDate, @Param("toDate") LocalDate toDate); // 기간으로 게시글 목록 필터링
}
