package com.frg.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.frg.domain.FrgListDTO;
import com.frg.domain.TrafficDTO;
import com.frg.service.LoginService;
import com.frg.service.MyPageService;
import com.frg.service.TrafficService;
import com.google.gson.Gson;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/frg/*")
@Log4j
public class MyPageController {

	@Setter(onMethod_ = @Autowired)
	private MyPageService myPageService;
	
	@Setter(onMethod_ = @Autowired)
	private TrafficService trfService;

	@GetMapping(value = "/myPage")
	public String getMyPage(HttpSession session, Model model, TrafficDTO trfDto, FrgListDTO frgDto) {
		log.info("myPage");

	    String userId = (String) session.getAttribute("SESS_ID");
		
		trfDto.setUser_id(userId);
		List<Integer> trafficLight = trfService.getTrafficLight(trfDto);
		model.addAttribute("trafficLight", trafficLight);
		
		frgDto.setUser_id(userId);
		List<FrgListDTO> frgList = myPageService.getFrgList(frgDto);
		
		// Gson 사용하여 frgList를 JSON 형태로 변환
	    Gson gson = new Gson();
	    String frgListJson = gson.toJson(frgList);


	    
	    // 변환된 JSON 데이터를 model에 추가
	    model.addAttribute("frgListJson", frgListJson);
		return "/frg/myPage";
	}
}
