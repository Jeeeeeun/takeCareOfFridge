package com.frg.service;

import com.frg.domain.UserDTO;

public interface EmailService {
	 boolean updatePwd(UserDTO user);
	 
	 boolean checkEmailCode(String email , String inputCode);
	
	 void sendVerificationCode(String email);
}
