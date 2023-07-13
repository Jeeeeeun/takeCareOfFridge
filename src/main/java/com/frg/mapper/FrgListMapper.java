package com.frg.mapper;

import java.util.List;

import com.frg.domain.FrgListDTO;
import com.frg.domain.TrafficDTO;

public interface FrgListMapper {
	int insertFrgList(FrgListDTO dto);
	
	List<Integer> selectTrafficLight(TrafficDTO dto);
}
