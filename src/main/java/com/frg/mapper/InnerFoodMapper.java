package com.frg.mapper;

import java.util.List;

public interface InnerFoodMapper {
	
	int insertInnerAuto();
	int insertInnerCustom();
	List<String> selectFrgName();

}
