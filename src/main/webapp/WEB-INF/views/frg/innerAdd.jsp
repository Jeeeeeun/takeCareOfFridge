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
<title>식품 정보 등록</title>

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
<link rel="stylesheet"
	href="${ pageContext.servletContext.contextPath }/resources/css/styles.css" />

<!-- External Custom CSS StyleSheet -->
<link rel="stylesheet"
	href="${ pageContext.servletContext.contextPath }/resources/css/innerAdd.css" />

<!-- FontAwesome CDN -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
	crossorigin="anonymous" referrerpolicy="no-referrer" />

<!-- jQuery CDN -->
<script src="https://code.jquery.com/jquery-3.7.0.js"
	integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM="
	crossorigin="anonymous"></script>

<script type="text/javascript">
	window.contextPath = "${pageContext.servletContext.contextPath}";
	//frgNames 데이터를 JavaScript 변수에 할당
	const frgNames = ${frgNamesJson};
</script>
<script type="text/javascript" 
	src="${pageContext.servletContext.contextPath}/resources/js/innerFoodAdd3.js">
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
							href="${ pageContext.servletContext.contextPath }/frg/frgShow">MyFridge</a></li>
						<li class="nav-item hidden"><a class="nav-link"
							href="${ pageContext.servletContext.contextPath }/board/list">Community</a></li>
						<li class="nav-item"><a class="nav-link"
							href="${ pageContext.servletContext.contextPath }/frg/logout">Logout</a></li>
						<li class="nav-item"><a class="nav-link"
							href="${ pageContext.servletContext.contextPath }/frg/myPage"><i
								class="fa-solid fa-circle-user"></i></a></li>
					</ul>
				</div>
			</div>

			<div id="customAlert"
				class="hidden position-fixed top-0 start-0 w-100 h-100 bg-black-50 z-5 transition-opacity transition-duration-03 transition-timing-easeOut">
				<div
					class="d-flex align-items-sm-center justify-content-sm-center text-center bg-white py-2 rounded-3 w-40 h-20 position-absolute top-50 start-50 translate-middle text-keepAll text-prewrap z-10 transition-all transition-duration-03 transition-timing-easeOut shadow-forAlert">
					<p id="alertContent">알림창!</p>
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


			<div class="settingBoxWrapper">

				<div class="addSettingBox-All">

					<div class="addSettingBox-Left">

						<div class="addSettingBox-Form">

							<div class="addSettingBox-Count-Plus">
								<div class="addSettingBtn-text">
									<button type="button" id="addFormBtn" onclick="createNewSettingBox();" title="폼을 추가합니다">
										<i class="fa-solid fa-plus"></i>
									</button>
									<button type="button" id="removeFormBtn" onclick="removeChosenSettingBox();" title="삭제할 폼을 선택하신 후 누르세요">
										<i class="fa-solid fa-minus"></i>
									</button>
								</div>
								<p>총 <span id="totalFormsCount">1</span>개 등록 대기</p>
							</div>

							<form
								action="${pageContext.servletContext.contextPath}/frg/innerAdd/submit"
								method="post" id="actionForm">

								<div class="addSettingBox-Form-Scroll">

									<div class="addSettingBox-Wrapper">

										<div id="addSettingBoxForm-0">

											<div class="selectedFormToRemove">
												<input type="checkbox" name="formToRemove-0" id="selectedForm-0" onclick="selectedForms();">폼
												선택하기
											</div>

											<div class="addSettingBoxForm-boxes">

												<div class="addSettingBoxForm-boxes-arrange">

													<!-- 냉장고 목록 -->
													<div class="box1">
														<label for="frgOption-0"> 냉장고 선택 </label> <select
															name="frg_name-0" id="frgOption-0">
															<option value="">냉장고를 선택하세요</option>
														</select>
													</div>

													<!-- 보관 위치 -->
													<div class="box2">
														<label for="foodStateFrozen foodStateCool"> 보관상태 </label>
														<div class="box2-1">
															<input type="radio" name="in_state-0"
																id="foodStateFrozen-0" value="frozen" checked />냉동 <input
																type="radio" name="in_state-0" id="foodStateCool-0"
																value="cool" />냉장
														</div>
													</div>

													<!-- 식품명 -->
													<div class="box3">
														<label for="foodNameInput-0"> 식품명 </label>
														<div class="box3-1">
															<div class="box3-2">
																<input type="text" name="in_name-0" id="foodNameInput-0"
																	placeholder="검색 결과가 입력됩니다." disabled />
															</div>
															<div class="box3-3">
																<input type="checkbox" id="checkCustomInput-0"
																	onclick="checkCustomOrNot();">직접입력하기
															</div>
														</div>
													</div>

													<!-- 유통/소비기한 -->
													<div class="box4">
														<label for="dueDate-0"> 유통/소비기한 </label> <input
															type="date" name="in_expireDate-0" id="dueDate-0"
															value="">
													</div>

													<!-- 식품유형 -->
													<div class="box5">
														<label for="foodType-0"> 식품유형 </label> <input type="text"
															name="in_type-0" id="foodType-0"
															placeholder="검색 결과가 입력됩니다." disabled>
													</div>

													<!-- 수량 -->
													<div class="box6">
														<label for="foodCount-0"> 수량 </label> <input type="number"
															name="in_count-0" id="foodCount-0" min="1" placeholder="식품 수량 등록">
													</div>

													<!-- 제조사명 -->
													<div class="box7">
														<label for="foodCompany-0"> 제조사명 </label> <input
															type="text" name="in_company-0" id="foodCompany-0"
															placeholder="검색 결과가 입력됩니다." disabled>
													</div>
												</div>
											</div>

										</div>
										<!-- addSettingBoxForm-0 끝 -->

									</div>
									<!-- addSettingBox-Wrapper -->

								</div>
								<!-- addSettingBox-Form-Scroll -->

								<div class="addSettingBtn-Finish">
									<button type="submit" onclick="addFinish(); return false;">
										<!-- return false가 있어야 button을 눌렀을 때 페이지 넘김이 안 됨 -->
										등록 완료
									</button>
								</div>

							</form>

						</div>
						<!-- addSettingBox-Form 끝 -->

					</div>
					<!-- addSettingBox-Left -->

					<div class="addSettingBox-Right">

						<div class="addSettingBox-Table">

							<!-- 직접입력하기를 할 경우 생겨날 table -->
							<div class="tableBox">
								<div class="searchFood">
									<p class="searchFood-guide">공공 API를 이용하여 식품을 조회해보세요</p>
									<div class="searchFood-1">
										<input type="search" name="searchFood" id="searchInput"
											placeholder="식품을 검색하세요." autofocus />
										<button type="button" name="searchFoodBtn" id="searchSubmit" title="검색하기를 눌러주세요"
											onclick="searchFoodAPI();">검색하기</button>
									</div>
									<!-- searchFood-1 끝 -->
								</div>
								<!-- searchFood 끝 -->
								<div class="FoodTableDiv">
									<table id="showFoodTable">
										<thead>
											<tr title="조회한 식품을 클릭하면 등록 양식에 식품 정보가 추가돼요">
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


		</div>

	</header>
	
</body>
</html>
