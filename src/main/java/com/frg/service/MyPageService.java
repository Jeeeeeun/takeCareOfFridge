package com.frg.service;

import com.frg.domain.UserDTO;

public interface MyPageService {
	//내 정보가 데이터베이스에서 받아온걸 리턴해주는 메소드
	UserDTO selectMyInfo(UserDTO user);
}
