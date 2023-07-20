<%@page import="com.fasterxml.jackson.databind.ObjectMapper"%>
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
<title>Inner Add Page</title>
<!-- Favicon-->
<link rel="icon" type="image/x-icon" href="../resources/img/favicon.ico" />
<!-- Bootstrap Icons-->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
	rel="stylesheet" />
<!-- Google fonts-->
<!-- <link
	href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700"
	rel="stylesheet" />
<link
	href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic"
	rel="stylesheet" type="text/css" /> -->
<!-- SimpleLightbox plugin CSS-->
<link
	href="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.css"
	rel="stylesheet" />
<!-- Core theme CSS (includes Bootstrap)-->
<link rel="stylesheet" href="${ pageContext.servletContext.contextPath }/resources/css/styles.css" />
<link rel="stylesheet" href="${ pageContext.servletContext.contextPath }/resources/css/innerAdd.css" />
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
	crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
<script>
	window.contextPath = "${pageContext.servletContext.contextPath}";
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

			<!-- 
			
			* css 구조 : 버튼 외 + 버튼
			form > settingBoxWrapper(버튼 외) + settingBtn (버튼)
			
			* 버튼 외
			settingBoxWrapper > settingBox(form 요소) + tableBox (동적 생성될 table)
			settingBox > box1 ~ box7 (각 form 요소)
			box1 (냉장고 목록) > label > p + select > option
			box2 (보관 위치) > label > p + input
			box3 (식품명) > label > p + div > input + button + div > input
			box4 (유통소비기한) > label > p + div > input*2
			box5 (식품 유형) > label > p + input
			box6 (수량) > label > p + input
			box7 (제조사명) > label > p + input
			
			* 버튼
			settingBtn > button*2
			
			 -->
			 
			<div class="settingBoxWrapper">
				<!-- form 부분 -->
				
				<div class="addSettingBox">
				<div class="settingBox">
					<!-- 냉장고 목록 -->
					<div class="box1">
						<label>
							<p>냉장고 선택</p>
						    <select name="frgList" id="frgOption">
						        <option value="">냉장고 선택</option>
						    </select>
						</label>
					</div>
						<script>
							// frgNames 데이터를 JavaScript 변수에 할당
						    const frgNames = ${frgNamesJson};
						    console.log(frgNames);
			
						    // 냉장고 목록 select 요소 가져오기
						    let frgOption = document.getElementById("frgOption");
			
						    // frgNames를 이용하여 옵션 동적 생성
						    frgNames.forEach((name) => {
						    	if (name !== "") {
							        const option = document.createElement("option");
							        option.value = name;
							        option.textContent = name;
							        frgOption.appendChild(option);
						    	}
						    });
						</script>
					
					<!-- 보관 위치 -->
					<div class="box2">
						<p>보관 위치</p>
						<label>
							<input type="radio" name="frgState" id="foodStateFrozen"/>냉동 
						</label>
						<label>
							<input type="radio" name="frgState" id="foodStateCool"/>냉장 <br>
						</label>
					</div>
					
					<!-- 식품명 -->
					<div class="box3">
						<label> 
							<p>식품명</p>
							<div class="box3-1">
								 <div class="box3-2">							
									<input type="text" name="" id="foodNameInput" placeholder="식품 이름 입력" autofocus />
							</div>
							 <div class="box3-2">							 
								<input type="checkbox"  id="checkCustom" onclick="checkCustomOrNot();" />직접 입력하기
							 </div>							
							</div>
						</label>
					</div>
					
					<!-- 유통/소비기한 -->
					<div class="box4">
						<label> 
							<p>유통/소비기한</p>
							<div class="box4-1">
								<input type="text" id="dueDateAuto" placeholder="유통/소비기한 안내"> 
								<input type="date" id="dueDateCustom" >							
							</div>
						</label> 
					</div>
					
					<!-- 식품유형 -->
					<div class="box5">
						<label> 
							<p>식품유형</p>
							<input type="text" id="foodType" placeholder="식품 유형 안내">
						</label> 
					</div>
					
					<!-- 수량 -->
					<div class="box6">
						<label> 
							<p>수량</p>
							<input type="number" id="foodCount" placeholder="식품 수량 등록">
						</label> 
					</div>
					
					<!-- 제조사명 -->
					<div class="box7">
						<label> 
							<p>제조사명</p>
							<input type="text" id="foodCompany" placeholder="제조사명 안내" >
						</label> 
					</div>
				</div> <!-- settingBox 끝 -->
				
				</div> <!-- addSettingBox 끝 -->
				<!-- 직접입력하기를 할 경우 생겨날 table -->
				<div class="tableBox">
					<div class="searchFood">
						<p>공공 API를 이용하여 식품을 조회해보세요</p>
						<div class="searchFood-1">
							<input type="search" id="searchInput"  placeholder="식품명을 검색하세요." autofocus />
							<button type="button" id="searchSubmit" onclick="searchFoodAPI();">검색하기</button>
						</div>							
					</div>
					<table id="showFoodTable">
						<thead>
							<tr>
								<th>&nbsp;</th>
								<th>식품명</th>
								<th>제조사</th>
								<th>유통/소비기한</th>
								<th>제품유형</th>
							</tr>
						</thead>
						<tbody id="tbodyTag"></tbody>
					</table>
				</div>
			</div> <!-- settingBoxWrapper 끝 -->
			
			<!-- 추가, 완료 버튼 -->
			<div class="settingBtn"> 
			  <div class="settingBtn-1">
				<button type="button" onclick="createNewSettingBox();">추가</button>
				<button type="submit" onclick="addFinish();">완료</button>
			  </div>
			</div>
		</form>
		</header>
</body>
</html>