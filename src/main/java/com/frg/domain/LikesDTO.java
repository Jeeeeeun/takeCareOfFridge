package com.frg.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LikesDTO {
	private int like_index; // 좋아요 번호
	private int board_index; // 게시글 번호
	private int is_liked; // 좋아요 여부(1: true, 0: false)
	private String user_id; // 유저 ID
}
