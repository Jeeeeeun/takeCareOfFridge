<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Register Your Fridge Here.</title>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
	crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="${ pageContext.servletContext.contextPath }/resources/css/frgAdd_form.css"/>
<script>
	const contextPath = "${pageContext.servletContext.contextPath}";
</script>
<script src="https://code.jquery.com/jquery-3.7.0.min.js"
	integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g="
	crossorigin="anonymous"></script>
<script
	src="${ pageContext.servletContext.contextPath }/resources/js/frgAdd_form.js"></script>
</head>
<body>
	<%
	String sessRole = (String) session.getAttribute("SESS_ROLE");
	if (sessRole != null && sessRole.equals("Y")) {
	%>
		<ul>
			<li><a
				href="${ pageContext.servletContext.contextPath }/frg/frgAdd">MyFridge</a></li>
			<li><a href="${ pageContext.servletContext.contextPath }/">Community</a></li>
		</ul>
		<ul>
			<li><a href="${ pageContext.servletContext.contextPath }/frg/logout">Logout</a></li>
			<li><a href="${ pageContext.servletContext.contextPath }/frg/myPage"><i class="fa-solid fa-circle-user"></i></a></li>
		</ul>
	<%
	} else {
	%>
		<ul>
			<li><a
				href="${ pageContext.servletContext.contextPath }/frg/frgAdd">MyFridge</a></li>
			<li><a href="${ pageContext.servletContext.contextPath }/community/show">Community</a></li>
		</ul>
		<ul>
			<li><a href="${ pageContext.servletContext.contextPath }/logout">Logout</a></li>
			<li><a href="${ pageContext.servletContext.contextPath }/"><i class="fa-solid fa-circle-user"></i></a></li>
		</ul>
	<%
	}
	%>
	<form action="${ pageContext.servletContext.contextPath }/frg/frgAdd_form" method="post" class="settingBoxContainer" onsubmit="submitBtnClicked(event)">
		<div class="settingBoxWrapper">
			<div class="settingBox">
				<div class="setting-titleBox">냉장고 모양</div>
				<div class="setting-itemBox">
					<input type="radio" name="frg_shape_0" id="horizon_0" value="H" onclick="radioClicked(event, this.nextElementSibling)">
					<label for="horizon_0">
						<img id="ho_0" class="ho" src="${ pageContext.servletContext.contextPath }/resources/img/hFrgLabel.svg" alt="가로형 냉장고" />
					</label>
					
					<input type="radio" name="frg_shape_0" id="vertical_0" value="V" onclick="radioClicked(event, this.nextElementSibling)">
					<label for="vertical_0">
						<img id="ve_0" class="ve" src="${ pageContext.servletContext.contextPath }/resources/img/vFrgLabel.svg" alt="세로형 냉장고" />
					</label>
					
					<input type="radio" name="frg_shape_0" id="single_0" value="S" onclick="radioClicked(event, this.nextElementSibling)">
					<label for="single_0">
						<img id="si_0" class="si" src="${ pageContext.servletContext.contextPath }/resources/img/sFrgLabel.svg" alt="단일형 냉장고">
					</label>
				</div>
				<div class="setting-titleBox">냉장고 정보</div>
				<div class="setting-itemBox">
					<div class="selected-fridge"></div>
					<div class="fridge-info">
						<div class="fridgeInfoBox">
							<label class="fridgeInfoLabelName" for="frg_name_0" style="margin-top: 33px;">이름</label>
								<input class="fridgeInfoInput" id="frg_name_0" name="frg_name_0" required/><br>
							<label class="fridgeInfoLabelState">A</label>
								<button type="button" name="frg_Astate_0" value="cool" class="stateSelectBtn" onclick="stateBtnClicked(this, 0)">냉장</button>
								<button type="button" name="frg_Astate_0" value="frozen" class="stateSelectBtn" onclick="stateBtnClicked(this, 0)">냉동</button><br>
							<label class="fridgeInfoLabelState">B</label>
								<button type="button" name="frg_Bstate_0" value="cool" class="stateSelectBtn" onclick="stateBtnClicked(this, 0)">냉장</button>
								<button type="button" name="frg_Bstate_0" value="frozen" class="stateSelectBtn" onclick="stateBtnClicked(this, 0)">냉동</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<hr class="horizontalLine">
		<div class="btns">
			<button type="button" class="btn" onclick="plusBtnClicked()">
				<i class="fa-solid fa-plus"></i>
			</button>
			<button type="submit" class="btn">완료</button>
		</div>
	</form>
</body>
</html>