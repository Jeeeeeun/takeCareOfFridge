package com.frg.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.frg.domain.UserDTO;
import com.frg.mapper.LoginMapper;
import com.frg.service.LoginService;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private LoginMapper mapper;
	
	@Override
	public int getCountUser(UserDTO dto){
		return mapper.selectCountUser(dto);
	}
	
	@Override
	public List<UserDTO> getUserByIdAndPwd(UserDTO dto){
		return mapper.selectUserByIdAndPwd(dto);
	}
	
	@Override
	public int getClassUser(UserDTO dto) {
		return mapper.selectClassUser(dto);
	}
}
