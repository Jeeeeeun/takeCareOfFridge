package com.frg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.frg.domain.UserDTO;
import com.frg.service.EmailService;

import lombok.extern.log4j.Log4j;
import oracle.jdbc.proxy.annotation.Post;

@Controller
@RequestMapping("/frg/*")
@Log4j
public class SendEmailController {
	
	@Autowired
	EmailService service;
	
//	//비밀번호 변경
//	@PostMapping(value = "/checkPwd", produces = { MediaType.APPLICATION_JSON_VALUE })
//	@ResponseBody
//	public boolean postFindPwd(@RequestBody UserDTO user) {
//		String email = user.getUser_email();
//		user.setUser_email(email);
//		
//		log.info("유저 정보 알아보기 쉽게 이메일 - " + email);
//		log.info("유저 정보 알아보기 쉽게1 - " + user);
//		
//		return service.updatePwd(user);
//	}
	
	//비밀번호 변경
	@PostMapping(value = "/checkPwd", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<?> postFindPwd(@RequestBody UserDTO user) {
	    String email = user.getUser_email();
	    user.setUser_email(email);

	    log.info("유저 정보 알아보기 쉽게 이메일 - " + email);
	    log.info("유저 정보 알아보기 쉽게1 - " + user);
	    
	    boolean result = service.updatePwd(user);
	    
	    if (result) {
	        return ResponseEntity.ok().body("success");
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("failed");
	    }
	}
	
	//이메일 인증코드 전송
	@PostMapping(value = "/emailRandomCode", produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public ResponseEntity<?> postSendEmail(@RequestBody UserDTO user) {
		String email = user.getUser_email();
		service.sendVerificationCode(email);
		return ResponseEntity.ok("인증 번호 발송");
	}
	
	//인증 코드 비교
	@PostMapping(value = "/checkEmailCode", produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
    public boolean checkEmailCode(@RequestParam("email") String email, @RequestParam("code") String inputCode) {
        return service.checkEmailCode(email, inputCode);
    }
	
	//페이지
	@GetMapping(value = "/findPwd")
	public String getFindPwd() {
		log.info("여기로 들어와버림 ");
		return "/frg/findPwd";
	}
}
