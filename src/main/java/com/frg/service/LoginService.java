package com.frg.service;

import java.util.List;

import com.frg.domain.UserDTO;

public interface LoginService {
	int getCountUser(UserDTO dto);
	
	List<UserDTO> getUserByIdAndPwd(UserDTO dto);

	int getClassUser(UserDTO dto);
}
