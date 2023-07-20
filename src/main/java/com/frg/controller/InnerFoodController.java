package com.frg.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.frg.domain.FoodApiDTO;
import com.frg.domain.InnerDTO;
import com.frg.domain.TrafficDTO;
import com.frg.domain.UserDTO;
import com.frg.service.InnerFoodService;
import com.frg.service.TrafficService;

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

	//innerFoodAdd
	//localhost:8080/controller/frg/innerAdd
	@GetMapping(value = "/innerAdd")
	public String moveToInnerAdd(HttpSession session, Model model, TrafficDTO trfDto) throws JsonProcessingException {
		
		String user_id = (String) session.getAttribute("SESS_ID");
		System.out.println("SESS_ID: " + user_id);
		String userFRG = (String) session.getAttribute("SESS_FRG_NAME");
		System.out.println("SESS_FRG_NAME: " + userFRG);
		
		UserDTO dto = new UserDTO();
		dto.setUser_id(user_id);
		
		List<String> frgNames = inService.selectFrgName(dto);
		// ObjectMapper는 Jackson 라이브러리에서 제공하는 클래스로, Java 객체와 JSON 데이터를 상호 변환하는 역할을 담당
		ObjectMapper objectMapper = new ObjectMapper();
		// frgNames 리스트를 JSON 형식의 문자열로 변환
		String frgNamesJson = objectMapper.writeValueAsString(frgNames);
		log.info("frgNamesJson : "+frgNamesJson);
		model.addAttribute("frgNamesJson", frgNamesJson);
		
		trfDto.setUser_id(user_id);
		List<Integer> trafficLight = trfService.getTrafficLight(trfDto);
		model.addAttribute("trafficLight", trafficLight);
		
		return "/frg/innerAdd";
	}
	
	//foodApi 조회하기
	//@RequestMapping(value= "/search", method = RequestMethod.GET)
	@PostMapping("innerAdd/search")
	@ResponseBody
	public List<FoodApiDTO> iterateFoodApi(@RequestParam("searchApi") String searchApi, Model model) {
		FoodApiDTO foodDto=new FoodApiDTO();
		foodDto.setApi_name(searchApi);
		List<FoodApiDTO> foodList = inService.selectFoodAPI(foodDto);
		return foodList;
	}

	// 식품등록-auto인 경우
	@RequestMapping(value = "/innerAdd/Auto", method = RequestMethod.POST)
	public String registerInnerFoodAuto(HttpServletRequest request, Model model) throws Exception {

		InnerDTO dto = new InnerDTO();
		dto.setUser_id(request.getParameter("user_id"));
		dto.setFrg_name(request.getParameter("frg_name"));
		dto.setIn_name(request.getParameter("in_name"));
		String dateFormat = "yyyy-MM-dd";
		SimpleDateFormat formatter = new SimpleDateFormat(dateFormat);
		log.info("request.getParameter(\"in_expireDate_custom의 출력결과\n"+request.getParameter("in_expireDate_custom"));
		dto.setIn_expireDate_custom((Date) formatter.parse(request.getParameter("in_expireDate_custom")));
		dto.setIn_expireDate_auto(request.getParameter("in_expireDate_auto"));
		dto.setIn_type(request.getParameter("in_type"));
		dto.setIn_state(request.getParameter("in_state"));
		dto.setApi_fno(request.getParameter("api_fno"));
		dto.setIn_company(request.getParameter("in_company"));

		inService.registerInnerAuto(dto);
		log.info(inService.registerInnerAuto(dto));

		return "/frg/innerAdd";
	}

	// 식품 등록-custom인 경우
	@RequestMapping(value = "/frg/innerAdd/Custom", method = RequestMethod.POST)
	public String registerInnerFoodCustom(HttpServletRequest request, Model model) throws Exception {

		InnerDTO dto = new InnerDTO();
		dto.setUser_id(request.getParameter("user_id"));
		dto.setFrg_name(request.getParameter("frg_name"));
		dto.setIn_name(request.getParameter("in_name"));
		String dateFormat = "yyyy-MM-dd";
		SimpleDateFormat formatter = new SimpleDateFormat(dateFormat);
		dto.setIn_expireDate_custom((Date) formatter.parse(request.getParameter("in_expireDate_custom")));
		dto.setIn_expireDate_auto(request.getParameter("in_expireDate_auto"));
		dto.setIn_type(request.getParameter("in_type"));
		dto.setIn_state(request.getParameter("in_state"));
		dto.setApi_fno(request.getParameter("api_fno"));

		inService.registerInnerCustom(dto);

		return "/frg/innerAdd";
	}

	@PostMapping("/setFrgNameSession")
	@ResponseBody
	public List<InnerDTO> setFrgNameSession(@RequestParam("frgName") String frgName, HttpSession session) {
	    session.setAttribute("SESS_FRG_NAME", frgName);
	    String userId = (String) session.getAttribute("SESS_ID");
	    // 냉장고 이름에 해당하는 데이터를 조회하여 반환
	    InnerDTO dto = new InnerDTO();
	    dto.setUser_id(userId);
	    dto.setFrg_name(frgName);
	    List<InnerDTO> dataList = inService.selectPartInnerView(dto);
	    return dataList;
	}

	 @GetMapping("/innerCtrl")
	    public String moveToInnerCtrl(HttpSession session, Model model, TrafficDTO trfDto) {
			String user_id = (String) session.getAttribute("SESS_ID");
			System.out.println("SESS_ID: " + user_id);
			String userFRG = (String) session.getAttribute("SESS_FRG_NAME");
			System.out.println("SESS_FRG_NAME: " + userFRG);
			UserDTO userDto = new UserDTO();
			userDto.setUser_id(user_id);
			List<String> frgNames = inService.selectFrgName(userDto);
			model.addAttribute("frgNames", frgNames);
			trfDto.setUser_id(user_id);
			List<Integer> trafficLight = trfService.getTrafficLight(trfDto);

			model.addAttribute("trafficLight", trafficLight);
			
			InnerDTO innerDto = new InnerDTO();
			innerDto.setUser_id(user_id);
			innerDto.setFrg_name(userFRG);

	        // 서비스를 통해 데이터를 받아옴
	        List<InnerDTO> dataList =inService.selectPartInnerView(innerDto);

	        // 받아온 데이터를 Model에 추가
	        model.addAttribute("dataList", dataList);
	        model.addAttribute("frgNames", frgNames);

	        return "/frg/innerCtrl";
	    }

}
