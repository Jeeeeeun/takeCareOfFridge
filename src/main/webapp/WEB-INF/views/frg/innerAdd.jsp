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
<link rel="stylesheet"
	href="${ pageContext.servletContext.contextPath }/resources/css/styles.css" />
<link rel="stylesheet"
	href="${ pageContext.servletContext.contextPath }/resources/css/innerAdd.css" />
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
	crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://code.jquery.com/jquery-3.7.0.js"
	integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM="
	crossorigin="anonymous"></script>
<script>
	window.contextPath = "${pageContext.servletContext.contextPath}";

	//frgNames 데이터를 JavaScript 변수에 할당
	const frgNames = ${frgNamesJson};

	document.addEventListener('DOMContentLoaded', function() {
		// HTML이 모두 렌더링된 후 실행되어야 할 스크립트를 여기에 작성
		// 이 이벤트 핸들러는 DOMContentLoaded 이벤트가 발생했을 때 실행됩니다.
		// 냉장고 목록 select 가져오기
		let frgOptionList = document.getElementsByName("frgList");

		// frgNames를 이용하여 옵션 동적 생성
		function addOptionsToFrgList(frgOptionList, frgNames) {
			for (let i = 0; i < frgOptionList.length; i++) {
				const frgOption = frgOptionList[i];
				for (let j = 0; j < frgNames.length; j++) {
					const name = frgNames[j];
					if (name !== "") {
						const option = document.createElement("option");
						option.value = name;
						option.textContent = name;
						frgOption.appendChild(option);
					}
				}
			}
		}

		// 함수 호출
		addOptionsToFrgList(frgOptionList, frgNames);
	});
	
	function addFinish() {
		// 사용자 입력 데이터를 가져오기
	    // 필수 입력 항목 체크

		const frgName = document.getElementById("frgOption").value;
	    if (frgName === "") {
	        alert("냉장고를 선택해주세요!");
	        return false;
	    }
		const frgState = document
				.querySelector("input[name='frgState']:checked").value;

		const foodName = document.getElementById("foodNameInput").value;
	    if (foodName === "") {
	        alert("식품명을 입력해주세요!");
	        return false;
	    }

	    const expireDate = document.getElementById("dueDate").value;
	    if (expireDate === "") {
	        alert("유통/소비기한을 선택해주세요!");
	        return false;
	    }

		const foodType = document.getElementById("foodType").value;
		  if (foodType === "") {
		        alert("식품 유형을 입력해주세요!");
		        return false;
		    }
		  
		const foodCount = document.getElementById("foodCount").value;
	    if (foodCount === "") {
	        alert("수량을 입력해주세요!");
	        return false;
	    }

		const foodCompany = document.getElementById("foodCompany").value;


		

		// 데이터를 서버로 전송하기 위해 객체로 만들기
		const data = {
			frg_name : frgName,
			in_state : frgState,
			in_name : foodName,
			in_expireDate : new Date(expireDate),
			in_type : foodType,
			in_count : foodCount,
			in_company : foodCompany
		};

		$.ajax({
		    type: "POST",
		    url: `${pageContext.servletContext.contextPath}/frg/innerAdd/submit`,
		    data: JSON.stringify(data),
		    contentType: "application/json",
		    dataType: "json",
		    success: function (response) {
		        if (response.success) {
		            alert("성공적으로 등록 완료");
		            location.reload(); // 페이지 새로고침
		        } else {
		            alert("등록 실패: " + response.message);
		        }
		    },
		    error: function (err) {
		        alert("등록 실패: 서버 내부 오류가 발생했습니다.");
		    }
		});
		return false;
	}
</script>
<script
	src="${pageContext.servletContext.contextPath}/resources/js/innerFoodAdd.js">
	
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
							href="${ pageContext.servletContext.contextPath }/board/list">Community</a></li>
						<li class="nav-item"><a class="nav-link"
							href="${ pageContext.servletContext.contextPath }/frg/logout">Logout</a></li>
						<li class="nav-item"><a class="nav-link"
							href="${ pageContext.servletContext.contextPath }/frg/myPage"><i
								class="fa-solid fa-circle-user"></i></a></li>
					</ul>
				</div>
			</div>
		</nav>
		<div class="d-flex flex-row position-relative mt-6">
			<div id="trafficLight"
				class="bg-traffic mx-2 d-flex flex-column justify-content-sm-around py-1">
				<p id="red"
					class="d-flex justify-content-sm-center w-100 fs-3 text-white-75 fw-bold mb-0">${trafficLight[0].red}</p>
				<p id="yellow"
					class="d-flex justify-content-sm-center w-100 fs-3 text-white-75 fw-bold mb-0">${trafficLight[0].yellow}</p>
				<p id="green"
					class="d-flex justify-content-sm-center w-100 fs-3 text-white-75 fw-bold mb-0">${trafficLight[0].green}</p>
			</div>

			<form action="${pageContext.servletContext.contextPath}/frg/innerAdd"
				method="post" id="actionForm">


				<!-- 
				
				div (.d-flex) > div (#trafficLight) + form (#actionForm)
				
				settingBoxWrapper > addSettingBox-All + addSettingBtn
				addSettingBox-All > addSettingBox-Left +  addSettingBox-Right
				
				 -->

				<div class="settingBoxWrapper">

					<div class="addSettingBox-All">

						<div class="addSettingBox-Left">

							<div class="addSettingBox-Form">

								<div class="addSettingBox-Count-Plus">
									<div class="addSettingBtn">
										<div class="addSettingBtn-text">
											<button type="button" name="addFormBtn"
												onclick="createNewSettingBox();">
												<i class="fa-solid fa-circle-plus"></i>
											</button>
										</div>
									</div>
									<p>총 N개 등록 중</p>
								</div>

								<div class="addSettingBox-Form-Scroll">

									<div class="addSettingBox-Wrapper">
										<div class="addSettingBox">

											<!-- 냉장고 목록 -->
											<div class="box1">
												<label>
													<p>냉장고 선택</p> <select name="frgList" id="frgOption">
														<option value="">냉장고 선택</option>
												</select>
												</label>
											</div>

											<!-- 보관 위치 -->
											<div class="box2">
												<p>보관상태</p>
												<label> 
													<input type="radio" name="frgState" id="foodStateFrozen"  value="frozen" checked/>냉동
												</label>
												<label>
													<input type="radio" name="frgState" id="foodStateCool" value="cool" />냉장 
												</label> 
											</div>

											<!-- 식품명 -->
											<div class="box3">
												<label>
													<p>식품명</p>
													<div class="box3-1">
														<div class="box3-2">
															<input type="text" name="foodName" id="foodNameInput"
																placeholder="검색 결과가 입력됩니다." disabled />
															<div class="box3-3">
																<input type="checkbox" name="checkCustom"
																	id="checkCustomInput" onclick="checkCustomOrNot();">직접입력하기
															</div>
														</div>
													</div>
												</label>
											</div>

											<!-- 유통/소비기한 -->
											<div class="box4">
												<label>
													<p>유통/소비기한</p>
													<div class="box4-1">
														<input type="date" name="expireDate" id="dueDate" value="">
													</div>
												</label>
											</div>

											<!-- 식품유형 -->
											<div class="box5">
												<label>
													<p>식품유형</p> <input type="text" name="foodType"
													id="foodType" placeholder="검색 결과가 입력됩니다." disabled>
												</label>
											</div>

											<!-- 수량 -->
											<div class="box6">
												<label>
													<p>수량</p> <input type="number" name="foodCount"
													id="foodCount" placeholder="식품 수량 등록">
												</label>
											</div>

											<!-- 제조사명 -->
											<div class="box7">
												<label>
													<p>제조사명</p> <input type="text" name="foodCompany"
													id="foodCompany" placeholder="검색 결과가 입력됩니다." disabled>
												</label>
											</div>
											
											<div class="addSettingBtn">
												<div class="addSettingBtn-Finish">
													<button type="submit" name="finishBtn"
														onclick="addFinish(); return false;">
														<!-- return false가 있어야 button을 눌렀을 때 페이지 넘김이 안 됨 -->
														<i class="fa-solid fa-thumbs-up"></i>등록 완료
													</button>
												</div>
											</div>
										</div>

										<!-- addSetting Box 끝 -->
									</div>
									<!-- addSettingBox-Wrapper -->

								</div>
								<!-- addSettingBox-Form-Scroll -->

							</div>
							<!-- addSettingBox-Form 끝 -->

						</div>
						<!-- addSettingBox-Left -->

						<div class="addSettingBox-Right">

							<div class="addSettingBox-Table">

								<!-- 직접입력하기를 할 경우 생겨날 table -->
								<div class="tableBox">
									<div class="searchFood">
										<p>공공 API를 이용하여 식품을 조회해보세요</p>
										<div class="searchFood-1">
											<input type="search" name="searchFood" id="searchInput"
												placeholder="식품을 검색하세요." autofocus />
											<button type="button" name="searchFoodBtn" id="searchSubmit"
												onclick="searchFoodAPI();">검색하기</button>
										</div>
										<!-- searchFood-1 끝 -->
									</div>
									<!-- searchFood 끝 -->
									<div class="FoodTableDiv"
										style="max-height: 400px; overflow-y: scroll; margin-left: 20px;">
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
								</div>

							</div>
							<!-- addSettingBox-Table 끝 -->

						</div>
						<!-- addSettingBox-Right 끝 -->

					</div>
					<!-- addSettingBox-All 끝 -->
				</div>
				<!-- settingBoxWrapper 끝 -->

			</form>
		</div>

	</header>
</body>
</html>