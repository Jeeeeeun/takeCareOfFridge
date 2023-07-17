package com.frg.mapper;

import java.util.List;

import com.frg.domain.FrgListDTO;

public interface MyPageMapper {
	List<FrgListDTO> selectFrgList(FrgListDTO dto);
}
