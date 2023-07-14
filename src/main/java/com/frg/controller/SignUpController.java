package com.frg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.frg.service.LoginService;

import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/frg/*")
@Log4j
public class SignUpController {

	@Autowired
	LoginService service;

	@GetMapping(value = "/signUp")
	public String getLogin() {
		return "/frg/signUp";
	}
}
