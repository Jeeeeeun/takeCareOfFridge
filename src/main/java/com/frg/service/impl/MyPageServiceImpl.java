package com.frg.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.frg.domain.FrgListDTO;
import com.frg.mapper.FrgListMapper;
import com.frg.service.MyPageService;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {
	
	@NonNull
	private FrgListMapper frgMapper;
	
	@Override
	public List<FrgListDTO> getFrgList(FrgListDTO dto) {
		
		List<FrgListDTO> frgList = frgMapper.selectFrgList(dto);
		
		return frgList;
	}

}
