package com.frg.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.frg.domain.InnerDTO;
import com.frg.service.InnerFoodService;
import com.frg.util.SessionUtil;

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
	
	// createInnerVO에서 필요한 인스턴스들
	private static final int registerFoodAuto = 0;
	private static final int registerFoodCustom = 1;
	
	//innerFoodAdd
	// localhost:8080/controller/frg/innerAdd
	@GetMapping(value = "/innerAdd")
	public void moveToInnerAdd(){
		log.info("innerFoodAdd");
	}
	
	@GetMapping(value="/innerCtrl")
	public void moveToInnerCtrl() {
		log.info("moveToInnerCtrl");
	}
	
	//식품등록-auto인 경우
	@PostMapping(value = "/innerAdd/Auto")
	public String registerInnerFoodAuto(HttpServletRequest request, Model model) throws Exception {
		HttpSession session = request.getSession();
		Boolean userSession = SessionUtil.getSessionAuth(request);
		String userId = SessionUtil.getSessionUserId(request);
		String userRole = SessionUtil.getSessionUserRole(request);
		
		InnerDTO dto= new InnerDTO();
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
	@PostMapping(value = "/innerAdd/Custom")
	public String registerInnerFoodCustom(HttpServletRequest request, Model model) throws Exception {
		HttpSession session = request.getSession();
		Boolean userSession = SessionUtil.getSessionAuth(request);
		String userId = SessionUtil.getSessionUserId(request);
		String userRole = SessionUtil.getSessionUserRole(request);
		
		InnerDTO dto= new InnerDTO();
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
	
}
