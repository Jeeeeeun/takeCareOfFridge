package com.frg.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/frg/*")
@Log4j
public class IndexController {

	@GetMapping(value = "/index")
	public String getIndex() {
		return "/frg/index";
	}	
}
