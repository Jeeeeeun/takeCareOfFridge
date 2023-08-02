package com.frg.service;

import com.frg.domain.UserDTO;

public interface MyPageService {
	//내 정보가 데이터베이스에서 받아온걸 리턴해주는 메소드
	UserDTO selectMyInfo(UserDTO user);
	
	//업데이트 관련 이메일 중복
	boolean isExistEmail(String email);
	
	//내 정보 수정한 것을 데이터베이스에 넣어서 수정하는 메소드
	boolean updateMyInfo(UserDTO user);
	
	boolean deleteUser(String id);
}
