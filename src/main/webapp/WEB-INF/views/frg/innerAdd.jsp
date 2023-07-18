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
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script
	src="${pageContext.servletContext.contextPath}/js/InnerFoodAdd.js">
</script> 

<body>
    <form action="${pageContext.servletContext.contextPath}/frg/innerAdd/Auto" method="post" id="actionForm">

        <div id="addForm">
            <!-- 냉장고 목록 -->
            <label>
                <select name="frgList" id="">
                <option value="">선택하세요</option>
                <c:forEach var="name" items="${frgNames}">
                    <option value="">${name}</option>                
                </c:forEach>
                </select>
            </label>
            <br>
            <!-- 보관 위치 -->
            <input type="checkbox" />냉동
            <input type="checkbox" />냉장
            <br>
            <!-- 식품명 -->
            <label>
                <input type="search"  id="searchInput" autofocus />
                <button type="submit" id="searchSubmit" onclick="searchFoodAPI();">검색하기</button>
                <br>
                <input type="checkbox" id="registerFood" onclick="changeFormAction();" />직접 입력하기
            </label>
            <br>
            <!-- 유통/소비기한 -->
            <label>
                <input type="text" id="dueDate" placeholder="유통/소비기한">
                <br>
                <input type="date">직접입력하기
            </label>
            <br>
            <!-- 식품유형 -->
            <label>
                <input type="text" placeholder="식품 유형 안내">
            </label>
            <br>
            <!-- 수량 -->
            <label>
                <input type="number" placeholder="식품 수량 등록">
            </label>
            <br>
            <!-- 제조사명 -->
            <label>
                <input type="text" placeholder="제조사명 안내" id="company">
            </label>
            <br>
            <!-- 추가, 완료 버튼 -->
            <button type="submit" onclick="addFood();">추가</button>
            <button type="submit" onclick="addFinish();">완료</button>
        </div>
        
        <div>
        	<tr>
        		<th>식품명</th>
        		<th>제조사</th>
        		<th>유통/소비기한</th>
        		<th>제품유형</th>
        	</tr>
        	<c:forEach var="" items="${ }">
        		<tr>
        			<td></td>
        			<td></td>
        			<td></td>
        			<td></td>
        		</tr>
        	</c:forEach>
        </div>
    </form>
</body>

</html>