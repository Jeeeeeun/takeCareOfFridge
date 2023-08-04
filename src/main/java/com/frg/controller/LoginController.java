package com.frg.controller;

import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.frg.domain.UserDTO;
import com.frg.service.LoginService;
import com.frg.util.SHAEncodeUtil;
import com.frg.util.SessionUtil;

import lombok.extern.log4j.Log4j;

@Controller
@RequestMapping("/frg/*")
@Log4j
public class LoginController {

   @Autowired
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
            return "redirect:/frg/frgShow";
         } else {
            SessionUtil.setSessionAttributes(request, dto.getUser_id(), true, "N");
            log.info("frgListAdd");
            return "redirect:/frg/frgAdd";
         }
      } else {
         // 로그인 실패
           log.info("실패");            
           return "redirect:/frg/login";
      }
   }
   
   @GetMapping("/getUserId")
   @ResponseBody
   public ResponseEntity<String> getUserId(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
       String userId = SessionUtil.getSessionUserId(request);
       return ResponseEntity.ok().body(userId);
   }
}