package com.frg.mapper;

import java.util.List;

import com.frg.domain.FrgListDTO;
import com.frg.domain.UserDTO;

public interface MyPageMapper {
	//내정보를 받아오는 메소드
	UserDTO selectMyInfo(UserDTO user);
}
