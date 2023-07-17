package com.frg.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

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

	

}
