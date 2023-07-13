<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="UTF-8">
<link rel="stylesheet"
	href="${pageContext.servletContext.contextPath }/css/navBar.css">
<link rel="stylesheet"
	href="${pageContext.servletContext.contextPath }/css/descriptionAndTraffic.css">
<link rel="stylesheet"
	href="${pageContext.servletContext.contextPath }/css/innerFoodCtrl.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
	crossorigin="anonymous" referrerpolicy="no-referrer" />
<title>식품 정보 조회</title>
<script src="${pageContext.servletContext.contextPath }/js/innerFoodCtrl.js"></script>
<script type="text/javascript">
	window.contextPath = '${pageContext.servletContext.contextPath}';
	var oneFoodDetail = '${oneFoodDetail}';
	var listAll = '${listAll}';
	var frgNameJson = '${frgNameJson}';
</script>
</head>

<body>
	<div class="navBarWithTrfLight">
		<a href="<%=request.getContextPath()%>/index"><button
				class="homeWithTrf"></button></a>
		<ul class="menu left">
			<li><a href="<%=request.getContextPath()%>/frgListAdd">MyFridge</a></li>
			<li><a href="<%=request.getContextPath()%>/boardAll">Community</a></li>
		</ul>
		<ul class="menu right">
			<li><a href="<%=request.getContextPath()%>/logout">Logout</a></li>
			<li><a href="<%=request.getContextPath()%>/myPage"> <i
					class="fa-solid fa-circle-user myPage"></i>
			</a></li>
		</ul>
		<div class="descriptionAndTraffic">
			<p class="title">식품을 조회하세요</p>
			<div class="trafficLight">
				<p id="red">${empty request.getAttribute("countRed") ? 0 : request.getAttribute("countRed")}</p>
				<p id="yellow">${empty request.getAttribute("countYellow") ? 0 :
						request.getAttribute("countYellow")}</p>
				<p id="green">${empty request.getAttribute("countGreen") ? 0 :
						request.getAttribute("countGreen")}</p>
			</div>
		</div>
	</div>
	<div id="contents">
		<div class="currentStateBox">
			<div style="display: flex; flex-direction: column;">
				<label for="currentFrg" class="dropBoxLabel">현재 냉장고</label>
				<select name=""	id="currentFrg" class="currentFrgDropBox">
					<option value="">선택하세요.</option>
				</select>
			</div>
			<div class="centerLine"></div>
			<div class="stateBtns">
				<button class="stateBtn selected" name="show_in_state">전체</button>
				<button class="stateBtn" name="show_in_state">냉장</button>
				<button class="stateBtn" name="show_in_state">냉동</button>
			</div>
		</div>
		<div class="wholeFoodListBox">
		<button class="ctrlBtn" id="addBtn" onclick="addBtnClicked()">식품 등록</button>
		</div>
	</div>
	<div>
		<div class="detailInfoBox">
			<div class="detailInfoTitleBox">상세 보기</div>
			<form action="<%=request.getContextPath()%>/innerFoodCtrl"
				method="post">
				<div class="detailInfoItemBox">
					<label for="frg">보관 냉장고</label>
					<select id="frg" class="detailInputBox disabled">
						<option value="">선택하세요.</option>
					</select>
				</div>
				<div class="detailInfoItemBox">
					<label for="">식품명</label>
					<input id="" type="text" class="detailInputBox" disabled>
				</div>
				<div class="detailInfoItemBox" style="display: flex; justify-content: center;">
					<label for="">보관 위치</label>
					<input name="in_state" type="radio" class="detailInputBox" value="cool" style="width: 10%" disabled>냉장
					<input name="in_state" type="radio" class="detailInputBox" value="frozen" style="width: 10%" disabled>냉동
				</div>
				<div class="detailInfoItemBox">
					<label for="">제조사명</label>
					<input id="" type="text" class="detailInputBox" disabled>
				</div>
				<div class="detailInfoItemBox">
					<label for="">유통/<br>소비기한</label>
					<div>
						<input id="" type="text" class="detailInputBox" style="height: 30%; top: -1%;" disabled>
						<input id="" type="date" class="detailInputBox" style="height: 30%;" disabled>
					</div>
				</div>
				<div class="detailInfoItemBox">
					<label for="">D-Day</label>
					<input id="" type="number" class="detailInputBox" disabled>
				</div>
				<div class="detailInfoItemBox">
					<label for="">수량</label>
					<input id="" type="text" class="detailInputBox" disabled>
				</div>
				<div class="detailInfoItemBox">
					<label for="">식품 유형</label>
					<input id="" type="text" class="detailInputBox" disabled>
				</div>
				<div style="position: relative; top: 560%;">
					<div style="position: relative; display: flex; justify-content: center; align-items: center;">
						<button class="ctrlBtn" id="upBtn" onclick="updateBtnClicked()">수정</button>
						<button class="ctrlBtn" id="delBtn">삭제</button>
					</div>
					<div style="position: relative; display: flex; justify-content: center; align-items: center;">
						<button class="ctrlBtn" style="display: none; top: 10%;" id="upEndBtn">수정 완료</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</body>

</html>