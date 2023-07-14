package com.frg.controller;

import java.util.ArrayList;
import java.util.List;

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

import com.frg.domain.FrgListDTO;
import com.frg.domain.ResponseDTO;
import com.frg.domain.TrafficDTO;
import com.frg.service.FrgListService;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/frg/*")
@AllArgsConstructor
@Log4j
public class FrgListController {

	@NonNull
	private FrgListService service;

	@GetMapping("/frgAdd")
	public String frgAddPage(Model model, @RequestParam("user_id") String user_id, TrafficDTO trfDto) {
		log.info("frgAdd");
		
		trfDto.setUser_id(user_id);
		List<Integer> trafficLight = service.getTrafficLight(trfDto);
		model.addAttribute("trafficLight", trafficLight);
		
		return "/frg/frgAdd";
	}

	@GetMapping("/frgAdd_form")
	public String frgAddFormPage(Model model, @RequestParam("user_id") String user_id, TrafficDTO trfDto) {
		log.info("frgAdd_form");

		trfDto.setUser_id(user_id);
		List<Integer> trafficLight = service.getTrafficLight(trfDto);
		model.addAttribute("trafficLight", trafficLight);

		return "/frg/frgAdd_form";
	}

	@PostMapping(value = "/frgAdd_form", consumes = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public ResponseEntity<List<ResponseDTO>> registerFrgList(@RequestBody List<FrgListDTO> list) {
		log.info("냉장고 등록");
		log.info("frgAdd");
		log.info(list);

		List<ResponseDTO> responses = new ArrayList<>();

		for (FrgListDTO frgDto : list) {
			ResponseDTO response = service.registerFrgList(frgDto);
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

	@GetMapping("/frgShow")
	public String frgShowPage(Model model, @RequestParam("user_id") String user_id, TrafficDTO trfDto) {
		
		log.info("frgShow");

		trfDto.setUser_id(user_id);
		List<Integer> trafficLight = service.getTrafficLight(trfDto);
		model.addAttribute("trafficLight", trafficLight);
		
		return "/frg/frgShow";
	}
}
