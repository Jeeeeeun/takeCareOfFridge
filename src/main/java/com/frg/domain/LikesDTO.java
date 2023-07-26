package com.frg.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LikesDTO {
	private int like_index;
	private int board_index;
	private int is_liked;
	private String user_id;
}
