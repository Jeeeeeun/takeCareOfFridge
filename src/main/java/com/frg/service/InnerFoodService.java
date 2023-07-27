package com.frg.service;

import java.util.List;

import com.frg.domain.FoodApiDTO;
import com.frg.domain.InnerDTO;
import com.frg.domain.ResponseDTO;
import com.frg.domain.UserDTO;

public interface InnerFoodService {
	
	void registerInnerFood(InnerDTO dto);
	List<String> selectFrgName(UserDTO user_id);
	List<FoodApiDTO> selectFoodAPI(FoodApiDTO api_name);

	List<InnerDTO> selectAllInnerView(InnerDTO dto);
	List<InnerDTO> selectPartInnerView(InnerDTO dto);
	List<InnerDTO> selectInnerData(InnerDTO dto);
	void deleteInnerFood(InnerDTO dto);
}
