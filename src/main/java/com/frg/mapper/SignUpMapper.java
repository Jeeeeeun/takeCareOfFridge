package com.frg.mapper;

import com.frg.domain.UserDTO;

public interface SignUpMapper {
	//회원가입 할때 아이디 중복확인 기능
	int idExist(String id);
	//메소드 반환 타입이 int라서 리턴값으로 정수를 받는다
	//데이터 베이스에 사용자가 입력한 아이디가 데이터 베이스에 있다면 1을 반환 없다면 0을 반환
	//메소드의 매개변수로 (String id)로 받는다. 메소드를 호출할 때 사용자가 입력한 값을 문자열로 저장
	
	boolean insertUser(UserDTO user);
	/*
	 * 회원가입 리턴값을 boolean으로 한 이유는
	 * 회원가입 성공 여부를 단순한 true , false로 정하기 위해서 사용
	 * 
	 * boolean 반환 타입으로 회원 가입 작업의 실행 결과를 나타내는 인터페이스
	 * true는 회원 가입이 성공적으로 이루어 졌음을 나타내고, false는 회원가입 실패
	 * 
	 * insertUser는 메소드 명
	 * 
	 * (UserDTO user) 매개변수, UserDTO 타입의 객체를 입력받아 해당 객체에 저장된 사용자
	 * 정보를 사용하여 회원가입 작업을 수행한다.
	 * 
	 * UserDTO는 사용자 정보를 저장하기 위한 클래스 여기에는 이름, 아이디, 비밀번호 , 이메일
	 *  포함한다.
	 *  
	 *  --총정리--
	 *  이 메소드는 사용자 정보가 저장 UserDTO 객체를 입력받아 회원가입 작업을 수행,
	 *  작업이 성공적인지 실패했는지 boolean 타입으로 반환하는 기능
	 */
}
