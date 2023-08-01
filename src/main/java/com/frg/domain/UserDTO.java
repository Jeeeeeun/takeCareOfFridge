package com.frg.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {
	private String user_name;
	private String user_id;
	private String user_pw;
	private String user_email;
	private boolean change_email; // 이메일 변경 여부
}
