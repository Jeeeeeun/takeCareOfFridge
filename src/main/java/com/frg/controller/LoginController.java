package com.frg.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.frg.domain.UserDTO;
import com.frg.service.LoginService;
import com.frg.util.SHAEncodeUtil;
import com.frg.util.SessionUtil;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/frg/*")
@Log4j
public class LoginController {

	@Setter(onMethod_ = @Autowired)
	LoginService service;

	@GetMapping(value = "/login")
	public String getLogin() {
		return "/frg/login";
	}

	public static final int LOGIN_SECCESS = 1;

	@PostMapping(value = "/login")
	public String postLogin(HttpServletRequest request, Model model) {
		UserDTO dto = new UserDTO();
		dto.setUser_id(request.getParameter("user_id"));
		dto.setUser_pw(SHAEncodeUtil.encodeSha(request.getParameter("user_pw")));

		int loginAuth = service.getCountUser(dto);
		if (loginAuth == LOGIN_SECCESS) {
			// session binding
			service.getUserByIdAndPwd(dto);

			int loginClass = service.getClassUser(dto);
			if (loginClass != 0) {
				SessionUtil.setSessionAttributes(request, dto.getUser_id(), true, "Y");
				log.info("frgListShow");
				return "redirect:/login";
			} else {
				SessionUtil.setSessionAttributes(request, dto.getUser_id(), true, "N");
				log.info("frgListAdd");
				return "redirect:/login";
			}
		} else {
			// 로그인 실패
			// 로그인 ;
			model.addAttribute("errorMessage", "로그인 실패했습니다!");
			log.info("실패");			
			return "/frg/login";
		}
	}
}
