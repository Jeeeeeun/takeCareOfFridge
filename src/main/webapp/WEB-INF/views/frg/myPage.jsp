<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="com.frg.util.SessionUtil"%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
		<meta name="description" content="" />
		<meta name="author" content="" />
		<title>myPage</title>

		<!-- Favicon-->
		<link rel="icon" type="image/x-icon" href="${ pageContext.servletContext.contextPath }/resources/img/favicon.svg" />
		
		<!-- Bootstrap Icons-->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
		
		<!-- Google fonts-->
		<link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
		<link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />
		
		<!-- SimpleLightbox plugin CSS-->
		<link href="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.css" rel="stylesheet" />
		
		<!-- Core theme CSS (includes Bootstrap)-->
		<link href="${ pageContext.servletContext.contextPath }/resources/css/styles.css" rel="stylesheet" />

		<!-- FontAwesome CDN -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

		<!-- External Custom CSS StyleSheet -->
		<link rel="stylesheet" href="${pageContext.servletContext.contextPath }/resources/css/myPage.css">

		<!-- jQuery CDN -->
		<script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>

		<!-- JavaScript global variable -->
		<script type="text/javascript">
			window.contextPath = '${pageContext.servletContext.contextPath}';
			let frgListJson = <c:out value="${frgListJson}" escapeXml="false"/>;
			const trfStandard = <c:out value="${trfStandardJson}" escapeXml="false"/>;
		</script>

		<!-- JavaScript External Links -->
		<script src="${pageContext.servletContext.contextPath}/resources/js/alertAndConfirm.js"></script>
		<script src="${pageContext.servletContext.contextPath}/resources/js/myPage.js"></script>
		<script src="${pageContext.servletContext.contextPath}/resources/js/myPageInfo.js"></script>
	</head>
	<body>
		<header class="masthead  overflowX-hidden">
			<nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
				<div class="container px-4 px-lg-5">
					<a class="navbar-brand" href="${ pageContext.servletContext.contextPath }/frg/index">
						TakeCareOfFridge
					</a>
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
						<button id="confirmYesBtn" class="w-10 h-25 btn d-flex justify-content-sm-end align-items-sm-center btn-primary text-center rounded-3 mx-2 py-3">
							Yes
						</button>
						<button id="confirmNoBtn" class="w-10 h-25 btn d-flex justify-content-sm-end align-items-sm-center btn-secondary rounded-3 mx-2 py-3">
							No
						</button>
					</div>
				</div>
			</div>
			<div class="vw-95 h-100 d-grid d-grid-row-09-90 d-grid-col-30-70 gap-3 mx-auto">
				<div class="d-grid grid-row-1-1 grid-col-1-1 justify-content-sm-center align-items-sm-center rounded-4 bg-white-30 text-white text-center fw-bold">가입 정보 확인</div>
				<div class="vh-80 d-grid grid-row-2-10 grid-col-1-1 rounded-4 bg-white-30 align-items-sm-start">
					<div class="w-95 h-50 d-flex flex-row align-items-sm-center rounded-4 bg-white-30 z-1 text-black fs-6 mx-auto my-2">
						<p class="w-25 h-100 d-flex align-items-sm-center text-center fw-semibold mx-2 my-0">Name</p>
						<div class="w-0 h-60 border-05 border-white border-solid d-flex align-items-sm-center position-relative z-2"></div>
						<input type="text" class="userData h-100 border-none bg-transparent position-relative ms-4" id="name" disabled />
					</div>
					<div class="w-95 h-50 d-flex flex-row align-items-sm-center rounded-4 bg-white-30 z-1 text-black fs-6 mx-auto my-2">
						<p class="w-25 h-100 d-flex align-items-sm-center text-center fw-semibold mx-2 my-0">ID</p>
						<div class="w-0 h-60 border-05 border-white border-solid d-flex align-items-sm-center position-relative z-2"></div>
						<input type="text" class="userData h-100 border-none bg-transparent position-relative ms-4" id="id" disabled />
					</div>
					<div class="w-95 h-50 d-flex flex-row align-items-sm-center rounded-4 bg-white-30 z-1 text-black fs-6 mx-auto my-2">
						<p class="w-25 h-100 d-flex align-items-sm-center text-center fw-semibold mx-2 my-0">Email</p>
						<div class="w-0 h-60 border-05 border-white border-solid d-flex align-items-sm-center position-relative z-2"></div>
						<input type="email" class="userData h-100 border-none bg-transparent position-relative ms-4" id="email" disabled />
						<button class="duplicateBtn rounded-4 bg-white-30" id="checkEmail" type="button" style="width: 25%; height: 50%; font-size: 80%; text-align: center; align-items: center; margin-right: 3%; display: none;">
							중복확인
						</button>
					</div>
					<div class="emailErrorMsg hidden" id="emailErrorMsg">
						<span></span>
					</div>
					<div class="w-95 h-50 d-flex flex-row align-items-sm-center rounded-4 bg-white-30 z-1 text-black fs-6 mx-auto my-2">
						<p class="w-25 h-100 d-flex align-items-sm-center text-center fw-semibold mx-2 my-0">PW</p>
						<div class="w-0 h-60 border-05 border-white border-solid d-flex align-items-sm-center position-relative z-2"></div>
						<input type="password" class="userData h-100 border-none bg-transparent position-relative ms-4" id="pw" title="암호화된 비밀번호" disabled />
					</div>
					<div class="w-95 h-50 flex-row align-items-sm-center rounded-4 bg-white-30 z-1 text-black fs-6 mx-auto my-2" id="pwCheck" style="display: none;">
						<p class="w-25 h-100 d-flex align-items-sm-center text-center fw-semibold mx-2 my-0">PW Check</p>
						<div class="w-0 h-60 border-05 border-white border-solid d-flex align-items-sm-center position-relative z-2"></div>
						<input type="password" class="userData h-100 border-none bg-transparent position-relative ms-4" id="pwCheck" disabled />
						<div id="pwdAlert" style="margin-left: -85px; margin-top: 20px">
							<span></span>
						</div>
					</div>
					<button class="modifyMyInfoBtn w-20 h-50 d-flex justify-content-sm-center align-items-sm-center bg-white-30 position-relative rounded-4 text-black fs-7 mx-auto" id="submitButton">수정하기</button>
					<button class="userDeleteBtn d-flex justify-content-sm-center align-items-sm-center position-relative border-none bg-transparent rounded-4 text-black fs-7 z-1" id="deleteBtn">회원탈퇴</button>
				</div>


				<div class="d-grid grid-col-2-1 grid-row-1-1 justify-content-sm-center align-items-sm-center rounded-4 bg-white-30 text-white text-center fw-bold">
					나의 냉장고 보기
				</div>
				<div class="vh-80 d-grid grid-col-2-1 grid-row-2-10 rounded-4 bg-white-30">
					<div class="w-100 h-100 d-grid d-grid-row-09-90 d-grid-col-50-50 gap-3 mx-auto">
						<div class="w-100 d-grid grid-col-1-1 grid-row-1-1">
							<div class="w-95 h-50 d-flex flex-row justify-content-sm-between align-items-sm-center rounded-4 bg-white-30 z-1 text-black fw-semibold fs-6 ps-3 mx-auto my-2">
								<span>현재 나의 냉장고 상태</span>
								<button type="button" id="standardChange" class="d-flex bg-transparent border-none align-items-sm-center text-black me-4 z-3">
									<i class="fa-solid fa-pen-to-square" onclick="trfStandardBtnClicked()"></i>
								</button>
							</div>
						</div>
						<div class="w-100 d-grid grid-col-1-1 grid-row-2-10">
							<div class="w-95 h-100 d-flex flex-column mx-auto my-3">
								<div id="announcement" class="w-100 h-8 position-relative top-mi5"></div>
								<form action="${pageContext.servletContext.contextPath}/frg/trfStandardChange" method="post" id="standardDate" class="w-100 h-90 d-flex flex-column">
									<div class="w-100 h-35 d-flex flex-row position-relative top-mi5"> <!-- 신호등과 신호등 정보 -->
										<div class="w-30 h-100 d-flex flex-column justify-content-sm-around align-items-sm-center bg-white-30 position-relative rounded-4">
											<div class="myRedLight width-10 height-10 d-flex justify-content-sm-center position-relative rounded-circle my-1">
												<span class="d-flex align-items-sm-center text-white fa-solid">
													${trafficLight[0].red}
												</span>
											</div>
											<div class="myYellowLight width-10 height-10 d-flex justify-content-sm-center position-relative rounded-circle my-1">
												<span class="d-flex align-items-sm-center text-white fa-solid">
													${trafficLight[0].yellow}
												</span>
											</div>
											<div class="myGreenLight width-10 height-10 d-flex justify-content-sm-center position-relative rounded-circle my-1">
												<span class="d-flex align-items-sm-center text-white fa-solid">
													${trafficLight[0].green}
												</span>
											</div>
										</div>
										<div class="w-20 h-45 border-top-3-dashed border-bottom-3-dashed position-relative start-mi5 my-auto"></div>
										<div class="w-70 h-100 d-flex flex-row justify-content-sm-evenly">
											<div id="standards-wrapper" class="w-100 d-flex flex-column justify-content-sm-around align-items-sm-center">
												<div class="dangerous-standard d-flex flex-row mt-3 position-relative start-mi10">
													<input type="number" id="dangerousStandard" class="w-25 position-relative border-none bg-transparent text-end text-black z-2" disabled />
													<span id="dangerousSpan" class="position-relative bg-transparent text-black"></span>
												</div>
												<div class="warning-standard d-flex flex-row mb-3 position-relative start-mi10">
													<input type="number" id="warningStandard" class="w-25 position-relative border-none bg-transparent text-end text-black z-2" disabled />
													<span id="warningSpan" class="position-relative bg-transparent text-black"></span>
												</div>
											</div>
										</div>
									</div>
									<div class="w-100 h-10 d-flex flex-row justify-content-sm-center align-items-sm-center position-relative top-mi5"><!-- 수정완료 버튼 -->
										<button type="button" id="trfCorrectionEndBtn" class="w-30 h-50 hidden bg-white-30 border-none text-black justify-content-sm-center align-items-sm-center position-relative bg-white-30 fw-semibold rounded-4 p-2 mt-2" onclick="trfCorrectionEnd()">
											수정 완료
										</button>
									</div>
								</form>
							</div>
						</div>


						<div class="d-grid grid-col-2-1 grid-row-1-1">
							<div class="w-95 h-50 d-flex flex-row justify-content-sm-between align-items-sm-center rounded-4 bg-white-30 z-1 text-black fw-semibold fs-6 ps-3 mx-auto my-2">
								<span>냉장고 정보</span>
								<div id="frgInfoChangeBtns" class="d-flex flex-row me-4">
									<button type="button" id="frgInfoChange" class="d-flex align-items-sm-center text-black bg-transparent border-none mx-1 z-3" onclick="frgInfoChangeBtnClicked()">
										<i class="fa-solid fa-pen-to-square"></i>
									</button>
									<button type="button" id="frgInfoChange"  class="d-flex align-items-sm-center text-black bg-transparent border-none mx-1 z-3" onclick="frgDiscardBtnClicked()">
										<i class="fa-solid fa-trash"></i>
									</button>
								</div>
							</div>
						</div>

						<div class="d-grid grid-col-2-1 grid-row-2-10 w-100 h-100">
							<div id="fridgeInfoContentBox" class="d-flex flex-column justify-content-sm-center position-relative w-95 h-35 mx-auto mt-1">
								<div class="fridgeShapeBox w-100 h-55 d-flex justify-content-sm-between align-items-sm-center bg-white-30 rounded-4 position-relative rounded-4 mt-4">
								<button id="prev" class="bg-transparent border-none text-white ms-3 fs-5" onclick="prevFrg()">
										<i class="fa-solid fa-caret-left"></i>
									</button>
									<img class="frg_shape h-80" />
									<button id="next" class="bg-transparent border-none text-white me-3 fs-5" onclick="nextFrg()">
										<i class="fa-solid fa-caret-right"></i>
									</button>
								</div>
								<form action="${ pageContext.servletContext.contextPath }/frg/frgInfoChange" method="post" id="frgInfoRight" class="w-100 h-100 d-flex flex-column flex-grow-1 flex-basis-90 text-black bg-white-30 rounded-4 box-border-size p-2 mt-2">
									<input type="hidden" id="frg_index" /> <!-- 서버로 값을 넘기기 위해 값을 가져오기는 하지만 화면에는 필요치 않아서 숨겨놓은 데이터 -->
									<div class="fridgeName d-flex flex-row align-items-sm-center position-relative bg-white-30 fw-littlebold rounded-4 p-2 my-1">
										<b>냉장고 이름</b>
										<div class="w-0 h-60 d-flex align-items-sm-center border-solid border-white border-1 position-relative start-10 mx-3 z-2"></div>
										<input type="text" class="frg_name d-flex align-items-sm-center position-relative bg-transparent border-none" disabled />
									</div>
									<div class="frg_shape bg-white-30 rounded-4 p-2 my-1">
										<b>냉장고 모양</b><br>
										<div class="radio_group w-100 d-inline-flex justify-content-sm-around align-items-sm-center flex-wrap">
											<input type="radio" name="frg_shape" id="hRadio" value="H" class="width-5 height-5" onclick="radioBtnClicked(event)" disabled />
											<label for="hRadio">가로형</label>
									
											<input type="radio" name="frg_shape" id="vRadio" value="V" class="width-5 height-5" onclick="radioBtnClicked(event)" disabled />
											<label for="vRadio">세로형</label>
									
											<input type="radio" name="frg_shape" id="sRadio" value="S" class="width-5 height-5" onclick="radioBtnClicked(event)" disabled />
											<label for="sRadio">단일형</label>
										</div>
									</div>
									<div id="myFrgAstate" class="bg-white-30 rounded-4 d-flex justify-content-sm-between align-items-sm-center p-2 my-1">
										<div id="fridgeAtitleBox" class="w-50">A칸 상태</div>
										<div class="w-50 d-flex flex-row justify-content-sm-between align-items-sm-center">
											<button type="button" id="frgAfrozenBtn" value="frozen" onclick="frgStateBtnClicked(event)" disabled>
												냉동
											</button>
											<button type="button" id="frgAcoolBtn" value="cool" onclick="frgStateBtnClicked(event)" disabled>
												냉장
											</button>
										</div>
									</div>
									<div id="myFrgBstate" class="bg-white-30 rounded-4 d-flex justify-content-sm-between align-items-sm-center p-2 my-1">
										<div id="fridgeBtitleBox" class="w-50">B칸 상태</div>
										<div class="w-50 d-flex flex-row justify-content-sm-between align-items-sm-center">
											<button type="button" id="frgBfrozenBtn" value="frozen" onclick="frgStateBtnClicked(event)" disabled>
												냉동
											</button>
											<button type="button" id="frgBcoolBtn" value="cool" onclick="frgStateBtnClicked(event)" disabled>
												냉장
											</button>
										</div>
									</div>
									<div>
										<button type="button" id="frgInfoCorrectionEndBtn" class="bg-white-30 border-none position-relative hidden justify-content-sm-center align-items-sm-center w-40 h-60 rounded-4 fw-semibold text-black p-1 mx-auto mt-2 mb-1" onclick="frgCorrectionEnd()">
											수정 완료
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
			
						<!-- <div class="hidden">
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
				</div> -->
		</header>
	</body>
</html>