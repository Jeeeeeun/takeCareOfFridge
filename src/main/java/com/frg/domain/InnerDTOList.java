package com.frg.domain;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InnerDTOList {
	
	private List<InnerDTO> list;

	public InnerDTOList() {
      this.list = new ArrayList<>();
	}


}
