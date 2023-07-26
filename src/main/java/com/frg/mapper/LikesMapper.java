package com.frg.mapper;

import java.util.List;

import com.frg.domain.LikesDTO;

public interface LikesMapper {
	List<LikesDTO> selectAllLikeStatus(LikesDTO dto); // 좋아요 목록 전체 출력
	
	int insertLike(LikesDTO dto); // 좋아요 추가
	
	int deleteLike(LikesDTO dto); // 좋아요 취소
}
