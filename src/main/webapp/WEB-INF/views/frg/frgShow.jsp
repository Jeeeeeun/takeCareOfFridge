<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="com.frg.util.SessionUtil"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<title>frgShow Page</title>
<link rel="stylesheet"
	href="${pageContext.servletContext.contextPath }/resources/css/frgShow.css">
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
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
	crossorigin="anonymous" referrerpolicy="no-referrer" />
<script type="text/javascript">
	window.contextPath = '${pageContext.servletContext.contextPath}';
	const frgListJson = <c:out value="${frgListJson}" escapeXml="false"/>;
</script>
<script
	src="${pageContext.servletContext.contextPath}/resources/js/frgShow.js"></script>
<script type="text/javascript">
    function setFrgNameSession() {
        const frgName = document.getElementById("frg_name").innerText;
        const encodedFrgName = encodeURIComponent(frgName);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "${pageContext.servletContext.contextPath}/frg/setFrgNameSession?frgName=" + encodedFrgName, true);
        xhr.send();
        
        // innerCtrl 페이지로 이동합니다.
        location.href = "${pageContext.servletContext.contextPath}/frg/innerCtrl";
    }
</script>
</head>
<body id="page-top">
	<header class="masthead">
		<!-- Navigation-->
		<nav class="navbar navbar-expand-lg navbar-light fixed-top py-3"
			id="mainNav">
			<div class="container px-4 px-lg-5">
				<a class="navbar-brand"
					href="${ pageContext.servletContext.contextPath }/frg/index">TakeCareOfFridge</a>
				<button class="navbar-toggler navbar-toggler-right" type="button"
					data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
					aria-controls="navbarResponsive" aria-expanded="false"
					aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarResponsive">
					<ul class="navbar-nav ms-auto my-2 my-lg-0">
						<li class="nav-item"><a class="nav-link"
							href="${ pageContext.servletContext.contextPath }/frg/frgShow">
								MyFridge </a></li>
						<li class="nav-item"><a class="nav-link"
							href="${ pageContext.servletContext.contextPath }/comm/board">
								Community </a></li>
						<li class="nav-item"><a class="nav-link"
							href="${ pageContext.servletContext.contextPath }/frg/logout">
								Logout </a></li>
						<li class="nav-item"><a class="nav-link"
							href="${ pageContext.servletContext.contextPath }/frg/myPage">
								<i class="fa-solid fa-circle-user"></i>
						</a></li>
					</ul>
				</div>
			</div>
		</nav>
		<p id="red">${trafficLight[0].red}</p>
		<p id="yellow">${trafficLight[0].yellow}</p>
		<p id="green">${trafficLight[0].green}</p>
		<div id="showFridge">
			<!-- onclick 이벤트에서 frg_name 값을 가져오도록 설정 -->
			<a class="goToFoodCtrl"
				href="${pageContext.servletContext.contextPath}/frg/innerCtrl"
				onclick="setFrgNameSession()"> <img id="frg_shape">
			</a>
			<div id="frg_state">
				<p id="frg_Astate"></p>
				<p id="frg_Bstate"></p>
			</div>
			<div class="ctrlInfos">
				<button id="prev" onclick="prevFrg()">
					<i class="fa-solid fa-caret-left"></i>
				</button>
				<!-- 냉장고 이름 표시 부분 -->
				<p id="frg_name">${frgName}</p>
				<button id="next" onclick="nextFrg()">
					<i class="fa-solid fa-caret-right"></i>
				</button>
			</div>
			<a class="plusFrgBtn"
				href="${pageContext.servletContext.contextPath}/frg/frgAdd_form">
				<i class="fa-solid fa-plus"></i>&nbsp;냉장고 더 만들기
			</a>
		</div>
	</header>
</body>
</html>