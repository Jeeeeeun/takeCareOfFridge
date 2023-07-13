package com.frg.mapper;

import com.frg.domain.InnerDTO;

public interface InnerFoodMapper {
	
	int insertInnerAuto(InnerDTO dto);
	int insertInnerCustom(InnerDTO dto);

}
