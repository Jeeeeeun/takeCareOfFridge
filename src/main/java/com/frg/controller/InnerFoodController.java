package com.frg.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.frg.domain.InnerDTO;
import com.frg.domain.TrafficDTO;
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

	// innerFoodAdd
	// localhost:8080/controller/frg/innerAdd
	@GetMapping(value = "/innerAdd")
	public String moveToInnerAdd(HttpSession session, Model model, TrafficDTO trfDto) {
		String user_id = (String) session.getAttribute("SESS_ID");
		System.out.println("SESS_ID: " + user_id);
		String userFRG = (String) session.getAttribute("SESS_FRG_NAME");
		System.out.println("SESS_FRG_NAME: " + userFRG);
		InnerDTO dto = new InnerDTO();
		dto.setUser_id(user_id);
		List<String> frgNames = inService.selectFrgName(dto);
		model.addAttribute("frgNames", frgNames);

		trfDto.setUser_id(user_id);
		List<Integer> trafficLight = trfService.getTrafficLight(trfDto);

		model.addAttribute("trafficLight", trafficLight);

		return "/frg/innerAdd";
	}

	// 식품등록-auto인 경우
	@RequestMapping(value = "/frg/innerAdd/Auto", method = RequestMethod.POST)
	public String registerInnerFoodAuto(HttpServletRequest request, Model model) throws Exception {

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
		dto.setIn_company(request.getParameter("in_company"));

		inService.registerInnerAuto(dto);

		return "/frg/innerCtrl";
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

		return "/frg/innerCtrl";
	}

	@PostMapping("/setFrgNameSession")
	public ResponseEntity<String> setFrgNameSession(@RequestParam("frgName") String frgName, HttpSession session) {
		session.setAttribute("SESS_FRG_NAME", frgName);
		return ResponseEntity.ok("Success");
	}

	 @GetMapping("/innerCtrl")
	    public String moveToInnerCtrl(HttpSession session, Model model, TrafficDTO trfDto) {
	        String user_id = (String) session.getAttribute("SESS_ID");
	        String userFRG = (String) session.getAttribute("SESS_FRG_NAME");
	        
	        // InnerDTO에 사용자 정보 설정
	        InnerDTO dto = new InnerDTO();
	        dto.setUser_id(user_id);
	        dto.setFrg_name(userFRG);

	        // 서비스를 통해 데이터를 받아옴
	        List<InnerDTO> dataList =inService.selectPartInnerView(dto);

	        // 받아온 데이터를 Model에 추가
	        model.addAttribute("dataList", dataList);

	        return "/frg/innerCtrl";
	    }

}
