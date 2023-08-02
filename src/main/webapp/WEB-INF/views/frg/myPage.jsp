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
<script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
<script type="text/javascript">
	window.contextPath = '${pageContext.servletContext.contextPath}';
	let frgListJson = <c:out value="${frgListJson}" escapeXml="false"/>;
	const trfStandard = <c:out value="${trfStandardJson}" escapeXml="false"/>;
</script>
<script
	src="${pageContext.servletContext.contextPath}/resources/js/myPage.js"></script>
	<script
	src="${pageContext.servletContext.contextPath}/resources/js/myPageInfo.js"></script>
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
		<div>
			<div class="myPageTitleBox1">가입 정보 확인</div>
			<div class="myPageContentBox1">
				<div class="myNameBox">
					<p>Name</p>
					<div class="nameBoxCenterLine"></div>
					<input type="text" class="userData" id="name" disabled />
				</div>
				<div class="myIDBox">
					<p>ID</p>
					<div class="idBoxCenterLine"></div>
					<input type="text" class="userData" id="id" disabled />
				</div>
				<div class="myEmailBox">
					<p>Email</p>
					<div class="emailBoxCenterLine"></div>
					<input type="email" class="userData" id="email" disabled />
					<button class="duplicateBtn" id="checkEmail" type="button" 
					style="margin-bottom: -7%; margin-left: -11%; display: none;">중복확인</button>
				</div>
				<div class="emailErrorMsg hidden" id="emailErrorMsg">
							<span></span>
				</div>
				<div class="myPwBox">
					<p>PW</p>
					<div class="pwBoxCenterLine"></div>
					<input type="password" class="userData" id="pw" title="암호화된 비밀번호" disabled />
				</div>
				<div class="myPwCheckBox">
					<p>PW Check</p>
					<div class="pwCheckBoxCenterLine"></div>
					<input type="password" class="userData" id="pwCheck" disabled />
					<div id="pwdAlert"
							style="margin-left: -85px; margin-top: 20px">
							<span></span>
					</div>
				</div>
				<button class="modifyMyInfoBtn" id="submitButton">수정하기</button>
				<button class="userDeleteBtn" id="deleteBtn">회원탈퇴</button>
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
				<div id="standardLine">
					<div class="standardLine1"></div>
					<div class="standardLine2"></div>
				</div>
				<form
					action="${pageContext.servletContext.contextPath}/frg/trfStandardChange"
					method="post" id="standardDate">
					<div id="standards-wrapper">
						<div class="dangerous-standard">
							<input type="number" id="dangerousStandard" disabled /><span
								id="dangerousSpan"></span>
						</div>
						<div class="warning-standard">
							<input type="number" id="warningStandard" disabled /><span
								id="warningSpan"></span>
						</div>
						<button type="button" id="standardChange">
							<i class="fa-solid fa-pen-to-square"
								onclick="trfStandardBtnClicked()"></i>
						</button>
					</div>
					<div>
						<button type="button" id="trfCorrectionEndBtn"
							onclick="trfCorrectionEnd()">수정 완료</button>
					</div>
				</form>
				<div id="announcement"></div>
				<hr class="myFridgeHorizonLine1">
				<div class="fridgeInfoTitleBox">냉장고 정보</div>
				<div id="frgInfoChangeBtns">
					<button type="button" id="frgInfoChange">
						<i class="fa-solid fa-pen-to-square"
							onclick="frgInfoChangeBtnClicked()"></i>
					</button>
					<button type="button" id="frgInfoChange"
						onclick="frgDiscardBtnClicked()">
						<i class="fa-solid fa-trash"></i>
					</button>
				</div>
				<div id="fridgeInfoContentBox">
					<div id="frgInfoLeft">
						<div class="fridgeShapeBox">
							<img class="frg_shape" />
						</div>
						<div id="frgNameAndBtns">
							<button id="prev" onclick="prevFrg()">
								<i class="fa-solid fa-caret-left"></i>
							</button>
							<p class="frg_name"></p>
							<button id="next" onclick="nextFrg()">
								<i class="fa-solid fa-caret-right"></i>
							</button>
						</div>
					</div>
					<form
						action="${ pageContext.servletContext.contextPath }/frg/frgInfoChange"
						method="post" id="frgInfoRight">
						<input type="hidden" id="frg_index" />
						<!-- 서버로 값을 넘기기 위해 값을 가져오기는 하지만 화면에는 필요치 않아서 숨겨놓은 데이터 -->
						<div class="fridgeName">
							냉장고 이름
							<div class="fridgeNameVerticalLine"></div>
							<input type="text" class="frg_name" disabled />
						</div>
						<div class="frg_shape">
							<b>냉장고 모양</b>
							<div class="radio_group">
								<input type="radio" name="frg_shape" id="hRadio" value="H"
									onclick="radioBtnClicked(event)" disabled /> <label
									for="hRadio">가로형</label> <input type="radio" name="frg_shape"
									id="vRadio" value="V" onclick="radioBtnClicked(event)" disabled />
								<label for="vRadio">세로형</label> <input type="radio"
									name="frg_shape" id="sRadio" value="S"
									onclick="radioBtnClicked(event)" disabled /> <label
									for="sRadio">단일형</label>
							</div>
						</div>
						<div id="myFrgAstate">
							<div id="fridgeAtitleBox">A칸 상태</div>
							<button type="button" id="frgAfrozenBtn" value="frozen"
								onclick="frgStateBtnClicked(event)" disabled>냉동</button>
							<button type="button" id="frgAcoolBtn" value="cool"
								onclick="frgStateBtnClicked(event)" disabled>냉장</button>
						</div>
						<div id="myFrgBstate">
							<div id="fridgeBtitleBox">B칸 상태</div>
							<button type="button" id="frgBfrozenBtn" value="frozen"
								onclick="frgStateBtnClicked(event)" disabled>냉동</button>
							<button type="button" id="frgBcoolBtn" value="cool"
								onclick="frgStateBtnClicked(event)" disabled>냉장</button>
						</div>
						<div>
							<button type="button" id="frgInfoCorrectionEndBtn"
								onclick="frgCorrectionEnd()">수정 완료</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</header>
</body>
</html>