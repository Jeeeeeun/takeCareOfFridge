<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
		<meta name="description" content="" />
		<meta name="author" content="" />
		<title>frgShow Page</title>

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
		<link href="${pageContext.servletContext.contextPath}/resources/css/styles.css" rel="stylesheet" />
		<link rel="stylesheet" href="${pageContext.servletContext.contextPath}/resources/css/frgAdd.css" />
		<link rel="stylesheet" href="${pageContext.servletContext.contextPath }/resources/css/frgShow.css" />
		
		<!-- FontAwesome CDN -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
		
		<!-- JavaScript global variable -->
		<script type="text/javascript">
			const contextPath = '${pageContext.servletContext.contextPath}';
			const frgListJson = <c:out value="${frgListJson}" escapeXml="false"/>;
		</script>

		<!-- JavaScript External Links -->
		<script src="${pageContext.servletContext.contextPath}/resources/js/frgShow.js"></script>

		<!-- jQuery CDN -->
		<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous" ></script>
	</head>
	<body>
		<header class="custom-masthead vh-100">

			<!-- Navigation-->
			<nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
				<div class="container px-4 px-lg-5">
					<a class="navbar-brand" href="${ pageContext.servletContext.contextPath }/frg/index">TakeCareOfFridge</a>
					<button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarResponsive">
						<ul class="navbar-nav ms-auto my-2 my-lg-0">
							<li class="nav-item">
								<a class="nav-link" href="${ pageContext.servletContext.contextPath }/frg/frgShow">
									MyFridge
								</a>
							</li>
							<li class="nav-item hidden">
								<a class="nav-link" href="${ pageContext.servletContext.contextPath }/board/list">
									Community
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="${ pageContext.servletContext.contextPath }/frg/logout">
									Logout
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="${ pageContext.servletContext.contextPath }/frg/myPage">
									<i class="fa-solid fa-circle-user"></i>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div class="d-flex flex-row position-relative mt-6">
				<div id="trafficLight" class="bg-traffic mx-2 d-flex flex-column justify-content-sm-around py-1">
					<p id="red" class="d-flex justify-content-sm-center w-100 fs-3 text-white-75 fw-bold mb-0">
						${trafficLight[0].red}
					</p>
					<p id="yellow" class="d-flex justify-content-sm-center w-100 fs-3 text-white-75 fw-bold mb-0">
						${trafficLight[0].yellow}
					</p>
					<p id="green" class="d-flex justify-content-sm-center w-100 fs-3 text-white-75 fw-bold mb-0">
						${trafficLight[0].green}
					</p>
				</div>
				<div id="showFridge" class="w-100" style="transform: translateY(15%);">
					<div class="w-20 d-flex flex-column justify-content-sm-center align-items-center mx-auto">
						<button class="bg-transparent d-flex justify-content-sm-center align-items-center w-100 h-100 mx-0 my-0 border-transparent"  title="냉장고 속 식품 보러 가기" onclick="goIntoFrg('${pageContext.servletContext.contextPath}/frg/innerCtrl');">
							<img id="frg_shape" class="w-100 h-100 z-1 border-transparent position-relative" style="object-fit: cover;">
							<div id="frg_state" class="d-flex position-absolute z-2">
								<p id="frg_Astate" class="position-relative fw-semibold m-0"></p>
								<p id="frg_Bstate" class="position-relative fw-semibold m-0"></p>
							</div>
						</button>
						<div class="ctrlInfos bg-transparent border-transparent">
							<button id="prev" onclick="prevFrg()">
								<i class="fa-solid fa-caret-left"></i>
							</button>
							<!-- 냉장고 이름 표시 부분 -->
							<p id="frg_name" class="ms-4 me-4">${frgName}</p>
							<button id="next" onclick="nextFrg()">
								<i class="fa-solid fa-caret-right"></i>
							</button>
						</div>
						<button type="button" class="btn" title="냉장고 더 만들기" onclick="generateNewFrg()">
							<i class="fa-solid fa-plus"></i>
						</button>
					</div>
				</div>
			</div>
		</header>
	</body>
</html>