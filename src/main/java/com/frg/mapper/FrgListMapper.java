package com.frg.mapper;

import java.util.List;

import com.frg.domain.FrgListDTO;

public interface FrgListMapper {
	int insertFrgList(FrgListDTO dto);
	
	List<FrgListDTO> selectFrgList(FrgListDTO dto);
}
