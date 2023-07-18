<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<title>frgAdd Page</title>
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
<!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> -->
<script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
<script>
	var contextPath = "${pageContext.servletContext.contextPath}";
	const responseFoodApiData = null;
</script>
<script
	src="${pageContext.servletContext.contextPath}/resources/js/InnerFoodAdd.js">
</script>
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
		<p id="red">${trafficLight[0].red}</p>
		<p id="yellow">${trafficLight[0].yellow}</p>
		<p id="green">${trafficLight[0].green}</p>
		<form
			action="${pageContext.servletContext.contextPath}/frg/innerAdd/Auto"
			method="post" id="actionForm">

			<div id="formAdd">
				<!-- 냉장고 목록 -->
				<label> <select name="frgList" id="formOption">
						<option value="">선택하세요</option>
						<c:forEach var="name" items="${frgNames}">
							<option value="">${name}</option>
						</c:forEach>
				</select>
				</label> <br>
				<!-- 보관 위치 -->
				<input type="radio" id="formStateFrozen"/>냉동 
				<input type="radio" id="formStateCool"/>냉장 <br>
				<!-- 식품명 -->
				<label> <input type="search" id="searchInput" autofocus />
					<button type="button" id="searchSubmit" onclick="searchFoodAPI();">검색하기</button>
					<br> <input type="checkbox" id="registerFood"
					onclick="changeFormAction();" />직접 입력하기
				</label> <br>
				<!-- 유통/소비기한 -->
				<label> <input type="text" id="dueDate"
					placeholder="유통/소비기한"> <br> <input type="date">직접입력하기
				</label> <br>
				<!-- 식품유형 -->
				<label> <input type="text" id="formType" placeholder="식품 유형 안내">
				</label> <br>
				<!-- 수량 -->
				<label> <input type="number" id="formCount" placeholder="식품 수량 등록">
				</label> <br>
				<!-- 제조사명 -->
				<label> <input type="text" id="formCompany" placeholder="제조사명 안내" >
				</label> <br>
				<!-- 추가, 완료 버튼 -->
				<button type="submit" onclick="addFood();">추가</button>
				<button type="submit" onclick="addFinish();">완료</button>
			</div>
			<br>
			<div>
				<table border="1">
					<tr>
						<th>식품명</th>
						<th>제조사</th>
						<th>유통/소비기한</th>
						<th>제품유형</th>
					</tr>
					<div id="foodApiOutPut">
					<tr>
						<td>${""}</td>
						<td>${""}</td>
						<td>${""}</td>
						<td>${""}</td>
					</tr>
					</div>
				</table>
			</div>
		</form>
</body>

</html>
