<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!-- 게시글 목록 날짜 형식 지정하려고 추가 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<title>board Page</title>

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
<link
	href="${ pageContext.servletContext.contextPath }/resources/css/styles.css"
	rel="stylesheet" />
<link rel="stylesheet"
	href="${ pageContext.servletContext.contextPath }/resources/css/board.css" />

<!-- FontAwesome CDN -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
	crossorigin="anonymous" referrerpolicy="no-referrer" />
<!-- JavaScript global variable -->
<script>
	const contextPath = "${pageContext.servletContext.contextPath}";
</script>
<!-- JavaScript External Links -->
<script
	src="${ pageContext.servletContext.contextPath }/resources/js/board.js"></script>

<!-- jQuery CDN -->
<script src="https://code.jquery.com/jquery-3.7.0.min.js"
	integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g="
	crossorigin="anonymous"></script>

</head>
<body id="page-top">
	<header class="custom-masthead w-100 h-100">
		<!-- Navigation-->
		<nav class="navbar navbar-expand-lg navbar-light fixed-top py-3"
			id="mainNav">
			<div class="container px-4 px-lg-5">
				<a class="navbar-brand"
					href="${ pageContext.servletContext.contextPath }/frg/index">TakeCareOfFridge</a>
				<button class="navbar-toggler navbar-toggler-right" type="button"
					data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
					aria-controls="navbarResponsive" aria-expanded="false"
					aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarResponsive">
					<ul class="navbar-nav ms-auto my-2 my-lg-0">
						<li class="nav-item"><a class="nav-link"
							href="${ pageContext.servletContext.contextPath }/frg/frgShow">MyFridge</a></li>
						<li class="nav-item"><a class="nav-link"
							href="${ pageContext.servletContext.contextPath }/comm/board">Community</a></li>
						<li class="nav-item"><a class="nav-link"
							href="${ pageContext.servletContext.contextPath }/frg/logout">Logout</a></li>
						<li class="nav-item"><a class="nav-link"
							href="${ pageContext.servletContext.contextPath }/frg/myPage"><i
								class="fa-solid fa-circle-user"></i></a></li>
					</ul>
				</div>
			</div>
		</nav>
		<div id="customAlert" class="hidden">
			<div class="alert-content">
				<p id="alertContent">알림창!</p>
			</div>
		</div>
		<div class="mt-9 vw-80 mx-auto">
			<div class="btns d-flex justify-content-sm-end h-5 position-relative">
				<input type="search"
					class="w-30 position-relative rounded-5 bg-white-30 border-solid-1 border-white me-2 indent-10" />
				<span class="position-absolute e-7 top-20 text-white"> <i
					class="fa-solid fa-magnifying-glass"></i>
				</span>
				<button type="button" class="btn bg-white-30 w-5 rounded-5"
					onclick="" title="게시글 쓰러 가기">
					<i class="fa-solid fa-plus"></i>
				</button>
			</div>
			<table class="bg-white-30 rounded-3 mt-2 w-100 h-95">
				<thead>
					<tr>
						<!-- 글 번호 -->
						<th class="w-7">&nbsp;</th>
						<th class="w-45 p-2 text-center">제목</th>
						<!-- 첨부파일 유무 -->
						<th class="w-7 px-2 py-1 text-center">&nbsp;</th>
						<th class="w-10 px-2 py-1 text-center">작성자</th>
						<th class="w-10 px-2 py-1 text-center">작성일</th>
						<th class="w-7 px-2 py-1 text-center">댓글</th>
						<th class="w-7 px-2 py-1 text-center">좋아요</th>
						<th class="w-7 px-2 py-1 text-center">조회</th>
					</tr>
				</thead>
				<tbody>
					<c:if test="${not empty allPosts}">
						<c:forEach var="board" items="${ allPosts }" varStatus="status">
							<tr>
								<td class="w-7 p-3 py-2 text-center">${ board.board_index }</td>
								<td class="w-45 p-3 py-2">${ board.board_title }</td>
								<td class="w-7 p-3 py-2 text-center">${ board.board_hasAttach >= 1 ? '<i class="fa-solid fa-paperclip"></i>' : '' }</td>
								<td class="w-10 p-3 py-2 text-center">${ board.user_id }</td>
								<td class="w-10 p-3 py-2 text-center"><fmt:formatDate
										value="${board.board_regDate}" pattern="yy.MM.dd." /></td>
								<td class="w-7 p-3 py-2 text-center">${ board.board_commentCount }</td>

								<td class="w-7 p-3 py-2 text-center"><c:choose>
										<c:when test="${userId == board.user_id}">
                ${board.board_like}
            </c:when>
										<c:otherwise>
											<c:choose>
												<c:when test="${likeStatus[status.index].is_liked == 1}">
													<span id="full-heart-${board.board_index}" data-board-index="${board.board_index}"><i class="fa-solid fa-heart"></i>&nbsp;<span id="likeNum-${board.board_index}">${board.board_like}</span></span>
												</c:when>
												<c:otherwise>
													<span id="empty-heart-${board.board_index}" data-board-index="${board.board_index}"><i
														class="fa-regular fa-heart"></i>&nbsp;<span id="likeNum-${board.board_index}">${board.board_like}</span></span>
												</c:otherwise>
											</c:choose>
										</c:otherwise>
									</c:choose></td>
								<td class="w-7 p-3 py-2 text-center">${ board.board_viewCount }</td>
							</tr>
						</c:forEach>
					</c:if>
					<c:if test="${empty allPosts}">
						<tr>
							<td colspan="8" class="p-3 py-2 text-center">등록된 게시글이 존재하지
								않습니다.</td>
						</tr>
					</c:if>
				</tbody>
			</table>
		</div>
	</header>
</body>
</html>