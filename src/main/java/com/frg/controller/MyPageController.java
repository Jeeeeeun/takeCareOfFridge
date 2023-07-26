package com.frg.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.frg.domain.FrgListDTO;
import com.frg.domain.ResponseDTO;
import com.frg.domain.TrafficDTO;
import com.frg.domain.UserDTO;
import com.frg.service.FrgListService;
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
	private MyPageService myService;

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
	
	//사용자의 정보를 불러오는 곳
	@GetMapping(value="/userInfo", produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public UserDTO getUserinfo(HttpSession session) {
		String userId = (String) session.getAttribute("SESS_ID");
		
		UserDTO user = new UserDTO();
		user.setUser_id(userId);
		
		return myService.selectMyInfo(user);
	}
	//세션 관련 코드 자동 로그아웃됐을때 반응 그냥 그대로 쓰면 가능, 만약 컨트롤러 충돌이 일어난다면 value 값을 바꾸고
	//	해당 ajax에 url도 변경 해줄 것
	@GetMapping(value="/sessionExpire", produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public Map<String, Boolean> sessionExist(HttpSession session) {
		Map<String, Boolean> response = new HashMap<>();
		String userId = (String) session.getAttribute("SESS_ID");
		log.info("유저 아이디 - " + userId);
		if(userId == null || session == null) {
			response.put("sessionExpired", true);
		} else {
			response.put("sessionExpired", false);
		}
		
		return response;
	}
}
