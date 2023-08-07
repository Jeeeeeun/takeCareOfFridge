package com.frg.util;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Random;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendEmail {
	
	private static Map<String, String> emailCodes = new HashMap<>();
	
	public static void naverMailSend(String email) { //변경
		String host = "smtp.naver.com"; // 네이버일 경우 네이버 계정, gmail경우 gmail 계정
		String user = "ican000422@naver.com"; //
		String password = "cha8314!!@@##";       
	
		// SMTP 서버 정보를 설정한다.
		Properties props = new Properties();
		
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.naver.com");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.port", "587");
		props.put("mail.smtp.ssl.protocols", "TLSv1.2");
		
		Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
		    protected PasswordAuthentication getPasswordAuthentication() {
		        return new PasswordAuthentication(user, password);
		    }
		});
		
		String randomCode = generateRandomCode();
		
		emailCodes.put(email, randomCode);
		try {
		    MimeMessage message = new MimeMessage(session);
		    message.setFrom(new InternetAddress(user));
		    message.addRecipient(Message.RecipientType.TO, new InternetAddress(email)); //변경
		
		    // 메일 제목
		    message.setSubject("냉장고를 부탁해 비밀번호 찾기 이메일 인증 코드");
		
			
			// 메일 내용
			message.setText("인증코드는 " + randomCode + " 입니다.");
		
			// send the message
			Transport.send(message);
			System.out.println("Success Message Send");
			
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}
	
	private static String generateRandomCode() {
		StringBuilder randomNumber = new StringBuilder(6);
	    Random rand = new Random();

	    for (int i = 0; i < 6; i++) {
	        int num = rand.nextInt(10); // 0 ~ 9 사이의 숫자를 생성합니다.
	        randomNumber.append(num);
	    }

	    return randomNumber.toString();
	}
	
	public static String getEmailCode(String email) {
		return emailCodes.get(email);
	}
}
