<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Take Care Of My frg_add your food</title>
<link rel="stylesheet"
	href="${pageContext.servletContext.contextPath }/css/navBar.css">
<link rel="stylesheet"
	href="${pageContext.servletContext.contextPath }/css/innerFoodAdd.css">
<link rel="stylesheet"
	href="${pageContext.servletContext.contextPath }/css/descriptionAndTraffic.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
	crossorigin="anonymous" referrerpolicy="no-referrer" />
<script
	src="${pageContext.servletContext.contextPath}/js/innerFoodAdd.js"></script>
<script type="text/javascript">
	window.contextPath = '${pageContext.servletContext.contextPath}';
	var frgNameLists = '${frgNameLists}';
</script>
</head>

<body>
	<!-- 식품 등록 - foodAPI로 등록할 때 -->
	<div class="navBarWithTrfLight">
		<a href="<%=request.getContextPath()%>/index"><button
				class="homeWithTrf"></button></a>
		<%
		String sessRole = (String) session.getAttribute("SESS_ROLE");
		if (sessRole != null && sessRole.equals("Y")) {
		%>
		<ul class="menu left">
			<li><a href="<%=request.getContextPath()%>/frgListAdd">MyFridge</a></li>
			<li><a href="<%=request.getContextPath()%>/boardAll">Community</a></li>
		</ul>
		<ul class="menu right">
			<li><a href="<%=request.getContextPath()%>/logout">Logout</a></li>
			<li><a href="<%=request.getContextPath()%>/myPage"><i
					class="fa-solid fa-circle-user myPage"></i> </a></li>
		</ul>
		<%
		} else {
		%>
		<ul class="menu left">
			<li><a href="<%=request.getContextPath()%>/frgListAdd">MyFridge</a></li>
			<li><a
				href="<%=request.getContextPath()%>/frgListAdd?move=frgListAdd_B"
				onclick="showAlert();">Community</a></li>
		</ul>
		<ul class="menu right">
			<li><a href="<%=request.getContextPath()%>/logout">Logout</a></li>
			<li><a
				href="<%=request.getContextPath()%>/frgListAdd?move=frgListAdd_B"
				onclick="showAlert();"><i class="fa-solid fa-circle-user myPage"></i>
			</a></li>
		</ul>
		<script>
			function showAlert() {
				alert("냉장고 생성을 먼저 하세요!");
			}
		</script>
		<%
		}
		%>
		<div class="descriptionAndTraffic">
			<p class="title" style="margin-right: 16.5%;">냉장고 정보를 등록하세요</p>
			<div class="trafficLight">
				<p id="red">${empty request.getAttribute("countRed") ? 0 : request.getAttribute("countRed")}</p>
				<p id="yellow">${empty request.getAttribute("countYellow") ? 0 : request.getAttribute("countYellow")}</p>
				<p id="green">${empty request.getAttribute("countGreen") ? 0 : request.getAttribute("countGreen")}</p>
			</div>
		</div>
	</div>
	<form action="${ pageContext.servletContext.contextPath }/innerFoodAdd"
		method="post" class="settingBoxContainer">
		<div class="formBackground" id="settingBoxWrapper">
			<div class="settingBox">
				<div class="formBack formFridge">
					<label for="Fridge" class="labelName">냉장고</label>
					<div class="formRight">
						<select id="Fridge" style="color: #604C3F;">
							<option value="0">선택하세요</option>
						</select>
					</div>
				</div>
				<div class="formBack formState">
					<p class="labelName">보관 위치</p>
					<div class="formRight">
						<input type="radio" value="frozen" name="formState" id="cool"><label
							for="cool">냉동</label> <input type="radio" value="cool"
							name="formState" id="frozen"><label for="frozen">냉장</label>
					</div>
				</div>
				<div class="formBack formName">
					<label for="FoodName" class="labelName">식품명</label>
					<div class="formRight">
						<input type="search" class="formText" id="FoodName"
							placeholder="식품명을 검색하세요" style="color: #604C3F;" autofocus>
						<button type="submit" id="formSubmit" onclick="searchFunction();">search</button>
						<br>
						<div id="resultContainer"></div>
						<input type="checkbox" id="formFoodAddCustom"
							onclick="foodAddCustom();"><label for="formFoodAddCustom">직접
							입력하기</label>
					</div>
				</div>
				<div class="formBack formDue">
					<label for="FoodDue" class="labelName">유통/소비기한</label>
					<div class="formRight">
						<div class="formPbox formDueBox">
							<input type="text" id="formDueAuto"
								placeholder="식품 검색이 완료되면, 제조기한이 보일거에요" style="color: #604C3F;"
								readonly>
						</div>
						<hr class="horizontalLine">
						<div class="formPbox formDueBox">
							<p>( ↓ 제품에 적힌 유통기한을 입력해주세요 )</p>
							<input type="date" id="FoodDue" class="formDueCustom"
								style="color: #604C3F;">
						</div>
					</div>
				</div>
				<div class="formBack formType">
					<label for="FoodType" class="labelName">식품 유형</label>
					<div class="formRight">
						<input type="text" class="formText" id="FoodType"
							placeholder="식품 검색이 완료되면, 식품유형이 보일거에요" style="color: #604C3F;"
							readonly>
					</div>
				</div>
				<div class="formBack formCount">
					<label for="FoodCount" class="labelName">수량</label>
					<div class="formRight">
						<input type="number" class="formText" id="FoodCount" min="1"
							placeholder="수량을 등록하세요" style="color: #604C3F;">
					</div>
				</div>
				<div class="formBack formCom">
					<label for="FoodCom" class="labelName FoodComLabelName">제조사명</label>
					<div class="formRight">
						<input type="text" class="formText" id="FoodCom"
							placeholder="식품 검색이 완료되면, 제조사명이 보일거에요" style="color: #604C3F;"
							readonly>
					</div>
				</div>
			</div>
			<div id="add-settingBox"></div>
			<div>
				<!--   class="plusAndEnd" -->
				<hr class="horizontalLine2">
				<div class="btns">
					<button type="button" class="btn" onclick="plusBtnClicked();">
						<i class="fa-solid fa-plus"></i>
					</button>
					<button type="submit" class="btn" onclick="submitBtnClicked();">완료</button>
				</div>
			</div>
		</div>

	</form>
</body>

</html>
