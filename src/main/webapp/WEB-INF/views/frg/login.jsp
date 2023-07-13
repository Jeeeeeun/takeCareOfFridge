<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>Login Page</title>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
	rel="stylesheet">
<script>
    var msg = '<%=request.getParameter("msg")%>
	';

	window.onload = function() {
		showMsg();
	}

	function showMsg() {
		if (msg != null && msg != 'null' && msg != '') {
			alert(msg);
		}
	}

	function verifyField() {
		let element = document.getElementById("user_id");
		let msg = '아이디를 입력하세요.';
		if (!isValid(element, msg)) {
			return false;
		}
		element = document.getElementById("user_pw");
		msg = "비밀번호를 입력하세요.";
		if (!isValid(element, msg)) {
			return false;
		}

		return true;
	}

	function isValid(element, msg) {
		let result = false;
		if (element.value == '') {
			alert(msg);
			element.focus();
			result = false;
		} else {
			result = true;
		}
		return result;
	}
</script>
</head>
<body>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
	<div class="navBar">
		<a href="<%=request.getContextPath()%>/frg/index"><button
				class="home"></button></a>
		<ul class="menu right">
			<li><a href="<%=request.getContextPath()%>/frg/signUp">SignUp</a></li>
		</ul>
	</div>
	<div class="loginBox">
		<div class="loginTitle">Login</div>
		<hr class="horizonLine">
		<form action="${ pageContext.servletContext.contextPath }/frg/login"
			method="post">
			<input type="text" id="user_id" name="user_id" class="inputBox"
				placeholder="ID"> <input type="password" id="user_pw"
				name="user_pw" class="inputBox" placeholder="PW">
			<div class="box-submit">
				<input type="submit" class="loginBtn" value="로그인하기"
					onclick="return verifyField();">
			</div>
		</form>
	</div>
</body>
</html>