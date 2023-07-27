package com.frg.mapper;

import java.util.List;

import com.frg.domain.LikesDTO;

public interface LikesMapper {
	List<LikesDTO> selectAllLikeStatus(LikesDTO dto); // 좋아요 목록 전체 출력 (화면 처음 렌더링될 때 모든 좋아요 내역 필요)
	
	int insertLike(LikesDTO dto); // 좋아요 추가 (빈 하트 클릭할 때)
	
	int deleteLike(LikesDTO dto); // 좋아요 취소 (꽉 찬 하트 클릭할 때)
}
