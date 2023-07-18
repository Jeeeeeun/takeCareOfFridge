package com.frg.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionUtil {
	public static void setSessionAttributes(HttpServletRequest request, String userId, boolean auth, String role,
			String frgName) {
		HttpSession session = request.getSession();
		session.setAttribute("SESS_AUTH", auth);
		session.setAttribute("SESS_ID", userId);
		session.setAttribute("SESS_ROLE", role);
		session.setAttribute("SESS_FRG_NAME", frgName);
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

	public static String getSessionUserFrgName(HttpServletRequest request) {
		HttpSession session = request.getSession();
		return (String) session.getAttribute("SESS_FRG_NAME");
	}

	public static void setFrgNameSession(HttpServletRequest request, String frgName) {
		HttpSession session = request.getSession();
		session.setAttribute("SESS_FRG_NAME", frgName);
	}
}