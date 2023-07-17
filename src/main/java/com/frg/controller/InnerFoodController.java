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

import com.frg.domain.InnerDTO;
import com.frg.service.InnerFoodService;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/frg/*")
@AllArgsConstructor
@Log4j
public class InnerFoodController {
	
	@NonNull
	private InnerFoodService service;
	
	//innerFoodAdd
	//localhost:8080/controller/frg/innerAdd
	@GetMapping(value = "/innerAdd")
	public String moveToInnerAdd(HttpSession session, Model model){
		String user_id= (String)session.getAttribute("SESS_ID");
		InnerDTO dto=new InnerDTO();
		dto.setUser_id(user_id);
		List<String> frgNames= service.selectFrgName(dto);
		model.addAttribute("frgNames", frgNames);
		return "/frg/innerAdd";
	}
	
	//식품등록-auto인 경우
	@RequestMapping(value = "/frg/innerAdd/Auto", method = RequestMethod.POST)
	public String registerInnerFoodAuto(HttpServletRequest request, Model model) throws Exception {
		
		InnerDTO dto= new InnerDTO();
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
		
		service.registerInnerAuto(dto);

		return "/frg/innerCtrl";
	}
	
	//식품 등록-custom인 경우
	@RequestMapping(value = "/frg/innerAdd/Custom", method = RequestMethod.POST)
	public String registerInnerFoodCustom(HttpServletRequest request, Model model) throws Exception {
		
		InnerDTO dto= new InnerDTO();
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
		
		service.registerInnerCustom(dto);

		return "/frg/innerCtrl";
	}
	
	
	@GetMapping(value="/innerCtrl")
	public String moveToInnerCtrl(HttpSession session,Model model) {
		return "/frg/innerCtrl";
	}
	
}
