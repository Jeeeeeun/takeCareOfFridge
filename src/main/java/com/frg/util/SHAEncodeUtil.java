package com.frg.util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.stereotype.Component;

import lombok.Data;
import lombok.extern.log4j.Log4j;

@Component
@Data
@Log4j
public class SHAEncodeUtil {
	public static String encodeSha(String planeText) {
		String encodingText = "";
		try {
			// SHA-512, SHA-256, SHA1 등 다양한 방식으로 활용
			MessageDigest md = MessageDigest.getInstance("SHA-512");
			md.update(planeText.getBytes());
			encodingText = String.format("%0128x", new BigInteger(1, md.digest()));

		} catch (NoSuchAlgorithmException e) {
			// throws가 싫어서 RuntimeException을 사용
			throw new RuntimeException(e);
		}
		return encodingText;
	}
	
	public static void main(String[] args) {
		System.out.println(encodeSha("123"));
	}
}