package com.frg.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FoodApiDTO {
	
	private String api_fno; 
	private String api_name; 
	private String api_company; 
	private String api_expiredate; 
	private String api_type; 

}
