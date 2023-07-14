<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">

<head>
	<title>Register your food in your refrigerator</title>
</head>
<script
	src="${pageContext.servletContext.contextPath}/js/InnerFoodAdd.js">
</script>

<body>
    <form action="${pageContext.servletContext.contextPath}/frg/innerAdd/Auto" 
    method="post">

    <!-- 냉장고 목록 -->
    <label>
        <select name="frgList" id="">
            <option value=""></option>
        </select>
    </label>

    <!-- 보관 위치 -->
    <input />
    <input />

    <!-- 식품명 -->
    <label>
        <input type="search" />
        <button type="submit"></button>
        <input type="checkbox" />
    </label>

    <!-- 유통/소비기한 -->
    <label>
        <input type="text">
        <input type="date">
    </label>

    <!-- 식품유형 -->
    <label>
        <input type="text">
    </label>

    <!-- 수량 -->
    <label>
        <input type="number">
    </label>

    <!-- 제조사명 -->
    <label>
        <input type="text">
    </label>

    <!-- 추가, 완료 버튼 -->
    <button type="submit"></button>
    <button type="submit"></button>

    </form>
</body>

</html>
