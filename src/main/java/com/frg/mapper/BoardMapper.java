package com.frg.mapper;

import java.util.List;

import com.frg.domain.BoardDTO;

public interface BoardMapper {
	List<BoardDTO> selectAllPosts();
}
