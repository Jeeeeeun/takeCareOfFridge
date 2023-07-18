package com.frg.service;

import java.util.List;

import com.frg.domain.FoodApiDTO;
import com.frg.domain.InnerDTO;

public interface InnerFoodService {
	
	int registerInnerAuto(InnerDTO dto);
	int registerInnerCustom(InnerDTO dto); 
	List<String> selectFrgName(InnerDTO dto);
	List<FoodApiDTO> selectFoodAPI(FoodApiDTO api_name);

	List<String> selectAllInnerView(InnerDTO dto);
	List<String> selectPartInnerView(InnerDTO dto);
}
