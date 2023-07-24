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
	src="${pageContext.servletContext.contextPath }/resources/js/innerFoodCtrl.js">
	</script>
<script>
window.contextPath = '${pageContext.servletContext.contextPath}';
</script>
<script type="text/javascript">
function addBtnClicked() {
    window.location.href = "${pageContext.servletContext.contextPath}/frg/innerAdd";
}

function changeFrg(frgName, url) {
    location.href = url + "?frgName=" + frgName;
}
function filterDataByState(state) {
    // 선택된 버튼을 표시하기 위해 모든 버튼에서 'selected' 클래스를 제거합니다
    var buttons = document.querySelectorAll('.stateBtn');
    buttons.forEach(function (button) {
        button.classList.remove('selected');
    });

    // 선택된 버튼에 'selected' 클래스를 추가합니다
    var selectedButton = document.getElementById(state);
    selectedButton.classList.add('selected');
    const allRows = document.querySelectorAll("#foodTable tbody tr");

    if (state === "all") {
        allRows.forEach(row => row.style.display = "table-row");
    } else {
        allRows.forEach(row => {
            const in_state = row.querySelector("td:nth-child(4)").innerText;
            if (in_state === state) {
                row.style.display = "table-row";
            } else {
                row.style.display = "none";
            }
        });
    }
}

function handleRowClick(in_name, in_expireDate_custom, d_DAY, in_state) {
    
    document.getElementById('detailInfoItemBox_in_name').value = in_name;
    document.getElementById('detailInfoItemBox_d_DAY').value = d_DAY;
    document.getElementById('detailInfoItemBox_in_expireDate_custom').value = in_expireDate_custom;

    var coolRadio = document.getElementById('coolRadio');
    var frozenRadio = document.getElementById('frozenRadio');

    if (in_state === "cool") {
        coolRadio.checked = true;
        frozenRadio.checked = false;
    } else if (in_state === "frozen") {
        coolRadio.checked = false;
        frozenRadio.checked = true;
    }
}

document.getElementById("all").classList.toggle("selected", state === "all");
document.getElementById("cool").classList.toggle("selected", state === "cool");
document.getElementById("frozen").classList.toggle("selected", state === "frozen");

document.addEventListener("DOMContentLoaded", function () {
    // 페이지 로드 시, 전체 버튼에 selected 클래스 추가
    document.getElementById("all").classList.add("selected");

    // 나머지 버튼들에는 selected 클래스 제거
    document.getElementById("cool").classList.remove("selected");
    document.getElementById("frozen").classList.remove("selected");
});
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
				<div class="stateBtns" id="stateIn">
					<button id="all" name="show_in_state"
						onclick="filterDataByState('all');" class="stateBtn">전체</button>
					<button id="cool" name="show_in_state"
						onclick="filterDataByState('cool');" class="stateBtn">냉장</button>
					<button id="frozen" name="show_in_state"
						onclick="filterDataByState('frozen');" class="stateBtn">냉동</button>
				</div>
				<div>
					<button class="stateBtn" onclick="addBtnClicked()">식품 등록</button>
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
									onclick="handleRowClick('${item.in_name}', '${item.in_expireDate_custom}', '${item.d_DAY}', '${item.in_state}')	;">
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
		<div>
			<div class="detailInfoBox">
				<div class="detailInfoTitleBox">상세 보기</div>
				<form id="detailForm"
					action="<%=request.getContextPath()%>/innerFoodCtrl" method="post">
					<div class="detailInfoItemBox">
						<label for="frg">보관 냉장고</label> <select name="frgList"
							id="frgSelect" class="detailInputBox disabled" disabled>
							<option value="${name}">${name}</option>
						</select>
					</div>
					<div class="detailInfoItemBox">
						<label for="">식품명</label> <input id="detailInfoItemBox_in_name"
							type="text" class="detailInputBox" disabled>
					</div>
					<div class="detailInfoItemBox"
						style="display: flex; justify-content: center;">
						<label for="">보관 위치</label> <input name="in_state" id="coolRadio"
							type="radio" class="detailInputBox" value="cool"
							style="width: 10%" disabled>냉장 <input name="in_state"
							id="frozenRadio" type="radio" class="detailInputBox"
							value="frozen" style="width: 10%" disabled>냉동
					</div>
					<div class="detailInfoItemBox">
						<label id="in_company" class="detailInputLabel">제조사명</label> <input
							id="detailInfoItemBox_in_company" type="text"
							class="detailInputBox" value="${innerData.in_company}" disabled>
					</div>
					<div class="detailInfoItemBox">
						<label for="">유통/<br>소비기한
						</label>
						<div>
							<input id="detailInfoItemBox_expireDate" type="text"
								class="detailInputBox" style="height: 30%;" disabled> <input
								id="detailInfoItemBox_in_expireDate_custom" type="date"
								class="detailInputBox" style="height: 30%;" disabled>
						</div>
					</div>
					<div class="detailInfoItemBox">
						<label for="">D-Day</label> <input id="detailInfoItemBox_d_DAY"
							type="number" class="detailInputBox" disabled>
					</div>
					<div class="detailInfoItemBox">
						<label id="in_count" class="detailInputLabel">수량</label> <input
							id="detailInfoItemBox_in_count" type="text"
							class="detailInputBox" value="${innerData.in_count}" disabled>
					</div>
					<div class="detailInfoItemBox">
						<label id="in_type" class="detailInputLabel">식품 유형</label><input
							id="detailInfoItemBox_in_type" type="text" class="detailInputBox"
							value="${innerData.in_type}" disabled>
					</div>
					<div style="position: relative; top: 370%;">
						<div
							style="position: relative; display: flex; justify-content: center; align-items: center;">
							<button class="ctrlBtn" id="updateBtn"
								onclick="updateBtnClicked()">수정</button>
							<button class="ctrlBtn" id="deleteBtn">삭제</button>
						</div>
						<div
							style="position: relative; display: flex; justify-content: center; align-items: center;">
							<button class="ctrlBtn" style="display: none; top: 10%;"
								id="updateEndBtn" onclick="updateEndBtnClicked()">수정 완료</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</header>
</body>
</html>