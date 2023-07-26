package com.frg.service;

import com.frg.domain.UserDTO;

public interface SignUpService {
	//비밀번호 정책
	boolean policyPwd(String pwd);
	//메소드 반환타입(리턴값)이 boolean으로 리턴 값이 참 또는 거짓으로 받는다.
	//메소드 이름은 policyPwd로 한다. 즉 비밀번호의 정책을 표현한 것
	//메소드의 매개변수로 (String pwd)로 받는다. 메소드를 호출할 때 사용자가 입력하는 값을 문자열로 저장
		//메소드 내부에서 사용하는 변수
	
	//데이터베이스를 통과해서 해당 중복값이 어떤건지 가져와서 받는곳 or 보내는곳
	boolean isExistId(String id);
	
	////데이터베이스를 통과해서 해당 중복값이 어떤건지 가져와서 받는곳 or 보내는곳 (이메일)
	boolean isExistEmail(String email);
	
	//회원가입의 정보가 잘 등록 됐는지 그 값을 가져와서 받는곳 or 보내는 곳
	boolean registerUser(UserDTO user);
	//boolean으로 회원 정보가 정상 등록 되었는지 확인
	//registerUser 해당 메소드가 어떤 기능을 수행하는가를 명시
	//(UserDTO user) 메소드의 인자로 UserDTO 객체를 전달받고 회원정보를 담는다
	/*
	 * 인터페이스에  boolean registerUser(UserDTO user); 추가한 이유는
	 * 서비스에서 이 기능이 꼭 필요하며, 강조한다는 의미
	 * 인터페이스를 사용함으로써 구현 클래스에게 해당 기능을 반드시 구현하라는 의미를 전달
	 * 메소드 이름은 어떤 기능을 수행하는지 이름으로써 직관적으로 보여주기 위한 것
	 */
}
