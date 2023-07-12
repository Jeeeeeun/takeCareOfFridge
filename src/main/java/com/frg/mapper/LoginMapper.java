package com.frg.mapper;

import com.frg.domain.UserDTO;

public interface LoginMapper {
	int selectCountUser(UserDTO dto);
	
	void selectUserByIdAndPwd(UserDTO dto);
	
	int selectClassUser(UserDTO dto);
}
