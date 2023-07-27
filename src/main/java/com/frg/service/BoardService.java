package com.frg.service;

import java.util.List;

import com.frg.domain.BoardDTO;

public interface BoardService {
	List<BoardDTO> getAllPosts(); // 게시글 목록 전체 조회(내림차순)
	
	int getChangedLike(BoardDTO dto);
}
