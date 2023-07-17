<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>Register your food in your refrigerator</title>
</head>
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
<script
	src="${pageContext.servletContext.contextPath}/js/InnerFoodAdd.js">
</script>
<body>
	<form
		action="${pageContext.servletContext.contextPath}/frg/innerAdd/Auto"
		method="post">

		<!-- 냉장고 목록 -->
		<label> <select name="frgNames" id="">
				<c:forEach var="name" items="${frgNames}">
				<option>${name}</option>				
				</c:forEach>
		</select>
		</label>

		<!-- 보관 위치 -->
		<input /> <input />

		<!-- 식품명 -->
		<label> <input type="search" />
			<button type="submit"></button> <input type="checkbox" />
		</label>

		<!-- 유통/소비기한 -->
		<label> <input type="text"> <input type="date">
		</label>

		<!-- 식품유형 -->
		<label> <input type="text">
		</label>

		<!-- 수량 -->
		<label> <input type="number">
		</label>

		<!-- 제조사명 -->
		<label> <input type="text">
		</label>

		<!-- 추가, 완료 버튼 -->
		<button type="submit"></button>
		<button type="submit"></button>

	</form>

</body>

</html>
