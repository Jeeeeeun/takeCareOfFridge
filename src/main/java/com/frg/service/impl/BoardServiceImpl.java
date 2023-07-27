package com.frg.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.frg.domain.BoardDTO;
import com.frg.mapper.BoardMapper;
import com.frg.service.BoardService;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

	@NonNull
	private BoardMapper mapper;
	
	@Override
	public List<BoardDTO> getAllPosts() {
		List<BoardDTO> allPosts = mapper.selectAllPosts();
		return allPosts;
	}

	@Override
	public int getChangedLike(BoardDTO brdDto) {
	   int updatedLike = mapper.selectChangedLike(brdDto);
	   
	   return updatedLike;
	}

}
