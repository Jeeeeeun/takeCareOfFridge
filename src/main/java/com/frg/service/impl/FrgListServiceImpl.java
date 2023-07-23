package com.frg.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.frg.domain.FrgListDTO;
import com.frg.domain.ResponseDTO;
import com.frg.mapper.FrgListMapper;
import com.frg.service.FrgListService;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FrgListServiceImpl implements FrgListService {

	@NonNull
	private FrgListMapper mapper;
	
	@Override
	public ResponseDTO registerFrgList(FrgListDTO dto) {
		
		ResponseDTO response = new ResponseDTO();
		
		int affectedRow = mapper.insertFrgList(dto);
		response.setAffectedRow(affectedRow);
		
		String resMsg = null;
		
		if (affectedRow == 1) {
			resMsg = "냉장고 등록이 완료되었습니다.";
		} else {
			resMsg = "냉장고 등록에 실패했습니다.";
		}
		
		response.setResMsg(resMsg);
		
		return response;
	}



	@Override
	public List<FrgListDTO> getFrgList(FrgListDTO dto) {
		
		List<FrgListDTO> frgList = mapper.selectFrgList(dto);
		
		return frgList;
	}

	

}
