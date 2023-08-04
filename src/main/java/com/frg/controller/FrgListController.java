package com.frg.controller;


import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.frg.domain.FrgListDTO;
import com.frg.domain.ResponseDTO;
import com.frg.domain.TrafficDTO;
import com.frg.service.FrgListService;
import com.frg.service.TrafficService;
import com.google.gson.Gson;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/frg/*")
@AllArgsConstructor
@Log4j
public class FrgListController {

	@NonNull
	private FrgListService frgService;

	@NonNull
	private TrafficService trfService;

	@GetMapping("/frgAdd")
	public String frgAddPage(HttpSession session, Model model, TrafficDTO trfDto , RedirectAttributes rttr) {
		log.info("frgAdd");

		String userId = (String) session.getAttribute("SESS_ID");

		trfDto.setUser_id(userId);
		if (userId == null || session == null) { //세션 만료 또는 세션없이 외부 접속했을때 처리
			log.info("여기 도착합니다.");
			String msg = "로그인이 필요한 기능입니다. 로그인을 해주세요.";
			rttr.addFlashAttribute("msg", msg);
			
			return "redirect:/frg/login";
		}

		List<Integer> trafficLight = trfService.getTrafficLight(trfDto);
		model.addAttribute("trafficLight", trafficLight);

		return "/frg/frgAdd";
	}

	@GetMapping("/frgAdd_form")
	public String frgAddFormPage(HttpSession session, Model model, TrafficDTO trfDto , RedirectAttributes rttr) {
		log.info("frgAdd_form");

		String userId = (String) session.getAttribute("SESS_ID");

		trfDto.setUser_id(userId);
		
		if (userId == null || session == null) { //세션 만료 또는 세션없이 외부 접속했을때 처리
			log.info("여기 도착합니다.");
			String msg = "로그인이 필요한 기능입니다. 로그인을 해주세요.";
			rttr.addFlashAttribute("msg", msg);
			
			return "redirect:/frg/login";
		}
		
		List<Integer> trafficLight = trfService.getTrafficLight(trfDto);
		model.addAttribute("trafficLight", trafficLight);

		return "/frg/frgAdd_form";
	}

	@GetMapping("/frgShow")
	public String frgShowPage(HttpSession session, Model model, TrafficDTO trfDto, FrgListDTO frgDto , RedirectAttributes rttr) {
		log.info("frgShow");
		System.out.println(session);
	
		String userId = (String) session.getAttribute("SESS_ID");
		System.out.println("SESS_ID: " + userId);
	
		if (userId == null || session == null) { //세션 만료 또는 세션없이 외부 접속했을때 처리
			log.info("여기 도착합니다.");
			String msg = "로그인이 필요한 기능입니다. 로그인을 해주세요.";
			rttr.addFlashAttribute("msg", msg);
			
			return "redirect:/frg/login";
		}
		
		trfDto.setUser_id(userId);
		List<Integer> trafficLight = trfService.getTrafficLight(trfDto);
		model.addAttribute("trafficLight", trafficLight);
	
		frgDto.setUser_id(userId);
		List<FrgListDTO> frgList = frgService.getFrgList(frgDto);
		
		// Gson 사용하여 frgList를 JSON 형태로 변환
		Gson gson = new Gson();
		String frgListJson = gson.toJson(frgList);
	
		// 변환된 JSON 데이터를 model에 추가
		model.addAttribute("frgListJson", frgListJson);
	
		return "/frg/frgShow";
	}

	@PostMapping(value = "/frgAdd_form", consumes = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public ResponseEntity<List<ResponseDTO>> registerFrgList(@RequestBody List<FrgListDTO> list) {
		log.info("냉장고 등록");
		log.info("frgAdd_form");
		log.info(list);

		List<ResponseDTO> responses = new ArrayList<>();

		for (FrgListDTO frgDto : list) {
			ResponseDTO response = frgService.registerFrgList(frgDto);
			responses.add(response);
		}

		boolean success = true;

		for (ResponseDTO resDto : responses) {
			if (resDto.getAffectedRow() <= 0) {
				success = false;
				break;
			}
		}

		// 모든 냉장고 등록 완료
		if (success) {
			return ResponseEntity.ok(responses);
		}
		// 하나 이상의 냉장고 등록 실패
		else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responses);
		}
	}

	@GetMapping(value = "/getFrgNames", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<String>> getFrgNames(@RequestParam("user_id") String user_id) {
		
		FrgListDTO frgDto = new FrgListDTO();
		
		frgDto.setUser_id(user_id);
		
		List<String> frgNames = frgService.getFrgNames(frgDto);
		
		return ResponseEntity.ok(frgNames);
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
	
	@PostMapping("/removeFrgList")
	@ResponseBody
	public ResponseEntity<ResponseDTO> removeFrgList(@RequestBody FrgListDTO frgDto) {
		
		ResponseDTO response = frgService.removeFrgList(frgDto);
		
		boolean success = true;

		if (response.getAffectedRow() <= 0) {
			success = false;
		}
		
		// 냉장고 삭제 성공
		if (success) {
			return ResponseEntity.ok(response);
		}
		// 냉장고 삭제 실패
		else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}
}
