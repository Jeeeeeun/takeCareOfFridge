package com.frg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.frg.domain.UserDTO;
import com.frg.service.LoginService;
import com.frg.service.SignUpService;

import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/frg/*")
@Log4j
public class SignUpController {

	@Autowired
	SignUpService service;

	@PostMapping(value = "/signUp")
	public String postSignUp(@ModelAttribute("user") UserDTO user, Model model) {
		boolean success = service.registerUser(user);
		
		if(success) {
			model.addAttribute("msg", "회원가입 완료");
			log.info("성공 - " + success);
			return "/frg/login";
		} else {
			model.addAttribute("msg", "회원가입 실패");
			log.info("실패 - " + success);
			return "/frg/signUp";
		}
		
	}
	
	@GetMapping(value = "/checkId")
	@ResponseBody
	public ResponseEntity<?> checkId(@RequestParam("id") String id) {
		
		boolean isExId = service.isExistId(id);
		
		return ResponseEntity.ok(isExId);
	}
	
	@GetMapping(value = "/checkEmail")
	@ResponseBody
	public ResponseEntity<?> checkEmail(@RequestParam("email") String email) {
		
		boolean isExEmail = service.isExistEmail(email);
		
		return ResponseEntity.ok(isExEmail);
	}
	
	@GetMapping(value = "/signUp")
	public String getLogin() {
		return "/frg/signUp";
	}
}
