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
<title>로그인</title>
<!-- Favicon-->
<link rel="icon" type="image/x-icon" href="../resources/img/favicon.svg" />
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
<script
	src="${ pageContext.servletContext.contextPath }/resources/js/login.js"></script>
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
						href="<%=request.getContextPath()%>/frg/signUp">SignUp</a></li>
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
				<div class="col-lg-8 align-self-baseline">
					<div class="loginBox">
						<div class="loginTitle">Login</div>
						<hr class="horizonLine">
						<form
							action="${ pageContext.servletContext.contextPath }/frg/login"
							method="post">
							<input type="text" id="user_id" name="user_id" class="inputBox"
								placeholder="ID" style="margin-bottom: 20px;"><br>
							<input type="password" id="user_pw" name="user_pw"
								class="inputBox" placeholder="PW" style="margin-bottom: 20px;">
							<div class="box-submit">
								<input type="submit" class="loginBtn" value="로그인하기"
									onclick="return login();">
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</header>
</body>
</html>