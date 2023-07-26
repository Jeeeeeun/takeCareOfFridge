package com.frg.domain;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InnerDTO {
	
	private String user_id;
	private String frgList;
	private String frg_name;
	private int in_index;
	private int frg_index;
	private String in_name;
	private int in_count;
	private String in_company;
	private LocalDate in_expireDate;
	private String in_type;
	private String in_state;
	private String api_fno;
	private int D_DAY;

}
