package com.frg.service;

import java.util.List;

import com.frg.domain.LikesDTO;
import com.frg.domain.ResponseDTO;

public interface LikesService {
	List<LikesDTO> getAllLikeStatus(LikesDTO dto); // 좋아요 목록 전체 출력
	
	ResponseDTO registerLike(LikesDTO dto); // 좋아요 추가
	
	ResponseDTO removeLike(LikesDTO dto); // 좋아요 취소
}
