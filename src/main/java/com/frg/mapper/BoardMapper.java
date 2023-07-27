package com.frg.mapper;

import java.util.List;

import com.frg.domain.BoardDTO;

public interface BoardMapper {
	List<BoardDTO> selectAllPosts(); // 게시글 목록 전체 조회(내림차순)
	
	int selectChangedLike(BoardDTO dto); // 해당 게시글의 좋아요 수 값 변동되는 것 가져오기
}
