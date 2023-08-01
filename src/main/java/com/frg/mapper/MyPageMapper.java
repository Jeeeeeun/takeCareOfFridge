package com.frg.mapper;

import java.util.List;

import com.frg.domain.FrgListDTO;
import com.frg.domain.UserDTO;

public interface MyPageMapper {
	//내정보를 받아오는 메소드
	UserDTO selectMyInfo(UserDTO user);
	
	//사용자가 수정한 내용을 받아서 데이터 베이스에 입력
	boolean updateMyInfo(UserDTO user);
	
	//사용자가 수정한 이메일을 중복확인하는 메소드
	int emailExist(String eamil);
	
	//회원 삭제
	int deleteUser(String id);
	
	List<FrgListDTO> selectFrgList(FrgListDTO dto);
}
