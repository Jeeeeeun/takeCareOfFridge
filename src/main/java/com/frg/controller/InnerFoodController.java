package com.frg.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.frg.domain.FoodApiDTO;
import com.frg.domain.FrgListDTO;
import com.frg.domain.InnerDTO;
import com.frg.domain.TrafficDTO;
import com.frg.domain.UserDTO;
import com.frg.service.InnerFoodService;
import com.frg.service.TrafficService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/frg/*")
@AllArgsConstructor
@Log4j
public class InnerFoodController {

	@NonNull
	private InnerFoodService inService;

	@NonNull
	private TrafficService trfService;

	// innerFoodAdd
	// localhost:8080/controller/frg/innerAdd
	@GetMapping("/innerAdd")
	public String moveToInnerAdd(HttpSession session, Model model, TrafficDTO trfDto) throws JsonProcessingException {

		String user_id = (String) session.getAttribute("SESS_ID");
		System.out.println("SESS_ID: " + user_id);
		UserDTO dto = new UserDTO();
		dto.setUser_id(user_id);

		List<String> frgNames = inService.selectFrgName(dto);
		// ObjectMapper는 Jackson 라이브러리에서 제공하는 클래스로, Java 객체와 JSON 데이터를 상호 변환하는 역할을 담당
		ObjectMapper objectMapper = new ObjectMapper();
		// frgNames 리스트를 JSON 형식의 문자열로 변환
		String frgNamesJson = objectMapper.writeValueAsString(frgNames);
		log.info("frgNamesJson : " + frgNamesJson);
		model.addAttribute("frgNamesJson", frgNamesJson);

		trfDto.setUser_id(user_id);
		List<Integer> trafficLight = trfService.getTrafficLight(trfDto);
		model.addAttribute("trafficLight", trafficLight);

		return "/frg/innerAdd";
	}

	// redirect : controller간에 이동할 때
	// redirect 없으면 , 바로 jsp (view)로 이동

	@PostMapping(value = "/innerAdd/submit", produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public String registerInnerFood(HttpSession session, @RequestBody InnerDTO dto) throws Exception {
		
		// RequestBody를 선언해서 json데이터를 객체로 매핑한다.
		String user_id = (String) session.getAttribute("SESS_ID");
		dto.setUser_id(user_id);
		inService.registerInnerFood(dto);
		
		JsonObject json = new JsonObject();
		json.addProperty("success", true);
		
		return new Gson().toJson(json);
	}

	// foodApi 조회하기
	// @RequestMapping(value= "/search", method = RequestMethod.GET)
	@PostMapping("innerAdd/search")
	@ResponseBody
	public List<FoodApiDTO> iterateFoodApi(@RequestParam("searchApi") String searchApi, Model model) {
		FoodApiDTO foodDto = new FoodApiDTO();
		foodDto.setApi_name(searchApi);
		List<FoodApiDTO> foodList = inService.selectFoodAPI(foodDto);
		return foodList;
	}

	@GetMapping("/innerCtrl")
	public String moveToInnerCtrl(@RequestParam("frgName") String frgName, HttpSession session, Model model,
			TrafficDTO trfDto) {
		String user_id = (String) session.getAttribute("SESS_ID");
		InnerDTO dto = new InnerDTO();
		dto.setUser_id(user_id);
		dto.setFrg_name(frgName);
		
		if (frgName.equals("all")) {
			List<InnerDTO> dataList = inService.selectAllInnerView(dto);
			model.addAttribute("dataList", dataList);
		} else {
			List<InnerDTO> dataList = inService.selectPartInnerView(dto);
			model.addAttribute("dataList", dataList);
		}
		 
		UserDTO userDto = new UserDTO();
		userDto.setUser_id(user_id);
		List<String> frgNames = inService.selectFrgName(userDto);
		// 받아온 데이터를 Model에 추가
		model.addAttribute("frgNames", frgNames);
		model.addAttribute("frgName", frgName);

		trfDto.setUser_id(user_id);
		List<Integer> trafficLight = trfService.getTrafficLight(trfDto);
		model.addAttribute("trafficLight", trafficLight);

		return "/frg/innerCtrl"; // JSP 페이지로 랜더링
	}

	@PostMapping(value = "/innerCtrl/getInnerData")
	@ResponseBody
	public Map<String, Object> getInnerData(HttpServletRequest request, HttpSession session,
	        @RequestParam("frg_index") int frg_index, @RequestParam("in_name") String in_name) throws Exception {

	    String user_id = (String) session.getAttribute("SESS_ID");
	    InnerDTO dto = new InnerDTO();
	    dto.setUser_id(user_id);
	    dto.setIn_name(in_name);
	    dto.setFrg_index(frg_index);

	    FrgListDTO frgDto = new FrgListDTO();
	    frgDto.setUser_id(user_id);
	    frgDto.setFrg_index(frg_index);
	    String FrgName = inService.selectFrgNameAll(frgDto);

	    List<InnerDTO> innerData = inService.selectInnerData(dto);

	    Map<String, Object> resultMap = new HashMap<>();
	    resultMap.put("FrgName", FrgName);
	    resultMap.put("innerData", innerData);
	    return resultMap;
	}

	@PostMapping(value = "/innerCtrl/updateInnerData", produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public String updateInnerData(HttpSession session, @RequestBody InnerDTO dto) {

		String user_id = (String) session.getAttribute("SESS_ID");
		dto.setUser_id(user_id);
		inService.updateInnerFood(dto);

		JsonObject json = new JsonObject();
		json.addProperty("success", true);

		return new Gson().toJson(json);
	}

	@PostMapping(value = "/innerCtrl/deleteInnerData", produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public String deleteInnerData(HttpSession session, @RequestParam("frgName") String frgName,
			@RequestParam("in_name") String in_name) throws Exception {

		String user_id = (String) session.getAttribute("SESS_ID");
		InnerDTO dto = new InnerDTO();
		dto.setUser_id(user_id);
		dto.setIn_name(in_name);
		dto.setFrg_name(frgName);
		inService.deleteInnerFood(dto);

		JsonObject json = new JsonObject();
		json.addProperty("success", true);

		return new Gson().toJson(json);
	}

	@GetMapping(value = "/innerCtrl/trafficStandard")
	@ResponseBody
	public List<TrafficDTO> trafficStandard(HttpSession session, TrafficDTO trfDto) {
		String user_id = (String) session.getAttribute("SESS_ID");

		trfDto.setUser_id(user_id);
		List<TrafficDTO> trafficStandard = trfService.getTrafficStandard(trfDto);

		return trafficStandard;
	}

}
