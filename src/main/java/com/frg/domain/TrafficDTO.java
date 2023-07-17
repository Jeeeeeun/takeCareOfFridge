package com.frg.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TrafficDTO {
	private String user_id;
	private int dangerous;
	private int warning;
	private String dangerous_standard;
	private String warning_standard;
	private int red;
	private int yellow;
	private int green;
}
