package com.frg.service.impl;

import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.frg.domain.UserDTO;
import com.frg.mapper.SignUpMapper;
import com.frg.service.SignUpService;
import com.frg.util.SHAEncodeUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;

@Service
@RequiredArgsConstructor
@Log4j
public class SignUpServiceImpl implements SignUpService {
	
	private static final String PASSWORD_POLICY = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";
	
	@Autowired
	private SignUpMapper mapper;
	
	@Autowired
	private SHAEncodeUtil shaEncode;
	
	@Override
	public boolean policyPwd(String pwd) {
		//Pattern 객체를 만들어서 PASSWORD_POLICY 정규 표현식으로 컴파일 한다.
		//이러면 패턴 객체는 정규 표현식과 관련된 작업을 수행
		Pattern pattern = Pattern.compile(PASSWORD_POLICY);
		//matcher(pwd)메소드를 호출해서 pwd를 가지고 객체를 생성
		//.matches() 메소드를 호출해서 해당 비밀번호 문자열이 PASSWORD_POLICY 이것의 정규 표현식과
		//일치하는지 확인하고 그 결과를 boolean(참, 거짓) 으로 반환	일치 true | 불일치 false
		return pattern.matcher(pwd).matches();
	}

	@Override	//아이디 중복 확인에 대한것
	public boolean isExistId(String id) {
		int count = mapper.idExist(id); //int count라는 변수 안에 SignUpMapper에 idExist 리턴 값을 받아와서 대입
		return count > 0; //count 값이 0을 초과한 경우 , id가 중복되었다고 판단. 이때 반환값은 true이다.
	}

	@Override	//회원가입 입력 관련
	public boolean registerUser(UserDTO user) {
		//아이디 중복 확인
		if(isExistId(user.getUser_id())) {
			return false;//아이디가 중복되는지의 대한 검사 중복되면 false반환
		}
		
		//비밀번호 정책 검증
		if(!policyPwd(user.getUser_pw())) {
			return false;//비밀번호가 정책에 맞지 않을 경우 false반환
		}
		
		//비밀번호 암호화
		String ePwd = shaEncode.encodeSha(user.getUser_pw());
		user.setUser_pw(ePwd);
		
		return mapper.insertUser(user);
	}

}
