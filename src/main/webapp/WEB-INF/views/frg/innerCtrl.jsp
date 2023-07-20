<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<link rel="stylesheet" href="../resources/css/navBar.css">
<link rel="stylesheet" href="../resources/css/descriptionAndTraffic.css">
<link rel="stylesheet" href="../resources/css/innerCtrl.css">
<title>innerCtrl Page</title>
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

<title>식품 정보 조회</title>
<script
	src="${pageContext.servletContext.contextPath }/resources/js/innerFoodCtrl.js"></script>

<script type="text/javascript">
	function addBtnClicked() {
		window.location.href = "${pageContext.servletContext.contextPath}/frg/innerAdd";
	}

	function changeFrg(frgName, url) {
		location.href = url + "?frgName=" + frgName;
	}

	function stateOk(id) {
		if (id === "all") {
			console.log("전체");
		} else if (id === "cool") {
			console.log("냉장");
		} else if (id === "frozen") {
			console.log("냉동");
		} else {
			console.log("알 수 없는 상태");
		}
	}

	function handleRowClick(in_name, in_expireDate_custom, d_DAY, in_state) {
		console.log("Clicked data:");
		console.log("제품명: " + in_name);
		console.log("유통기한: " + in_expireDate_custom);
		console.log("D-day: " + d_DAY);
		console.log("보관위치: " + in_state);
	}
</script>
<style>
/* 셀렉터:hover { 스타일; } */
.foodTable tbody tr:hover {
	background-color: #e0e0e0; /* 배경색 변경 */
	cursor: pointer; /* 커서 모양 변경 */
}
</style>
</head>
<body id="page-top">
	<header class="masthead">
		<nav class="navbar navbar-expand-lg navbar-light fixed-top py-3"
			id="mainNav">
			<div class="container px-4 px-lg-5">
				<a class="navbar-brand"
					href="<%=request.getContextPath()%>/frg/index">TakeCareOfFridge</a>
				<button class="navbar-toggler navbar-toggler-right" type="button"
					data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
					aria-controls="navbarResponsive" aria-expanded="false"
					aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<ul class="navbar-nav ms-auto my-2 my-lg-0">
					<li class="nav-item"><a class="nav-link"
						href="<%=request.getContextPath()%>/frg/frgShow">MyFridge</a></li>
					<li class="nav-item"><a class="nav-link"
						href="<%=request.getContextPath()%>/comm/board">Community</a></li>
					<li class="nav-item"><a class="nav-link"
						href="<%=request.getContextPath()%>/frg/logout">Logout</a></li>
					<li class="nav-item"><a class="nav-link"
						href="<%=request.getContextPath()%>/frg/myPage"><i
							class="fa-solid fa-circle-user"></i></a></li>
				</ul>
			</div>
		</nav>
		<div class="descriptionAndTraffic">
			<div class="trafficLight">
				<p id="red">${trafficLight[0].red}</p>
				<p id="yellow">${trafficLight[0].yellow}</p>
				<p id="green">${trafficLight[0].green}</p>
			</div>
		</div>
		<div id="contents">
			<div class="currentStateBox">
				<div style="display: flex; flex-direction: column;">
					<label>냉장고 선택:</label> <select name="frgList" id="frgSelect"
						onchange="changeFrg(this.value,'${pageContext.servletContext.contextPath}/frg/innerCtrl');">
						<option value="all">전체</option>
						<c:forEach var="name" items="${frgNames}">
							<option value="${name}"
								<c:if test="${ frgName eq name }">selected</c:if>>
								${name}</option>
						</c:forEach>
					</select>
				</div>
				<div class="centerLine"></div>
				<div class="stateBtns" id="stateIn">
					<button id="all" name="show_in_state" onclick="stateOk(this.id);">전체</button>
					<button id="cool" name="show_in_state" onclick="stateOk(this.id);">냉장</button>
					<button id="frozen" name="show_in_state"
						onclick="stateOk(this.id);">냉동</button>
				</div>
			</div>
			<div class="wholeFoodListBox">
				<div class="tableContainer"
					style="max-height: 400px; overflow-y: scroll; margin-left: 20px;">
					<table id="foodTable" class="foodTable">
						<thead>
							<tr>
								<th
									style="width: 300px; text-align: center; border: 1px solid #ccc; position: sticky; top: 0; background-color: #f9f9f9;">제품명</th>
								<th
									style="width: 550px; text-align: center; border: 1px solid #ccc; position: sticky; top: 0; background-color: #f9f9f9;">유통기한</th>
								<th
									style="width: 250px; text-align: center; border: 1px solid #ccc; position: sticky; top: 0; background-color: #f9f9f9;">D-day</th>
								<th
									style="width: 250px; text-align: center; border: 1px solid #ccc; position: sticky; top: 0; background-color: #f9f9f9;">보관상태</th>
							</tr>
						</thead>
						<tbody>
							<c:forEach var="item" items="${dataList}">
								<tr
									onclick="handleRowClick('${item.in_name}', '${item.in_expireDate_custom}', '${item.d_DAY}', '${item.in_state}')">
									<td style="text-align: center;">${item.in_name}</td>
									<td style="text-align: center;"><fmt:formatDate
											value="${item.in_expireDate_custom}" pattern="yyyy년 MM월 dd일" />
									</td>
									<td style="text-align: center;">${item.d_DAY}</td>
									<td style="text-align: center;">${item.in_state}</td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<button class="ctrlBtn" id="addBtn" onclick="addBtnClicked()">식품
			등록</button>
		<div>
			<div class="detailInfoBox">
				<div class="detailInfoTitleBox">상세 보기</div>
				<form action="<%=request.getContextPath()%>/innerFoodCtrl"
					method="post">
					<div class="detailInfoItemBox">
						<label for="frg">보관 냉장고</label> <select id="frg"
							class="detailInputBox disabled">
							<option value="">선택하세요.</option>
						</select>
					</div>
					<div class="detailInfoItemBox">
						<label for="">식품명</label> <input id="" type="text"
							class="detailInputBox" disabled>
					</div>
					<div class="detailInfoItemBox"
						style="display: flex; justify-content: center;">
						<label for="">보관 위치</label> <input name="in_state" type="radio"
							class="detailInputBox" value="cool" style="width: 10%" disabled>냉장
						<input name="in_state" type="radio" class="detailInputBox"
							value="frozen" style="width: 10%" disabled>냉동
					</div>
					<div class="detailInfoItemBox">
						<label for="">제조사명</label> <input id="" type="text"
							class="detailInputBox" disabled>
					</div>
					<div class="detailInfoItemBox">
						<label for="">유통/<br>소비기한
						</label>
						<div>
							<input id="" type="text" class="detailInputBox"
								style="height: 30%; top: -1%;" disabled> <input id=""
								type="date" class="detailInputBox" style="height: 30%;" disabled>
						</div>
					</div>
					<div class="detailInfoItemBox">
						<label for="">D-Day</label> <input id="" type="number"
							class="detailInputBox" disabled>
					</div>
					<div class="detailInfoItemBox">
						<label for="">수량</label> <input id="" type="text"
							class="detailInputBox" disabled>
					</div>
					<div class="detailInfoItemBox">
						<label for="">식품 유형</label> <input id="" type="text"
							class="detailInputBox" disabled>
					</div>
					<div style="position: relative; top: 560%;">
						<div
							style="position: relative; display: flex; justify-content: center; align-items: center;">
							<button class="ctrlBtn" id="upBtn" onclick="updateBtnClicked()">수정</button>
							<button class="ctrlBtn" id="delBtn">삭제</button>
						</div>
						<div
							style="position: relative; display: flex; justify-content: center; align-items: center;">
							<button class="ctrlBtn" style="display: none; top: 10%;"
								id="upEndBtn">수정 완료</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</header>
</body>

</html>