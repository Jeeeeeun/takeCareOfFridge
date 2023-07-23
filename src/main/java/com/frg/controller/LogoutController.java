package com.frg.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/frg/*")
@Log4j
public class LogoutController {
	
	@GetMapping(value = "/logout")
	public String getLogout(HttpServletRequest request) {
		HttpSession session = request.getSession(false); // 현재 세션이 없으면 null 반환
		if (session != null) {
			session.invalidate(); // 세션 무효화
		}
		
	    return "redirect:/frg/index";
	}
}
