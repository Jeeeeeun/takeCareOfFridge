package com.frg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.frg.service.LoginService;

import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/comm/*")
@Log4j
public class BoardController {

	@Autowired
	LoginService service;

	@GetMapping(value = "/board")
	public String getLogin() {
		return "/comm/board";
	}
}