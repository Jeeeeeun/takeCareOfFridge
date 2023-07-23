package com.frg.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.frg.domain.FrgListDTO;
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
		model.addAttribute("trfStandard", trfStandard);
		
		frgDto.setUser_id(userId);
		List<FrgListDTO> frgList = frgService.getFrgList(frgDto);
		
		// Gson 사용하여 frgList를 JSON 형태로 변환
	    Gson gson = new Gson();
	    String frgListJson = gson.toJson(frgList);

	    // 변환된 JSON 데이터를 model에 추가
	    model.addAttribute("frgListJson", frgListJson);
	    
		return "/frg/myPage";
	}
	
	@PostMapping(value="/frgInfoChange")
	public String modifyFrgList() {
		// 냉장고 정보 수정 된 거 받아와서 DB에 반영하기
		return "";
	}
	
	@PostMapping(value="/trfStandardChange")
	public String modifyTrfStandard() {
		// 신호등 기준 수정된 거 받아와서 DB에 반영하기
		
		return "";
	}
}
