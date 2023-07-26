package com.frg.mapper;

import java.util.List;

import com.frg.domain.FrgListDTO;

public interface FrgListMapper {
	
	// 냉장고 추가하기(insert)
	int insertFrgList(FrgListDTO dto);
	
	// 냉장고 목록 전체 가져오기 (select)
	List<FrgListDTO> selectFrgList(FrgListDTO dto);
	
	// 냉장고 정보 수정하기 (update)
	int updateFrgList(FrgListDTO dto);
	
	// 냉장고 정보 삭제하기 (delete)
	int deleteFrgList(FrgListDTO dto);
	
	// user 한 명의 냉장고 이름 목록 가져오기 (select)
	List<String> selectFrgNames(FrgListDTO dto);
}
