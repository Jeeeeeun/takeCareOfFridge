package com.frg.service.impl;

import org.springframework.stereotype.Service;

import com.frg.domain.FrgListDTO;
import com.frg.mapper.FrgListMapper;
import com.frg.service.FrgListService;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;

@Service
@RequiredArgsConstructor
public class FrgListServiceImpl implements FrgListService {

	@NonNull
	private FrgListMapper mapper;
	
	@Override
	public int registerFrgList(FrgListDTO dto) {
		return mapper.insertFrgList(dto);
	}

}
