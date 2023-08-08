<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.frg.util.SessionUtil"%>
<!DOCTYPE html>
	<html lang="ko">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
			<meta name="description" content="" />
			<meta name="author" content="" />
			<title>HOME</title>
			<!-- Favicon-->
			<link rel="icon" type="image/x-icon" href="../resources/img/favicon.svg" />

			<!-- Bootstrap Icons-->
			<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />

			<!-- Google fonts-->
			<link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
			<link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />

			<!-- SimpleLightbox plugin CSS-->
			<link href="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.css" rel="stylesheet" />
			
			<!-- Core theme CSS (includes Bootstrap)-->
			<link href="${pageContext.servletContext.contextPath }/resources/css/styles.css" rel="stylesheet" />

			<!-- FontAwesome CDN -->
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

			<!-- JavaScript External Links -->
			<script src="${pageContext.servletContext.contextPath}/resources/js/alertAndConfirm.js"></script>
		</head>
		<body id="page-top">
			<!-- Navigation-->
			<nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
				<div class="container px-4 px-lg-5">
					<a class="navbar-brand" href="<%=request.getContextPath()%>/frg/index">
						TakeCareOfFridge
					</a>
					<button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarResponsive">
						<%
							Boolean userSession = SessionUtil.getSessionAuth(request);
							String userRole = SessionUtil.getSessionUserRole(request);
							
							if (userSession == null || !userSession) {
						%>
								<ul class="navbar-nav ms-auto my-2 my-lg-0">
									<li class="nav-item">
										<a class="nav-link" href="<%=request.getContextPath()%>/frg/login" onclick="event.preventDefault(); noLog(event);">
											MyFridge
										</a>
									</li>
									<li class="nav-item hidden">
										<a class="nav-link" href="<%=request.getContextPath()%>/frg/login" onclick="event.preventDefault(); noLog(event);">
											Community
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="<%=request.getContextPath()%>/frg/login">
											Login
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="<%=request.getContextPath()%>/frg/signUp">
											SignUp
										</a>
									</li>
								</ul>
						<%
							} else if (userSession != null && userRole.equals("Y")) {
						%>
								<ul class="navbar-nav ms-auto my-2 my-lg-0">
									<li class="nav-item">
										<a class="nav-link" href="<%=request.getContextPath()%>/frg/frgShow">
											MyFridge
										</a>
									</li>
									<li class="nav-item hidden">
										<a class="nav-link" href="<%=request.getContextPath()%>/board/list">
											Community
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="<%=request.getContextPath()%>/frg/logout">
											Logout
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="<%=request.getContextPath()%>/frg/myPage">
											<i class="fa-solid fa-circle-user"></i>
										</a>
									</li>
								</ul>
						<%
							} else { 
						%>
								<ul class="navbar-nav ms-auto my-2 my-lg-0">
									<li class="nav-item">
										<a class="nav-link" href="<%=request.getContextPath()%>/frg/frgAdd">
											MyFridge
										</a>
									</li>
									<li class="nav-item hidden">
										<a class="nav-link" href="<%=request.getContextPath()%>/frg/frgAdd" onclick="event.preventDefault(); noFrg(event);">
											Community
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="<%=request.getContextPath()%>/frg/logout">
											Logout
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="<%=request.getContextPath()%>/frg/frgAdd" onclick="event.preventDefault(); noFrg(event);">
											<i class="fa-solid fa-circle-user"></i>
										</a>
									</li>
								</ul>
						<%
							}
						%>
					</div>
				</div>
			</nav>
			<div id="customAlert" class="hidden position-fixed top-0 start-0 w-100 h-100 bg-black-50 z-5 transition-opacity transition-duration-03 transition-timing-easeOut">
				<!-- 알림창 -->
				<div class="d-flex align-items-sm-center justify-content-sm-center text-center bg-white py-2 rounded-3 w-40 h-20 position-absolute top-50 start-50 translate-middle text-keepAll text-prewrap z-10 transition-all transition-duration-03 transition-timing-easeOut shadow-forAlert">
					<p id="alertContent" class="m-auto fs-5">알림창!</p>
				</div>
			</div>
			<div id="customConfirm" class="hidden position-fixed top-0 start-0 w-100 h-100 bg-black-50 z-5 transition-opacity transition-duration-03 transition-timing-easeOut">
				<!-- 컨펌창 -->
				<div class="w-35 h-20 d-flex flex-column align-items-sm-center justify-content-sm-center text-center bg-white p-3 rounded-3 position-absolute top-50 start-50 translate-middle text-keepAll text-prewrap z-10 transition-all transition-duration-03 transition-timing-easeOut shadow-forAlert">
					<p id="confirmContent" class="my-4 mx-auto fs-5">컨펌창!</p>
					<div class="w-100 h-50 d-flex flex-row justify-content-sm-end align-items-sm-center mx-3 my-0">
						<button id="confirmYesBtn" class="w-10 h-25 btn d-flex justify-content-sm-end align-items-sm-center btn-primary text-center rounded-3 mx-2 py-3">
							Yes
						</button>
						<button id="confirmNoBtn" class="w-10 h-25 btn d-flex justify-content-sm-end align-items-sm-center btn-secondary rounded-3 mx-2 py-3">
							No
						</button>
					</div>
				</div>
			</div>
			<!-- Masthead-->
			<header class="masthead">
				<div class="container px-4 px-lg-5 h-100">
					<div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
						<div class="col-lg-8 align-self-end">
							<h1 class="text-white font-weight-bold">
								TAKE CARE OF FRIDGE
							</h1>
							<hr class="divider" />
						</div>
						<div class="col-lg-8 align-self-baseline">
							<p class="text-white-75 text-keepAll mb-5">
								냉장고 식품 관리 전문 페이지입니다. 식품 관리가 어려운 1인 가구뿐만 아니라 가정, 가게 등 어느 곳에서든 사용이 가능하고, 신호등을 통해 식품의 유통 기한 정보를 한눈에 파악할 수 있습니다!
							</p>
							<a class="btn btn-primary btn-xl" href="#whoMade">
								개발자 소개
							</a>
						</div>
					</div>
				</div>
			</header>
			<!-- Introducing Developers of This Program -->
			<section class="page-section bg-primary d-flex justify-content-sm-center align-items-center mx-auto" id="whoMade">
				<div class="container px-4 px-lg-5">
					<div class="row gx-4 gx-lg-5 justify-content-center">
						<div class="col-lg-8 text-center">
							<h2 class="text-white mt-0">
								개발자 소개
							</h2>
							<hr class="divider divider-light" />
						</div>
						<div class="w-100">
							<div class="w-100 d-flex flex-row justify-content-sm-center align-items-sm-center mb-4">
								<h6>
									<a class="text-white-75 text-decoration-none" title="클릭 시 이동합니다." href="https://github.com/Jeeeeeun/takeCareOfFridge">
										<i class="fa-solid fa-arrow-pointer me-3"></i>
										Go to Github Repository Address for This Project
									</a>
								</h6>
							</div>
							<table class="w-100 border-none d-flex flex-column justify-content-sm-center align-items-sm-center mb-5">
								<tr>
									<th class="border-05 border-white border-solid p-3 text-center text-white-75">이름</th>
									<th class="border-05 border-white border-solid p-3 text-center text-white-75">Github Address</th>
									<th class="border-05 border-white border-solid p-3 text-center text-white-75">Contact(E-mail)</th>
								</tr>
								<tr>
									<td class="border-05 border-white border-solid p-3 text-center text-white-75">안진수</td>
									<td class="border-05 border-white border-solid p-3 text-center text-white-75" title="클릭 시 이동합니다.">
										<a class="text-white-75 text-decoration-none" href="https://github.com/geulsol">
											https://github.com/geulsol
										</a>
									</td>
									<td class="border-05 border-white border-solid p-3 text-center text-white-75">wlstn3365@naver.com</td>
								</tr>
								<tr>
									<td class="border-05 border-white border-solid p-3 text-center text-white-75">김지은</td>
									<td class="border-05 border-white border-solid p-3 text-center text-white-75" title="클릭 시 이동합니다.">
										<a class="text-white-75 text-decoration-none" href="https://github.com/Jeeeeeun">
											https://github.com/Jeeeeeun
										</a>
									</td>
									<td class="border-05 border-white border-solid p-3 text-center text-white-75">ryan43778@gmail.com</td>
								</tr>
								<tr>
									<td class="border-05 border-white border-solid p-3 text-center text-white-75">이혁</td>
									<td class="border-05 border-white border-solid p-3 text-center text-white-75" title="클릭 시 이동합니다.">
										<a class="text-white-75 text-decoration-none" href="https://github.com/hyeeok">
											https://github.com/hyeeok
										</a>
									</td>
									<td class="border-05 border-white border-solid p-3 text-center text-white-75">dlgur57@gmail.com</td>
								</tr>
								<tr>
									<td class="border-05 border-white border-solid p-3 text-center text-white-75">김현</td>
									<td class="border-05 border-white border-solid p-3 text-center text-white-75" title="클릭 시 이동합니다.">
										<a class="text-white-75 text-decoration-none" href="https://github.com/ican0422">
											https://github.com/ican0422
										</a>
									</td>
									<td class="border-05 border-white border-solid p-3 text-center text-white-75">ican0422@gmail.com</td>
								</tr>
							</table>
							<a class="btn btn-light btn-xl d-flex justify-content-sm-center align-items-sm-center w-30 mx-auto" href="#usedTools">
								Used Tools & Languages
							</a>
				</div>
			</div>
		</div>
	</section>
	<!-- usedTools -->
	<section class="page-section" id="usedTools">
		<div class="container px-4 px-lg-5">
			<h2 class="text-center mt-0">We Used These Tools & Languages</h2>
			<hr class="divider mb-5" />
			<div class="d-flex flex-column gx-4 gx-lg-5">
				<div class="d-flex flex-row justify-content-sm-start mb-3">
					<div class="w-50 p-2">
						<h5 class="fa-solid">[ WEB FRAMEWORK ]</h5>
						<div class="d-flex flex-row justify-content-sm-center">
							<img src="${pageContext.servletContext.contextPath }/resources/img/spring.png" class="w-15 mx-3"/>
							<img src="${pageContext.servletContext.contextPath }/resources/img/bootstrap.png" class="w-15 mx-3"/>
						</div>
					</div>
					<div class="w-50 p-2">
						<h5 class="fa-solid">[ LIBRARY ]</h5>
						<div class="d-flex flex-row">
							<img src="${pageContext.servletContext.contextPath }/resources/img/jquery.png" class="w-15 mx-3"/>
						</div>
					</div>
				</div>
				<div class="d-flex flex-row justify-content-sm-start mb-3">
					<div class="w-50 p-2">
						<h5 class="fa-solid">[ FRONTEND ]</h5>
						<div class="d-flex flex-row justify-content-sm-center">
							<img src="${pageContext.servletContext.contextPath }/resources/img/html.png" class="w-15 mx-3"/>
							<img src="${pageContext.servletContext.contextPath }/resources/img/css.png" class="w-15 mx-3"/>
							<img src="${pageContext.servletContext.contextPath }/resources/img/javascript.png" class="w-15 mx-3"/>
						</div>
					</div>
					<div class="w-50 p-2">
						<h5 class="fa-solid">[ BACKEND ]</h5>
						<div class="d-flex flex-row justify-content-sm-start mb-5">
							<img src="${pageContext.servletContext.contextPath }/resources/img/java.png" class="w-15 mx-3"/>
							<img src="${pageContext.servletContext.contextPath }/resources/img/jsp.png" class="w-15 mx-3"/>
						</div>
					</div>
				</div>
				<div class="d-flex flex-row justify-content-sm-start mb-3">
					<div class="w-50 p-2">
						<h5 class="fa-solid">[ TOOLS ]</h5>
						<div class="d-flex flex-row justify-content-sm-start">
							<img src="${pageContext.servletContext.contextPath }/resources/img/vscode.png" class="w-15 mx-3" />
							<img src="${pageContext.servletContext.contextPath }/resources/img/git.png" class="w-15 mx-3"/>
							<img src="${pageContext.servletContext.contextPath }/resources/img/github.png" class="w-15 mx-3"/>
							<img src="${pageContext.servletContext.contextPath }/resources/img/tomcat.png" class="w-15 mx-3"/>
							<img src="${pageContext.servletContext.contextPath }/resources/img/oracleDB.png" class="w-15 mx-3"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</body>
</html>
