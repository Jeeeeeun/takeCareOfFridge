package com.frg.domain;

import java.util.Date;

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
	private Integer in_index;
	private Integer frg_index;
	private String in_name;
	private Integer in_count;
	private String in_company;
	private Date in_expireDate;
	private String in_type;
	private String in_state;
	private String api_fno;
	private Integer D_DAY;

}
