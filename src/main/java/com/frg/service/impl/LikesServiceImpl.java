package com.frg.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.frg.domain.LikesDTO;
import com.frg.domain.ResponseDTO;
import com.frg.mapper.LikesMapper;
import com.frg.service.LikesService;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LikesServiceImpl implements LikesService {

	@NonNull
	private LikesMapper mapper;

	@Override
	public List<LikesDTO> getAllLikeStatus(LikesDTO likeDto) {

		List<LikesDTO> likeStatus = mapper.selectAllLikeStatus(likeDto);

		return likeStatus;
	}

	@Override
	public ResponseDTO registerLike(LikesDTO likeDto) {

		ResponseDTO response = new ResponseDTO();

		int affectedRow = mapper.insertLike(likeDto);

		response.setAffectedRow(affectedRow);

		String resMsg;

		if (affectedRow == 1) {
			resMsg = "좋아요가 처리되었습니다.";
		} else {
			resMsg = "좋아요 처리 중 오류가 발생했습니다.";
		}

		response.setResMsg(resMsg);

		return response;
	}

	@Override
	public ResponseDTO removeLike(LikesDTO likeDto) {

		ResponseDTO response = new ResponseDTO();

		int affectedRow = mapper.deleteLike(likeDto);

		response.setAffectedRow(affectedRow);

		String resMsg;

		if (affectedRow == 1) {
			resMsg = "좋아요가 취소 처리되었습니다.";
		} else {
			resMsg = "좋아요 취소 처리 중 오류가 발생했습니다.";
		}

		response.setResMsg(resMsg);

		return response;
	}

}
