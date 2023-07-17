package com.frg.service;

import java.util.List;

import com.frg.domain.TrafficDTO;

public interface TrafficService {
	List<Integer> getTrafficLight(TrafficDTO dto);
	
	List<TrafficDTO> getTrafficStandard(TrafficDTO dto);
}
