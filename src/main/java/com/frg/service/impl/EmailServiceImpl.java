package com.frg.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.frg.domain.UserDTO;
import com.frg.mapper.FindPwdMapper;
import com.frg.service.EmailService;
import com.frg.util.SHAEncodeUtil;
import com.frg.util.SendEmail;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private SHAEncodeUtil shaEncode;
	
	@Autowired
	FindPwdMapper mapper;
	
	@Override
	public void sendVerificationCode(String email) { //이메일 인증코드 보내기
		SendEmail.naverMailSend(email);
	}

	@Override
	public boolean updatePwd(UserDTO user) {
		System.out.println("쨘 들어 왔따.");
		
		String ePwd = shaEncode.encodeSha(user.getUser_pw());
		user.setUser_pw(ePwd);
		
		return mapper.updatePwd(user);
	}

	@Override
	public boolean checkEmailCode(String email, String inputCode) {
		String code = SendEmail.getEmailCode(email);
		
		if(code != null && code.equals(inputCode)) {
			return true;
		}
		
		return false;
	}
	
}
