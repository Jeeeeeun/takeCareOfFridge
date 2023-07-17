package com.frg.domain;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardDTO {
	private int board_index;
	private String board_title;
	private String board_content;
	private Date board_regDate;
	private Date board_upDate;
	private int board_viewCount;
	private int board_commentCount;
	private int board_like;
	private int user_index;
}
