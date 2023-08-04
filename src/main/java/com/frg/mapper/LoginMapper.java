package com.frg.mapper;

import java.util.List;

import com.frg.domain.UserDTO;

public interface LoginMapper {
	int selectCountUser(UserDTO dto);
	
	List<UserDTO> selectUserByIdAndPwd(UserDTO dto);
	
	int selectClassUser(UserDTO dto);
	
	int selectUserIdOk(UserDTO dto);
	
}
