<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<title>frgAdd Page</title>
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
</head>
<body id="page-top">
	<header class="masthead">
		<!-- Navigation-->
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
				<div class="collapse navbar-collapse" id="navbarResponsive">
					<ul class="navbar-nav ms-auto my-2 my-lg-0">
						<li class="nav-item"><a class="nav-link"
							href="<%=request.getContextPath()%>/frg/frgAdd">MyFridge</a></li>
						<li class="nav-item"><a class="nav-link"
							href="<%=request.getContextPath()%>/frg/frgAdd">Community</a></li>
						<li class="nav-item"><a class="nav-link"
							href="<%=request.getContextPath()%>/frg/logout">Logout</a></li>
						<li class="nav-item"><a class="nav-link"
							href="<%=request.getContextPath()%>/frg/frgAdd"><i
								class="fa-solid fa-circle-user"></i></a></li>
					</ul>
					<script>
						function showAlert() {
							alert("냉장고 생성을 먼저 하세요!");
						}
					</script>
				</div>
			</div>
		</nav>
		<p id="red">${trafficLight[0].red}</p>
		<p id="yellow">${trafficLight[0].yellow}</p>
		<p id="green">${trafficLight[0].green}</p>
		<a
			href="${ pageContext.servletContext.contextPath }/frg/frgAdd_form?user_id=${SESS_ID}">
			<i class="fa-solid fa-plus"></i>
		</a>
	</header>
</body>
</html>