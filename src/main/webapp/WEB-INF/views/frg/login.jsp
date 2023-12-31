<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
		<meta name="description" content="" />
		<meta name="author" content="" />
		<title>로그인</title>

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
		<link href="../resources/css/styles.css" rel="stylesheet" />

		<!-- Internal Custom CSS StyleSheet -->
		<style>
			.inputBox::placeholder{
				font-size: 15px;
				transform: translate(10px, -3px);
			}
		</style>

		<!-- JavaScript External Links -->
		<script src="${pageContext.servletContext.contextPath}/resources/js/alertAndConfirm.js"></script>
		<script src="${ pageContext.servletContext.contextPath }/resources/js/login.js"></script>
		
		<!-- JavaScript Internal Codes -->
		<script>
			alert('${msg}');
		</script>
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
					<ul class="navbar-nav ms-auto my-2 my-lg-0">
						<li class="nav-item">
							<a class="nav-link" href="<%=request.getContextPath()%>/frg/signUp">
								SignUp
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<div id="customAlert" class="hidden position-fixed top-0 start-0 w-100 h-100 bg-black-50 z-5 transition-opacity transition-duration-03 transition-timing-easeOut">
			<!-- 알림창 -->
			<div class="d-flex align-items-sm-center justify-content-sm-center text-center bg-white py-2 rounded-3 w-40 h-20 position-absolute top-50 start-50 translate-middle text-keepAll text-prewrap z-10 transition-all transition-duration-03 transition-timing-easeOut shadow-forAlert">
				<p id="alertContent" class="m-auto fs-5">알림창!</p>
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
						<div class="loginBox">
							<div class="loginTitle fs-1 text-white">Login</div>
							<hr class="horizonLine">
							<form action="${ pageContext.servletContext.contextPath }/frg/login" method="post">
								<input type="text" id="user_id" name="user_id" class="inputBox h4" placeholder="ID" required style="margin-bottom: 20px; border-radius: 20px;"><br>
								<input type="password" id="user_pw" name="user_pw" class="inputBox h4" placeholder="PW" required style="margin-bottom: 20px; border-radius: 20px;">
								<div class="box-submit">
									<input type="submit" class="loginBtn btn btn-success" style="border-radius: 20px;" value="로그인하기" onclick="return login();">
								</div>
							</form>
							<a class="findPwdLink btn text-white text-decoration-none mt-2" href="${pageContext.servletContext.contextPath }/frg/findPwd">비밀번호 찾기</a>
						</div>
					</div>
				</div>
			</div>
		</header>
	</body>
</html>