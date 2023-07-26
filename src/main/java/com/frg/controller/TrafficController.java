package com.frg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.frg.domain.ResponseDTO;
import com.frg.domain.TrafficDTO;
import com.frg.service.TrafficService;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/frg/*")
@Log4j
public class TrafficController {
	
	@Setter(onMethod_ = @Autowired)
	private TrafficService trfService;

	@PostMapping(value="/trfStandardChange", consumes = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public ResponseEntity<ResponseDTO> modifyTrfStandard(@RequestBody TrafficDTO trfDto) {
				
		ResponseDTO response = trfService.modifyTrafficStandard(trfDto);
		
		boolean success = true;

		if (response.getAffectedRow() <= 0) {
			success = false;
		}
		
		// 신호등 기준 수정 성공
		if (success) {
			return ResponseEntity.ok(response);
		}
		// 신호등 기준 수정 실패
		else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}
}
