package com.frg.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.frg.domain.FrgListDTO;
import com.frg.domain.ResponseDTO;
import com.frg.domain.TrafficDTO;
import com.frg.service.FrgListService;
import com.frg.service.TrafficService;
import com.google.gson.Gson;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/frg/*")
@Log4j
public class MyPageController {

	@Setter(onMethod_ = @Autowired)
	private FrgListService frgService;
	
	@Setter(onMethod_ = @Autowired)
	private TrafficService trfService;

	@GetMapping(value = "/myPage")
	public String getMyPage(HttpSession session, Model model, TrafficDTO trfDto, FrgListDTO frgDto) {
		log.info("myPage");

	    String userId = (String) session.getAttribute("SESS_ID");
		
		trfDto.setUser_id(userId);
		List<Integer> trafficLight = trfService.getTrafficLight(trfDto);
		model.addAttribute("trafficLight", trafficLight);
		
		List<TrafficDTO> trfStandard = trfService.getTrafficStandard(trfDto);
		
		frgDto.setUser_id(userId);
		List<FrgListDTO> frgList = frgService.getFrgList(frgDto);
		
		// Gson 사용하여 frgList를 JSON 형태로 변환
	    Gson gson = new Gson();
	    String frgListJson = gson.toJson(frgList);
	    String trfStandardJson = gson.toJson(trfStandard);

	    // 변환된 JSON 데이터를 model에 추가
	    model.addAttribute("frgListJson", frgListJson);
	    model.addAttribute("trfStandardJson", trfStandardJson);
	    
		return "/frg/myPage";
	}
	
	@PostMapping(value="/frgInfoChange", consumes = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public ResponseEntity<ResponseDTO> modifyFrgList(@RequestBody FrgListDTO frgDto) {
		ResponseDTO response = frgService.modifyFrgList(frgDto);
		
		boolean success = true;
		
		if (response.getAffectedRow() <= 0) {
			success = false;
		}
		
		// 냉장고 정보 수정 성공
		if (success) {
			return ResponseEntity.ok(response);
		}
		// 냉장고 정보 수정 실패
		else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}
	
	@PostMapping(value="/trfStandardChange", consumes = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public ResponseEntity<ResponseDTO> modifyTrfStandard(@RequestBody TrafficDTO trfDto) {
		// 신호등 기준 수정된 거 받아와서 DB에 반영하기
				
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
