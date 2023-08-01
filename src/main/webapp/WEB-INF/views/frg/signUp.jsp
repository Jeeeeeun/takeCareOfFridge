<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<title>SignUP Page</title>
<!-- Favicon-->
<link rel="icon" type="image/x-icon" href="../resources/img/favicon.ico" />
<!-- Bootstrap Icons-->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
	rel="stylesheet" />
<!-- Google fonts-->
<link
	href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700"
	rel="stylesheet" />
<link
	href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic"
	rel="stylesheet" type="text/css" />
<!-- SimpleLightbox plugin CSS-->
<link
	href="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.css"
	rel="stylesheet" />
<!-- Core theme CSS (includes Bootstrap)-->
<link href="../resources/css/styles.css" rel="stylesheet" />
<script src="https://code.jquery.com/jquery-3.7.0.min.js"
     integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous">
</script>
<script src="${pageContext.servletContext.contextPath }/resources/js/signUp.js"></script>
</head>
<body id="page-top">
	<!-- Navigation-->
	<nav class="navbar navbar-expand-lg navbar-light fixed-top py-3"
		id="mainNav">
		<div class="container px-4 px-lg-5">
			<a class="navbar-brand"
				href="<%=request.getContextPath()%>/frg/index">TakeCareOfFridge</a>
			<button class="navbar-toggler navbar-toggler-right" type="button"
				data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
				aria-controls="navbarResponsive" aria-expanded="false"
				aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarResponsive">
				<ul class="navbar-nav ms-auto my-2 my-lg-0">
					<li class="nav-item"><a class="nav-link"
						href="<%=request.getContextPath()%>/frg/login">Login</a></li>
				</ul>
			</div>
		</div>
	</nav>
	<!-- Masthead-->
	<header class="masthead">
		<div class="container px-4 px-lg-5 h-100">
			<div
				class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
				<div class="col-lg-8 align-self-end">
					<h1 class="text-white font-weight-bold">TAKE CARE OF FRIDGE</h1>
					<hr class="divider" />
				</div>
				<div class="registerBox">
					<div class="loginTitle">SignUp</div>
					<hr class="horizonLine">
					<form id="registerForm"
						action="<%=request.getContextPath()%>/frg/signUp" method="post">
						<input type="text" class="inputBox box1" id="user_name"
							name="user_name" placeholder="NAME" required
							style="margin-bottom: 20px;"><br> 
						<input type="text"
							class="inputBox box2" id="user_id" name="user_id"
							placeholder="ID" required style="margin-bottom: 20px; margin-left:84px;">
						<button class="duplicateBtn" id="checkId" type="button">중복확인</button>
						<div class="idErrorMsg hidden" id="idErrorMsg">
							<span></span>
						</div>
						<input type="email" class="inputBox box3" id="user_email"
							name="user_email" placeholder="EMAIL" required
							style="margin-bottom: 20px; margin-left:84px;">
						<button class="duplicateBtn" id="checkEmail" type="button">중복확인</button>
						<div class="emailErrorMsg hidden" id="emailErrorMsg">
							<span></span>
						</div>
						<input
							type="password" class="inputBox box4" id="user_pw" name="user_pw"
							placeholder="PW" required style="margin-bottom: 20px;"> <br>
						<input type="password" class="inputBox box5" id="verifyPwd"
							placeholder="PW CHECK" required style="margin-bottom: 20px;">
						<span class="pwdAlert" id="pwdAlert"
							style="margin-left: 10px; position: absolute;"></span><br>

						<button type="submit" class="signUpBtn" id="submitButton" disabled>회원가입하기</button>
						<!-- 회원가입 버튼 이걸 추가해서 첫 버튼 비활성화 하기 disabled
							테스트 끝난 후 추가한 후 회원가입 로직에 따라 입력이 다 된다면 이 버튼을 활성화 하게 끔 만들기
						 -->
					</form>
				</div>
			</div>
		</div>
	</header>
</body>
</html>