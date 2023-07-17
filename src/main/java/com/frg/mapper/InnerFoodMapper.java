package com.frg.mapper;

import java.util.List;

import com.frg.domain.FoodApiDTO;
import com.frg.domain.InnerDTO;

public interface InnerFoodMapper {
	
	int insertInnerAuto(InnerDTO dto);
	int insertInnerCustom(InnerDTO dto);
	List<String> selectFrgName(InnerDTO dto);
	List<String> selectFoodAPI(FoodApiDTO dto);

	List<String> selectAllInnerView(InnerDTO dto);
	List<String> selectPartInnerView(InnerDTO dto);

}
