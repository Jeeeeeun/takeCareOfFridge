package com.frg.mapper;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.frg.domain.BoardDTO;

public interface BoardMapper {
	List<BoardDTO> selectAllPosts(); // 게시글 목록 전체 조회(내림차순)
	
	int selectChangedLike(BoardDTO dto); // 해당 게시글의 좋아요 수 값 변동되는 것 가져오기
	
	List<BoardDTO> selectPostsByWord(Map<String, Object> params); // 검색어에 따른 게시글 필터링
	
	List<BoardDTO> selectPostsByDate(@Param("fromDate") LocalDate fromDate, @Param("toDate") LocalDate toDate); // 기간에 따른 게시글 필터링
}
