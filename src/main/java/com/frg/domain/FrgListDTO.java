package com.frg.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FrgListDTO {
	private String user_id;
	private int frg_index;
	private String frg_name;
	private String frg_shape;
	private String frg_Astate;
	private String frg_Bstate;
}
