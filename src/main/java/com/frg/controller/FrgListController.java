package com.frg.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.frg.domain.FrgListDTO;
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
	
	public String registerFrgList() {
		
		return "/frg/frgAdd"; // frgAdd_form // frgShow
	}
}
