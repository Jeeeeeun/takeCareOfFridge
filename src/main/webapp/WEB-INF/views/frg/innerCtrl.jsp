<%@page import="com.frg.domain.InnerDTO"%>
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
<!-- <link rel="stylesheet" href="../resources/css/navBar.css"> -->
<!-- <link rel="stylesheet" href="../resources/css/descriptionAndTraffic.css"> -->
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
<%-- <script src="${pageContext.servletContext.contextPath}/resources/js/innerFoodCtrl.js">
</script> --%>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
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
            const in_state = row.querySelector("td:nth-child(5)").innerText;
            if (in_state === state) {
                row.style.display = "table-row";
            } else {
                row.style.display = "none";
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // 페이지 로드 시, 전체 버튼에 selected 클래스 추가
    document.getElementById("all").classList.add("selected");
    // 나머지 버튼들에는 selected 클래스 제거
    document.getElementById("cool").classList.remove("selected");
    document.getElementById("frozen").classList.remove("selected");
    
    const urlParams = new URLSearchParams(window.location.search);
    const frgNameParam = urlParams.get("frgName");

    // 냉장고 인풋에 냉장고 이름 파라미터 값을 설정합니다.
    document.getElementById('detailInfoItemBox_frg_name').value = frgNameParam;    
    
    $.ajax({
        url: `${pageContext.servletContext.contextPath}/frg/innerCtrl/trafficStandard`,
        type: "GET",
        dataType: "json",
        success: function (data) {
            // 데이터를 JSON 객체로 정상적으로 받았을 때의 처리 로직
            const dangerous = data[0].dangerous_standard;
            const warning = data[0].warning_standard;

            // 각 행의 circleColor를 설정
            const circleColors = document.getElementsByClassName("circleColor");
            for (let i = 0; i < circleColors.length; i++) {
                const d_day = parseInt(circleColors[i].getAttribute("ddayData")); // 행의 d_day 값
                const circle = circleColors[i];
                circle.classList.remove("red_circle", "y_circle", "green_circle"); // 이전에 추가된 클래스 모두 제거

                if (dangerous < d_day) {
                    circle.classList.add("red_circle");
                } else if (dangerous >= d_day && d_day > warning) {
                    circle.classList.add("yellow_circle");
                } else {
                    circle.classList.add("green_circle");
                }
            }
        },
        error: function () {
            // 에러 발생 시의 코드
            console.error('Failed to get food info from the server.');
        }
    });
    
});

//수정버튼
function updateBtnClicked() {
    // 읽기 전용으로 설정되지 않은 입력 필드들을 읽기 전용으로 변경
    document.getElementById('detailInfoItemBox_in_name').disabled= false;
    document.getElementById('detailInfoItemBox_in_company').disabled= false;
    document.getElementById('detailInfoItemBox_in_expireDate').disabled= false;
    document.getElementById('detailInfoItemBox_d_DAY').value="";
    document.getElementById('detailInfoItemBox_d_DAY').disabled= true;
    document.getElementById('detailInfoItemBox_d_DAY').placeholder="자동으로 계산됩니다";
    document.getElementById('detailInfoItemBox_in_count').disabled= false;
    document.getElementById('detailInfoItemBox_in_type').disabled= false;
    document.getElementById('coolRadio').disabled=false;
    document.getElementById('frozenRadio').disabled=false;
    
    // 수정 버튼 숨기고, 수정 완료 버튼 보이기
    document.getElementById('updateBtn').style.display = "none";
    document.getElementById('updateEndBtn').style.display = "block";
    document.getElementById('deleteBtn').style.display = "none";
}

//수정완료버튼
function updateEndBtnClicked() {
    // 읽기 전용으로 변경된 입력 필드들을 다시 수정 가능으로 변경
    document.getElementById('detailInfoItemBox_in_name').disabled= true;
    document.getElementById('detailInfoItemBox_in_company').disabled= true;
    document.getElementById('detailInfoItemBox_in_expireDate').disabled= true;
    let insertedDdayValue = document.getElementById('detailInfoItemBox_in_expireDate').value;
    document.getElementById('detailInfoItemBox_d_DAY').disabled= true;
    document.getElementById('detailInfoItemBox_in_count').disabled= true;
    document.getElementById('detailInfoItemBox_in_type').disabled= true;
    document.getElementById('coolRadio').disabled=true;
    document.getElementById('frozenRadio').disabled=true;
    
    //현재 날짜와 insertedDdayValue간의 일수 차이 계산하기
    function calculateDateDifference(insertedDdayValue){
    	
    	const currentDate = new Date();
    	const expireDate = new Date(insertedDdayValue);
 
    	//시간 차이를 밀리초 단위로 계산하고 일(day)로 변환하여 소수점 아래 버림
    	const daysDifference = Math.floor((expireDate-currentDate)/(24*60*60*1000));
    
    	return daysDifference;
    }
    
    document.getElementById('detailInfoItemBox_d_DAY').value = calculateDateDifference(insertedDdayValue);
    
    // 수정 완료 버튼 숨기고, 수정 버튼 보이기
    document.getElementById('updateEndBtn').style.display = "none";
    document.getElementById('updateBtn').style.display = "block";
    document.getElementById('deleteBtn').style.display = "block";
}

function handleRowClick(in_name, in_expireDate, d_DAY, in_state) {
	
    document.getElementById('detailInfoItemBox_in_name').value = in_name;
    document.getElementById('detailInfoItemBox_d_DAY').value = d_DAY;
	
	function convertDateFormat(in_expireDate) {
		
		  const months = {
		    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
		    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
		  };

		  // 주어진 날짜 문자열을 공백(' ')을 기준으로 나누어 배열로 만드는 역할
		  const parts = in_expireDate.split(' ');
		  // parts를 적용한 출력 예시 : ["Sun", "Jul", "02", "09:00:00", "KST", "2023"]

		  const year = parts[5];
		  const month = months[parts[1]];
		  const day = parts[2];
		  
		  // 원하는 형태로 만들어줌
		  const parsedExpireDate = year+"-"+month+"-"+day;

		  return parsedExpireDate;
	}
	
	let testExpireDate = convertDateFormat(in_expireDate);
	document.getElementById('detailInfoItemBox_in_expireDate').value=testExpireDate;
	
    var coolRadio = document.getElementById('coolRadio');
    var frozenRadio = document.getElementById('frozenRadio');

    if (in_state === "cool") {
        coolRadio.checked = true;
        frozenRadio.checked = false;
    } else if (in_state === "frozen") {
        coolRadio.checked = false;
        frozenRadio.checked = true;
    }
    
    const frgName=document.getElementById('detailInfoItemBox_frg_name').value;
    
    const requestData = {
            in_name: in_name,
            frgName: frgName
        };
    
    $.ajax({
        url: `${pageContext.servletContext.contextPath}/frg/innerCtrl/getInnerData`,
        type: "POST",
        data: requestData,
	    dataType: "json",
        success: function(requestData,textStatus) {
        	const in_count = requestData[0].in_count;
        	document.getElementById('detailInfoItemBox_in_count').value = in_count;
        	const in_company = requestData[0].in_company;
        	document.getElementById('detailInfoItemBox_in_company').value = in_company;
        	const in_type = requestData[0].in_type;
        	document.getElementById('detailInfoItemBox_in_type').value = in_type;
        	const in_index = requestData[0].in_index;
        },
        error: function() {
            // 에러 발생 시의 코드
            console.error('Failed to get food info from the server.');
        }
    });
	return false;
}

function deleteBtnClick() {
    if (confirm("정말 삭제하시겠습니까?")) {

        const frgName = document.getElementById('detailInfoItemBox_frg_name').value;
        const in_name = document.getElementById('detailInfoItemBox_in_name').value;

        const requestData = {
            in_name: in_name,
            frgName: frgName
        };

        $.ajax({
            url: `${pageContext.servletContext.contextPath}/frg/innerCtrl/deleteInnerData`,
            type: "POST",
            data: requestData,
            dataType: "json",
            success: function (response) {
                if (response.success) {
                    alert("삭제 완료");
                    location.reload(); // 페이지 새로고침
                } else {
                    alert("삭제 실패: " + response.message);
                }
            },
            error: function (err) {
                alert("삭제 실패: 서버 내부 오류가 발생했습니다.");
            }
        });
    } else {
    	return;
    }

    return false; 
}

</script>
<style>
/* 셀렉터:hover { 스타일; } */
.foodTable tbody tr:hover {
	background-color: #e0e0e0; /* 배경색 변경 */
	cursor: pointer; /* 커서 모양 변경 */
}

.red_circle {
	width: 15px;
	height: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	background-color: red;
	border-radius: 50%;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.yellow_circle {
	width: 15px;
	height: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	background-color: yellow;
	border-radius: 50%;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.green_circle {
	width: 15px;
	height: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	background-color: #03c03c;
	border-radius: 50%;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.black_circle {
	width: 15px;
	height: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	background-color: black;
	border-radius: 50%;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
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
		<nav>
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
			</div>
		</nav>
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
									style="width: 100px; text-align: center; border: 1px solid #ccc; position: sticky; top: 0; background-color: #f9f9f9;"><span class="black_circle"></span></th>
								<th
									style="width: 300px; text-align: center; border: 1px solid #ccc; position: sticky; top: 0; background-color: #f9f9f9;">식품명</th>
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
									onclick="handleRowClick('${item.in_name}', '${item.in_expireDate}', '${item.d_DAY}', '${item.in_state}')	;">
									<td><span class="circleColor" ddayData="${item.d_DAY}"></span></td>
									<td style="text-align: center;">${item.in_name}</td>
									<td style="text-align: center;"><fmt:formatDate
											value="${item.in_expireDate}" pattern="yyyy-MM-dd" /></td>
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
					action="<%=request.getContextPath()%>/innerFoodCtrl" method="post"
					onsubmit="return false;">
					<div class="detailInfoItemBox">
						<label for="">보관 냉장고</label><input name="frgName"
							id="detailInfoItemBox_frg_name" type="text"
							class="detailInputBox" disabled>
					</div>

					<div class="detailInfoItemBox">
						<label for="">식품명</label> <input id="detailInfoItemBox_in_name"
							type="text" class="detailInputBox" disabled>
					</div>

					<div class="detailInfoItemBox"
						style="display: flex; justify-content: center;">
						<label for="">보관상태</label> <input name="in_state" id="coolRadio"
							type="radio" class="detailInputBox" value="cool"
							style="width: 10%" disabled>냉장 <input name="in_state"
							id="frozenRadio" type="radio" class="detailInputBox"
							value="frozen" style="width: 10%" disabled>냉동
					</div>
					<div class="detailInfoItemBox">
						<label id="">제조사명</label> <input id="detailInfoItemBox_in_company"
							type="text" class="detailInputBox" disabled>
					</div>
					<div class="detailInfoItemBox">
						<label for="">유통/<br>소비기한
						</label>
						<div>
							<input id="detailInfoItemBox_in_expireDate" type="date"
								class="detailInputBox" style="height: 30%;" disabled>
						</div>
					</div>
					<div class="detailInfoItemBox">
						<label for="">D-Day</label> <input id="detailInfoItemBox_d_DAY"
							type="number" class="detailInputBox" disabled>
					</div>
					<div class="detailInfoItemBox">
						<label id="">수량</label> <input id="detailInfoItemBox_in_count"
							type="text" class="detailInputBox" disabled>
					</div>
					<div class="detailInfoItemBox">
						<label id="">식품 유형</label><input id="detailInfoItemBox_in_type"
							type="text" class="detailInputBox" disabled>
					</div>
					<div class="detailInfoBtnBox"
						style="position: relative; top: 550%;">
						<div
							style="position: relative; display: flex; justify-content: center; align-items: center;">

							<button class="ctrlBtn" id="updateBtn"
								onclick="updateBtnClicked();">수정</button>
							<button class="ctrlBtn" id="deleteBtn"
								onclick="deleteBtnClick();">삭제</button>
						</div>
						<div
							style="position: relative; display: flex; justify-content: center; align-items: center;">
							<button class="ctrlBtn" id="updateEndBtn"
								onclick="updateEndBtnClicked()" style="display: none;">수정
								완료</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</header>
</body>
</html>