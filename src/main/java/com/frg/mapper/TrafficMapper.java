package com.frg.mapper;

import java.util.List;

import com.frg.domain.TrafficDTO;

public interface TrafficMapper {
	List<Integer> selectTrafficLight(TrafficDTO dto);
}
