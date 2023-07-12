package com.frg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.frg.service.LoginService;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/frg/*")
@Log4j
public class LoginController {

	@Setter(onMethod_ = @Autowired)
	LoginService service;
	
	@RequestMapping(value="/login",method = RequestMethod.GET)
	public void getLogin() {
		
	}
	
	@RequestMapping(value="/login", method = RequestMethod.POST)
	public void postLogin() {
		
	}
	
	
}
