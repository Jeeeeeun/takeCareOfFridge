package com.frg.service;

import java.util.List;

import com.frg.domain.FrgListDTO;
import com.frg.domain.ResponseDTO;
import com.frg.domain.TrafficDTO;

public interface FrgListService {
	ResponseDTO registerFrgList(FrgListDTO dto);
	
	List<FrgListDTO> getFrgList(FrgListDTO dto);
}
