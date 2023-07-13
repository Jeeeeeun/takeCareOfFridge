package com.frg.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/frg/*")
@Log4j
public class InnerFoodController {
	
	//innerFoodAdd
	// localhost:8080/controller/frg/innerAdd
	@GetMapping("innerAdd")
	public void insertInnerAuto(){
		log.info("innerFoodAdd");
		
	}
	
	
	

}
