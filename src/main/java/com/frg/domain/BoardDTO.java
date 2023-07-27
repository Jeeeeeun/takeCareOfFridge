package com.frg.domain;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardDTO {
	private int board_index; // 게시글 번호
	private String board_title; // 게시글 제목
	private String board_content; // 게시글 내용
	private Date board_regDate; // 게시글 작성일
	private Date board_upDate; // 게시글 수정일
	private int board_viewCount; // 게시글 조회 수
	private int board_commentCount; // 게시글 댓글 수
	private int board_like; // 게시글 좋아요 수 
	private int updated_like; // 변화된 좋아요 수
	private int board_hasAttach; // 게시글 첨부파일 개수
	private String user_id; // 게시글 작성자
}
