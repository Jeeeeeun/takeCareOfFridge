package com.frg.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.frg.domain.FoodApiDTO;
import com.frg.domain.InnerDTO;
import com.frg.domain.UserDTO;
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

	@Override
	public List<String> selectFrgName(UserDTO user_id) {
		return mapper.selectFrgName(user_id);
	}
	
	@Override
	public List<InnerDTO> selectAllInnerView(InnerDTO dto){
		return mapper.selectAllInnerView(dto);
	}

	@Override
	public List<InnerDTO> selectPartInnerView(InnerDTO dto){
		return mapper.selectPartInnerView(dto);
	}

	@Override
	public List<FoodApiDTO> selectFoodAPI(FoodApiDTO api_name) {
		// TODO Auto-generated method stub
		return mapper.selectFoodAPI(api_name);
	}
}
