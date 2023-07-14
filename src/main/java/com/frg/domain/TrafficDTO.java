package com.frg.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TrafficDTO {
	private String user_id;
	private int red;
	private int yellow;
	private int green;
}
