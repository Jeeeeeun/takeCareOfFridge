package com.frg.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.frg.domain.UserDTO;
import com.frg.mapper.MyPageMapper;
import com.frg.service.MyPageService;
import com.frg.service.SignUpService;
import com.frg.util.SHAEncodeUtil;

@Service
public class MyPageServiceImpl implements MyPageService {

	@Autowired
	private SignUpService service;
	
	@Autowired
	private MyPageMapper mapper;
	
	@Autowired
	private SHAEncodeUtil shaEncode;
	
	//사용자 이메일을 중복확인하는 로직
	@Override
	public boolean isExistEmail(String email) {
		int count = mapper.emailExist(email);
		System.out.println("메롱3");
		return count > 0;
	}
	
	//해당 데이터 베이스에서 내 정보를 받아서 리턴해주는 로직
	@Override
	public UserDTO selectMyInfo(UserDTO user) {
		System.out.println("메롱4");
		return mapper.selectMyInfo(user);
	}

	//내 정보 수정한 것을 데이터베이스에 넣고 리턴하는 로직, 그 안에 사용자가 입력한 비밀번호를 암호화 시키기
	
	@Override
	public boolean updateMyInfo(UserDTO user) {
		System.out.println("서비스 - " + user);
		if(user.isChange_email()) {//이메일 변경하면 true , 변경안했다면 false
			System.out.println("서비스 1");
			//이메일 중복 검사
			if(isExistEmail(user.getUser_email())) {
				System.out.println("서비스 2");
				return false;
			}
		}
		
		//비밀번호 정책 검증
		if(!service.policyPwd(user.getUser_pw())) {
			System.out.println("서비스 3");
			return false;//비밀번호가 정책에 맞지 않을 경우 false반환
		}
		
		System.out.println("서비스 4");
		//비밀번호 암호화
		String ePwd = shaEncode.encodeSha(user.getUser_pw());
		user.setUser_pw(ePwd);
		
		
		System.out.println("서비스 5");
		return mapper.updateMyInfo(user);
		
	}

	@Override
	public boolean deleteUser(String id) {
		int result = mapper.deleteUser(id);
		return result > 0;
	}


	
}
