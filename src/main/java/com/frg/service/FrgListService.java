package com.frg.service;

import java.util.List;

import com.frg.domain.FrgListDTO;
import com.frg.domain.ResponseDTO;

public interface FrgListService {
	ResponseDTO registerFrgList(FrgListDTO dto);

	List<FrgListDTO> getFrgList(FrgListDTO dto);

	ResponseDTO modifyFrgList(FrgListDTO dto);
	
	ResponseDTO removeFrgList(FrgListDTO dto);
	
	List<String> getFrgNames(FrgListDTO dto);
}
