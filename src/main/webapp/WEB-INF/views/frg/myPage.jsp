<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="com.frg.util.SessionUtil"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<title>myPage</title>
<!-- Favicon-->
<link rel="icon" type="image/x-icon"
	href="${ pageContext.servletContext.contextPath }/resources/img/vFrg.svg" />
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
<link rel="stylesheet"
	href="${pageContext.servletContext.contextPath }/resources/css/myPage.css">
<script type="text/javascript">
	window.contextPath = '${pageContext.servletContext.contextPath}';
	const frgListJson = <c:out value="${frgListJson}" escapeXml="false"/>;
</script>
<script
	src="${pageContext.servletContext.contextPath}/resources/js/myPage.js"></script>
</head>
<body>
	<header class="masthead">
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
							href="${ pageContext.servletContext.contextPath }/frg/frgShow">MyFridge</a></li>
						<li class="nav-item"><a class="nav-link"
							href="${ pageContext.servletContext.contextPath }/comm/board">Community</a></li>
						<li class="nav-item"><a class="nav-link"
							href="${ pageContext.servletContext.contextPath }/frg/logout">Logout</a></li>
						<li class="nav-item"><a class="nav-link"
							href="${ pageContext.servletContext.contextPath }/frg/myPage"><i
								class="fa-solid fa-circle-user"></i></a></li>
					</ul>
				</div>
			</div>
		</nav>
		<div>
			<div class="myPageTitleBox1">가입 정보 확인</div>
			<div class="myPageContentBox1">
				<div class="myNameBox">
					<p>Name</p>
					<div class="nameBoxCenterLine"></div>
					<input type="text" disabled />
				</div>
				<div class="myIDBox">
					<p>ID</p>
					<div class="idBoxCenterLine"></div>
					<input type="text" disabled />
				</div>
				<div class="myEmailBox">
					<p>Email</p>
					<div class="emailBoxCenterLine"></div>
					<input type="text" disabled />
				</div>
				<div class="myPwBox">
					<p>PW</p>
					<div class="pwBoxCenterLine"></div>
					<input type="text" disabled />
				</div>
				<div class="myPwCheckBox">
					<p>PW Check</p>
					<div class="pwCheckBoxCenterLine"></div>
					<input type="text" disabled />
				</div>
				<button class="modifyMyInfoBtn">수정하기</button>
			</div>
		</div>
		<div class="centerline"></div>
		<div>
			<div class="myPageTitleBox2">나의 게시글 보기</div>
			<div class="myPageContentBox2">
				<div class="myPostTitleBox">내가 쓴 게시글</div>
				<p class="count">
					총&nbsp;<span>0</span>개
				</p>
				<div class="myPostListBox"></div>
				<hr class="boardCenterLine">
				<div class="myCommentTitleBox">내가 쓴 댓글</div>
				<p class="count">
					총&nbsp;<span>0</span>개
				</p>
				<div class="myCommentListBox"></div>
			</div>
		</div>
		<div>
			<div class="myPageTitleBox3">나의 냉장고 보기</div>
			<div class="myPageContentBox3">
				<div class="fridgeStateTitleBox">현재 나의 냉장고 상태</div>
				<div class="fridgeTrafficBox">
					<div class="myRedLight">
						<span class="foodCount">${trafficLight[0].red}</span>
					</div>
					<div class="myYellowLight">
						<span class="foodCount">${trafficLight[0].yellow}</span>
					</div>
					<div class="myGreenLight">
						<span class="foodCount">${trafficLight[0].green}</span>
					</div>
				</div>
				<div class="standardLine1"></div>
				<div class="dangerous-standard">
					<span>${ trfStandard[0].dangerous_standard }</span>
				</div>
				<div class="standardLine2"></div>
				<div class="warning-standard">
					<span>${ trfStandard[0].warning_standard }</span>
				</div>
				<span><i class="fa-solid fa-pen-to-square standardChange"></i></span>
				<hr class="myFridgeHorizonLine1">
				<div class="fridgeInfoTitleBox">냉장고 정보</div>
				<div class="fridgeShapeBox">
					<img id="frg_shape">
				</div>
				<div>
				</div>
				<span><i class="fa-solid fa-pen-to-square fridgeChange"></i></span>
			</div>
		</div>
	</header>
</body>
</html>