package com.frg.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.frg.domain.UserDTO;
import com.frg.mapper.MyPageMapper;
import com.frg.service.MyPageService;

@Service
public class MyPageServiceImpl implements MyPageService {
	
	@Autowired
	private MyPageMapper mapper;
	
	//해당 데이터 베이스에서 내 정보를 받아서 리턴해주는 로직
	@Override
	public UserDTO selectMyInfo(UserDTO user) {
		return mapper.selectMyInfo(user);
	}
	
}
