<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
		<meta name="description" content="" />
		<meta name="author" content="" />
		<title>frgAddForm Page</title>
	
		<!-- Favicon-->
		<link rel="icon" type="image/x-icon" href="../resources/img/favicon.ico" />
	
		<!-- Bootstrap Icons-->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet"/>
		
		<!-- Google fonts-->
		<link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
		<link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />
	
		<!-- SimpleLightbox plugin CSS-->
		<link href="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.css" rel="stylesheet" />
	
		<!-- Core theme CSS (includes Bootstrap)-->
		<link href="${ pageContext.servletContext.contextPath }/resources/css/styles.css" rel="stylesheet" />
		
		<!-- External Custom CSS StyleSheet -->
		<link rel="stylesheet" href="${ pageContext.servletContext.contextPath }/resources/css/frgAdd_form.css" />
	
		<!-- FontAwesome CDN -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	
		<!-- JavaScript global variable -->
		<script>
			const contextPath = "${pageContext.servletContext.contextPath}";
		</script>

		<!-- JavaScript External Links -->
		<script src="${ pageContext.servletContext.contextPath }/resources/js/frgAdd_form.js"></script>
		<script src="${ pageContext.servletContext.contextPath }/resources/js/mainAlert.js"></script>

		<!-- jQuery CDN -->
		<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous" ></script>

	</head>
	<body>
		<header class="custom-masthead">
			<nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
				<div class="container px-4 px-lg-5">
					<a class="navbar-brand" href="${ pageContext.servletContext.contextPath }/frg/index">TakeCareOfFridge</a>
					<button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarResponsive">
					<%
						String sessRole = (String) session.getAttribute("SESS_ROLE");
						if (sessRole != null && sessRole.equals("Y")) {
					%>
							<ul class="navbar-nav ms-auto my-2 my-lg-0">
								<li class="nav-item">
									<a class="nav-link" href="${ pageContext.servletContext.contextPath }/frg/frgShow">MyFridge</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="${ pageContext.servletContext.contextPath }/board/list">Community</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="${ pageContext.servletContext.contextPath }/frg/logout">Logout</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="${ pageContext.servletContext.contextPath }/frg/myPage">
										<i class="fa-solid fa-circle-user"></i>
									</a>
								</li>
							</ul>
					<%
						} else {
					%>
							<ul class="navbar-nav ms-auto my-2 my-lg-0">
								<li class="nav-item">
									<a class="nav-link" href="${ pageContext.servletContext.contextPath }/frg/frgAdd">MyFridge</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="${ pageContext.servletContext.contextPath }/frg/frgAdd_form" onclick="noFrg();">Community</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="${ pageContext.servletContext.contextPath }/frg/logout">Logout</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="${ pageContext.servletContext.contextPath }/frg/frgAdd_form" onclick="noFrg();">
										<i class="fa-solid fa-circle-user"></i>
									</a>
								</li>
							</ul>
					<%
						}
					%>
				</div>
			</div>
		</nav>
		<div id="customAlert" class="hidden position-fixed top-0 start-0 w-100 h-100 bg-black-50 z-5 transition-opacity transition-duration-03 transition-timing-easeOut">
			<!-- 알림창 -->
			<div class="d-flex align-items-sm-center justify-content-sm-center text-center bg-white py-2 rounded-3 w-40 h-20 position-absolute top-50 start-50 translate-middle text-keepAll text-prewrap z-10 transition-all transition-duration-03 transition-timing-easeOut shadow-forAlert">
				<p id="alertContent" class="m-auto fs-5">알림창!</p>
			</div>
		</div>
		<div id="customConfirm" class="hidden position-fixed top-0 start-0 w-100 h-100 bg-black-50 z-5 transition-opacity transition-duration-03 transition-timing-easeOut">
			<!-- 컨펌창 -->
			<div class="w-35 h-20 d-flex flex-column align-items-sm-center justify-content-sm-center text-center bg-white p-3 rounded-3 position-absolute top-50 start-50 translate-middle text-keepAll text-prewrap z-10 transition-all transition-duration-03 transition-timing-easeOut shadow-forAlert">
				<p id="confirmContent" class="my-4 mx-auto fs-5">컨펌창!</p>
				<div class="w-100 h-50 d-flex flex-row justify-content-sm-end align-items-sm-center mx-3 my-0">
					<button id="confirmYesBtn" class="w-10 h-25 btn d-flex justify-content-sm-end align-items-sm-center btn-primary text-center rounded-3 mx-2 py-3">Yes</button>
					<button id="confirmNoBtn" class="w-10 h-25 btn d-flex justify-content-sm-end align-items-sm-center btn-secondary rounded-3 mx-2 py-3">No</button>
				</div>
			</div>
		</div>
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
			<form action="${ pageContext.servletContext.contextPath }/frg/frgAdd_form" method="post" class="vw-100 d-flex flex-column justify-content-sm-center align-items-sm-center" onsubmit="submitBtnClicked(event)">
				<div class="settingBoxWrapper mh-5000 vw-70">
					<div id="settingBox_0" class="settingBox d-flex flex-column position-relative vw-60 vh-75 mx-auto">
						<div class="w-100 mt-3p mb-2 text-end">
							<div class="w-100 text-white">
								<i id="trashIcon_0" class="fa-solid fa-trash"></i>
							</div>
						</div>
						<div class="d-grid d-grid-col-25-75 d-grid-row-40-60 justify-content-sm-center align-items-sm-center gap-2 fs-xl fw-semibold text-white position-relative vw-60 vh-70 mx-auto">
							<div class="setting-titleBox">냉장고 모양</div>
							<div class="setting-itemBox">
								<div>
									<input type="radio" name="frg_shape_0" id="horizon_0" value="H" onclick="radioClicked(event, this.nextElementSibling)" />
									<label for="horizon_0">
										<img id="ho_0" class="ho" alt="가로형 냉장고" src="${ pageContext.servletContext.contextPath }/resources/img/hFrgLabel.svg" />
									</label>
								</div>
								<div>
									<input type="radio" name="frg_shape_0" id="vertical_0" value="V" onclick="radioClicked(event, this.nextElementSibling)" />
									<label for="vertical_0">
										<img id="ve_0" class="ve" alt="세로형 냉장고" src="${ pageContext.servletContext.contextPath }/resources/img/vFrgLabel.svg" />
									</label>
								</div>
								<div>
									<input type="radio" name="frg_shape_0" id="single_0" value="S" onclick="radioClicked(event, this.nextElementSibling)" />
									<label for="single_0">
										<img id="si_0" class="si" alt="단일형 냉장고" src="${ pageContext.servletContext.contextPath }/resources/img/sFrgLabel.svg" />
									</label>
								</div>
							</div>
							<div class="setting-titleBox">냉장고 정보</div>
							<div class="setting-itemBox">
								<div class="selected-fridge"></div>
								<div class="fridge-info">
									<div class="fridgeInfoBox">
										<div class="w-100">
											<label class="fridgeInfoLabelName" for="frg_name_0">이름</label>
											<input class="fridgeInfoInput" id="frg_name_0" name="frg_name_0" />
										</div>
										<div class="w-100">
											<label class="fridgeInfoLabelState">A</label>
											<button type="button" name="frg_Astate_0" value="cool" class="stateSelectBtn" onclick="stateBtnClicked(this, 0)">
												냉장
											</button>
											<button type="button" name="frg_Astate_0" value="frozen" class="stateSelectBtn" onclick="stateBtnClicked(this, 0)">
												냉동
											</button>
										</div>
										<div class="w-100">
											<label class="fridgeInfoLabelState">B</label>
											<button type="button" name="frg_Bstate_0" value="cool" class="stateSelectBtn" onclick="stateBtnClicked(this, 0)">
												냉장
											</button>
											<button type="button" name="frg_Bstate_0" value="frozen" class="stateSelectBtn" onclick="stateBtnClicked(this, 0)">
												냉동
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr class="horizontalLine" />
				<div class="btns">
					<button type="button" class="button" onclick="plusBtnClicked()" title="냉장고 하나 더 추가하기">
						<i class="fa-solid fa-plus"></i>
					</button>
					<button type="submit" class="button" title="냉장고 등록 완료하기">완료</button>
				</div>
			</form>
		</div>
    </header>
  </body>
</html>
