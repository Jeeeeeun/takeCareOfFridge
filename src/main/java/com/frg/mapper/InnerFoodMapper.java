package com.frg.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.frg.domain.FoodApiDTO;
import com.frg.domain.FrgListDTO;
import com.frg.domain.InnerDTO;
import com.frg.domain.UserDTO;

public interface InnerFoodMapper {

	void insertFood(InnerDTO dto);

	List<String> selectFrgName(UserDTO user_id);

	List<FoodApiDTO> selectFoodAPI(FoodApiDTO api_name);

	List<InnerDTO> selectAllInnerView(InnerDTO dto);

	String selectFrgNameAll(FrgListDTO dto);

	List<InnerDTO> selectPartInnerView(InnerDTO dto);

	List<InnerDTO> selectInnerData(InnerDTO dto);

	int updateFood(InnerDTO dto);

	void deleteFood(InnerDTO dto);
}
