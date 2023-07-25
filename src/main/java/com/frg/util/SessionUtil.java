package com.frg.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionUtil {
	public static void setSessionAttributes(HttpServletRequest request, String userId, boolean auth, String role) {
		HttpSession session = request.getSession();
		session.setAttribute("SESS_AUTH", auth);
		session.setAttribute("SESS_ID", userId);
		session.setAttribute("SESS_ROLE", role);
		
		session.setMaxInactiveInterval(60 * 60 * 24);//24시간 세션 유지
	}

	public static boolean getSessionAuth(HttpServletRequest request) {
		HttpSession session = request.getSession();
		Boolean auth = (Boolean) session.getAttribute("SESS_AUTH");
		return auth != null && auth;
	}

	public static String getSessionUserId(HttpServletRequest request) {
		HttpSession session = request.getSession();
		return (String) session.getAttribute("SESS_ID");
	}

	public static String getSessionUserRole(HttpServletRequest request) {
		HttpSession session = request.getSession();
		return (String) session.getAttribute("SESS_ROLE");
	}
}