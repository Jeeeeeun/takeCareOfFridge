package com.frg.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class) // JUnit 프레임워크에서 test class를 실행하는 데 필요한 annotation
@WebAppConfiguration // Spring framework를 사용해 web application(=program)의 테스트 환경을 설정함.
@ContextConfiguration({ "file:src/main/webapp/WEB-INF/spring/root-context.xml",
		"file:src/main/webapp/WEB-INF/spring/appServlet/servlet-context.xml" }) // web.xml에 root와 servlet-context 두 개가 들어있다.
@Log4j // 로깅을 위해서 annotation 적용
public class FrgListControllerTest {

	@Setter(onMethod_ = @Autowired)
	private WebApplicationContext ctx;
	// WebApplicationContext: web application 관련 설정, bean 관리,
		// servlet-context 등 정보와 기능에 접근할 수 있음.
	// web application을 build하고 실행하는 데 필요한 다양한 설정, 구성 요소들을 관리하는 역할.
	// test class에서 이걸 쓰는 이유: web application에 대한 테스트 환경을 설정하고 관리하기 위함.
	
	private MockMvc mockMvc;  // web application의 controller를 가상으로 호출하는 데 사용됨.
	
	@Before  // 테스트하기 전에 이거부터 실행해
	public void setup() { // 테스트 실행 전 실행할 메소드 이름을 setup으로 하는 게 관례.
		log.info("before()에서 실행해본 ctx = " + ctx);
		log.info("before()에서 실행해본 mockMvc(초기화 전) =" + mockMvc);
		
		this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx).build();
		// MockMvc 객체를 초기화하고 설정하는 부분.
		// MocMvcBuilders: MockMvc 객체를 생성하기 위한 builder 클래스.
			// web application context를 설정하거나, 개별 controller를 설정하기 위한 method 제공.
		// webAppContextSetup(ctx): MockMvcBuilders 클래스의 정적 메소드.
			// WebApplicationContext 객체인 ctx를 인자로 받음.
			// web application context를 설정한 builder 객체를 반환.
			// MockMvc 객체가 web application의 구성을 사용하도록 설정됨.
		// build(): MockMvc 객체를 생성하고 반환하는 메소드.
			//	이 메소드를 호출한 후 반환되는 MockMvc instance는 web application context가 설정된 상태.
		
		log.info("before()에서 실행해본 mockMvc(초기화 후) =" + mockMvc);
	}
	
	@Test
	public void testRegisterFrgList_Success() throws Exception {
		log.info("controller의 registerFrgList() 테스트");			
	}

}
