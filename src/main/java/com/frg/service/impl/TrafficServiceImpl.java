package com.frg.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.frg.domain.ResponseDTO;
import com.frg.domain.TrafficDTO;

import com.frg.mapper.TrafficMapper;
import com.frg.service.TrafficService;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TrafficServiceImpl implements TrafficService {

	@NonNull
	private TrafficMapper mapper;

	@Override
	public List<Integer> getTrafficLight(TrafficDTO trfDto) {

		List<Integer> trfList = mapper.selectTrafficLight(trfDto);

		return trfList;
	}

	@Override
	public List<TrafficDTO> getTrafficStandard(TrafficDTO dto) {

		List<TrafficDTO> trfStandard = mapper.selectTrafficStandard(dto);

		return trfStandard;
	}

	@Override
	public ResponseDTO modifyTrafficStandard(TrafficDTO dto) {

		ResponseDTO response = new ResponseDTO();

		int affectedRow = mapper.updateTrafficStandard(dto);
		response.setAffectedRow(affectedRow);

		String resMsg = null;

		if (affectedRow == 1) {
			resMsg = "냉장고 정보를 수정하는 데 성공했습니다.";
		} else {
			resMsg = "냉장고 정보를 수정하는 데 실패했습니다.";
		}

		response.setResMsg(resMsg);

		return response;
	}

}
