package com.frg.service.impl;

import org.springframework.stereotype.Service;

import com.frg.domain.InnerDTO;
import com.frg.mapper.InnerFoodMapper;
import com.frg.service.InnerFoodService;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InnerFoodServiceImpl implements InnerFoodService {

	@NonNull
	private InnerFoodMapper mapper;
	
	@Override
	public int registerInnerAuto(InnerDTO dto) {
		return mapper.insertInnerAuto(dto);
	}

	@Override
	public int registerInnerCustom(InnerDTO dto) {
		return mapper.insertInnerCustom(dto);
	}

}
