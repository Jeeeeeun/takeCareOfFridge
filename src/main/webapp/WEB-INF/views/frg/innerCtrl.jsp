<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
		<meta name="description" content="" />
		<meta name="author" content="" />
		<title>식품 정보 조회</title>

		<!-- Favicon-->
		<link rel="icon" type="image/x-icon" href="../resources/img/favicon.svg" />

		<!-- Bootstrap Icons-->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />

		<!-- Google fonts-->
		<link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
		<link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />

		<!-- SimpleLightbox plugin CSS-->
		<link href="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.css" rel="stylesheet" />

		<!-- Core theme CSS (includes Bootstrap)-->
		<link href="${pageContext.servletContext.contextPath}/resources/css/styles.css" rel="stylesheet" />

		<!-- External Custom CSS StyleSheet -->
		<!-- <link rel="stylesheet" href="../resources/css/innerCtrl.css"> -->
		<style>
			.stateBtn:hover {
				background-color: rgba(255, 255, 255, 0.2);
			}
			
			.stateBtn.selected {
				background-color: rgba(255, 255, 255, 0.7);
				color: rgba(0, 0, 0, 1) !important;
			}
			
			/* 셀렉터:hover { 스타일; } */
			#foodTable tbody tr:hover {
				background-color: rgba(255, 255, 255, 0.3); /* 배경색 변경 */
				cursor: pointer; /* 커서 모양 변경 */
			}
			
			.circleColor {
				box-shadow: 1 1 3px rgba(0, 0, 0, 0.1);
			}
			
			.red_circle {
				background: radial-gradient(circle at top left, #ffcccc 25%, #ff0000 70%);
			}
			
			.yellow_circle {
				background: radial-gradient(circle at top left, #ffffcc 25%, #ffff00 70%);
			}
			
			.green_circle {
				background: radial-gradient(circle at top left, #ccffcc 25%, #03c03c 70%);
			}
			
			.black_circle {
				background: radial-gradient(circle at top left, #cccccc 25%, #000000 70%);
			}
			
			input[type="radio"]:checked {
				background-color: #f4623a;
			}
		</style>

		<!-- FontAwesome CDN -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

		<!-- JavaScript global variable -->
		<script>
			window.contextPath = '${pageContext.servletContext.contextPath}';
		</script>

		<!-- JavaScript External Links -->
		<!-- <script src="${pageContext.servletContext.contextPath}/resources/js/innerFoodCtrl.js"></script> -->
		<script type="text/javascript">
			// 전역변수로 사용할 변수 선언
			let alertMsg, alertContent, alertWindow, confirmMsg, confirmContent, confirmWindow, confirmYesBtn, confirmNoBtn;
			
			// 식품 등록 버튼 눌렀을 때
			function addBtnClicked() {
				window.location.href = "${pageContext.servletContext.contextPath}/frg/innerAdd";
			}
			
			// 드롭박스로 다른 냉장고를 선택했을 때
			function changeFrg(frgName, url) {
				location.href = url + "?frgName=" + frgName;
			}
			
			function filterDataByState(state) {
				// 선택된 버튼을 표시하기 위해 모든 버튼에서 'selected' 클래스를 제거
				var buttons = document.querySelectorAll('.stateBtn');
				buttons.forEach(function (button) {
					button.classList.remove('selected');
				});
			
				// 선택된 버튼에 'selected' 클래스를 추가
				var selectedButton = document.getElementById(state);
				selectedButton.classList.add('selected');
				const allRows = document.querySelectorAll("#foodTable tbody tr");
			
				if (state === "all") {
					allRows.forEach(row => row.style.display = "table-row");
				} else {
					allRows.forEach(row => {
						const in_state = row.querySelector("td[data-in-state]").getAttribute("data-in-state");
						if (in_state === state) {
							row.style.display = "table-row";
						} else {
							row.style.display = "none";
						}
					});
				}
			}
			
			// 알림창 띄우기
			function showAlert(alertMsg) {
				alertContent.textContent = alertMsg;
				alertWindow.classList.remove("hidden");
				alertWindow.classList.add("bg-opacity-100");
				
				setTimeout(function () {
					alertWindow.classList.remove("bg-opacity-100");
					alertWindow.classList.add("hidden");
				}, 2500);
			}
			
			// 컨펌창 켜기
			function showConfirm(confirmMsg, yesClicked, noClicked) {
			  confirmContent.textContent = confirmMsg;
			  confirmWindow.classList.remove("hidden");
			  confirmWindow.classList.add("bg-opacity-100");

			  confirmYesBtn.onclick = function () {
			    // Yes 눌리면 이뤄질 동작들
			    if (yesClicked) {
			      yesClicked(); // showConfirm 함수가 실행된 곳에서 전달한 yes 버튼 클릭시 실행될 익명의 콜백함수가 여기서 실행된다는 뜻
			    }
			    // 컨펌창 끄기
			    closeConfirm();
			  };

			  confirmNoBtn.onclick = function () {
			    // No 눌리면 이뤄질 동작들
			    if (noClicked) {
			      noClicked(); // showConfirm 함수가 실행된 곳에서 전달한 no 버튼 클릭시 실행될 익명의 콜백함수가 여기서 실행된다는 뜻
			    }
			    // 컨펌창 끄기
			    closeConfirm();
			  };
			}
			
			// 컨펌창 끄기
			function closeConfirm() {
			  confirmWindow.classList.remove("bg-opacity-100");
			  confirmWindow.classList.add("hidden");
			}
			
			document.addEventListener("DOMContentLoaded", function () {
				
				 // 선택 상자가 열릴 때 "제품을 선택하세요" 옵션을 제거합니다.
			    document.getElementById('detailInfoItemBox_frg_name').addEventListener('focus', function() {
			        this.children[0].style.display = 'none';
			    });

			    // 선택 상자가 닫힐 때 "제품을 선택하세요" 옵션을 추가합니다.
			    document.getElementById('detailInfoItemBox_frg_name').addEventListener('blur', function() {
			        this.children[0].style.display = 'block';
			    });
				
				// 알림창 위한 전역변수 초기화
				alertContent = document.querySelector("#alertContent");
				alertWindow = document.querySelector("#customAlert");
				
				// 컨펌창 위한 전역변수 초기화
				confirmContent = document.querySelector("#confirmContent");
  				confirmWindow = document.querySelector("#customConfirm");
	  			confirmYesBtn = document.querySelector("#confirmYesBtn");
	  			confirmNoBtn = document.querySelector("#confirmNoBtn");

				// 페이지 로드 시, 수정 버튼 & 삭제 버튼 누를 수 없게 비활성화
				document.getElementById('updateBtn').disabled = true;
				document.getElementById('deleteBtn').disabled = true;
				
				// 페이지 로드 시, 전체 버튼에 selected 클래스 추가
				document.getElementById("all").classList.add("selected");
				
				// 나머지 버튼들에는 selected 클래스 제거
				document.getElementById("cool").classList.remove("selected");
				document.getElementById("frozen").classList.remove("selected");
				
				const urlParams = new URLSearchParams(window.location.search);
				const frgNameParam = urlParams.get("frgName");
			
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
							circle.classList.remove("red_circle", "yellow_circle", "green_circle"); // 이전에 추가된 클래스 모두 제거
			
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
				document.getElementById('detailInfoItemBox_frg_name').disabled = false;
				document.getElementById('detailInfoItemBox_in_name').disabled= false;
				document.getElementById('detailInfoItemBox_in_company').disabled= false;
				document.getElementById('detailInfoItemBox_in_expireDate').disabled = false;
				document.getElementById('detailInfoItemBox_d_DAY').value="";
				document.getElementById('detailInfoItemBox_d_DAY').disabled= true;
				document.getElementById('detailInfoItemBox_d_DAY').placeholder="자동으로 계산됩니다";
				document.getElementById('detailInfoItemBox_in_count').disabled= false;
				document.getElementById('detailInfoItemBox_in_type').disabled= false;
				document.getElementById('coolRadio').disabled=false;
				document.getElementById('frozenRadio').disabled=false;
				
				// 수정 버튼 숨기고, 수정 완료 버튼 보이기
				document.getElementById('beforeUpdateBtns').classList.remove('d-flex');
				document.getElementById('beforeUpdateBtns').classList.add('hidden');
				document.getElementById('afterUpdateBtns').classList.remove('hidden');
				document.getElementById('afterUpdateBtns').classList.add('d-flex');
				
			}
			
			// 수정 완료 버튼
			// 수정 완료 버튼 클릭 이벤트 핸들러
			function updateEndBtnClicked() {
				// 읽기 전용으로 변경된 입력 필드들을 다시 수정 가능으로 변경
				document.getElementById('detailInfoItemBox_frg_name').disabled = true;
				document.getElementById('detailInfoItemBox_in_name').disabled = true;
				document.getElementById('detailInfoItemBox_in_company').disabled = true;
				document.getElementById('detailInfoItemBox_in_expireDate').disabled = true;
				document.getElementById('detailInfoItemBox_d_DAY').disabled = true;
				document.getElementById('detailInfoItemBox_in_count').disabled = true;
				document.getElementById('detailInfoItemBox_in_type').disabled = true;
				document.getElementById('coolRadio').disabled = true;
				document.getElementById('frozenRadio').disabled = true;
			
				if (!document.getElementById('detailInfoItemBox_frg_name').value ||
						!document.getElementById('detailInfoItemBox_in_name').value ||
						!document.querySelector('input[name="in_state"]:checked') ||
						!document.getElementById('detailInfoItemBox_in_expireDate').value ||
						!document.getElementById('detailInfoItemBox_in_count').value ||
						!document.getElementById('detailInfoItemBox_in_type').value ||
						!selectIndex) {
						alertMsg = "모든 필수 입력 값을 입력하세요.";
						showAlert(alertMsg);
					   return;
					}
				
				// 현재 날짜와 insertedDdayValue간의 일수 차이 계산하기
				function calculateDateDifference(insertedDdayValue) {
					const currentDate = new Date();
					const expireDate = new Date(insertedDdayValue);
			
					// 시간 차이를 밀리초 단위로 계산하고 일(day)로 변환하여 소수점 아래 버림
					const daysDifference = Math.floor((expireDate - currentDate) / (24 * 60 * 60 * 1000));
			
					return daysDifference;
				}
			
				// d-day를 표시하는 함수
				function showDday(daysDifference) {
					const d_day_input = document.getElementById('detailInfoItemBox_d_DAY');
					if (daysDifference >= 0) {
						d_day_input.placeholder = daysDifference;
					} else {
						d_day_input.placeholder =  Math.abs(daysDifference);
					}
					return daysDifference;
				}
			
				// insertedDdayValue 값이 변경되었을 때 호출되는 이벤트 핸들러
				function handleDdayValueChange() {
					const newInsertedDdayValue = document.getElementById('detailInfoItemBox_in_expireDate').value;
					const newDaysDifference = calculateDateDifference(newInsertedDdayValue);
					d_day_value = newDaysDifference; // 새로운 d-day 값 저장
					showDday(d_day_value); // 새로운 d-day 표시
				}
			
				// 기존에 계산된 d-day 값을 초기화하고 처음 d-day를 표시
				let insertedDdayValue = document.getElementById('detailInfoItemBox_in_expireDate').value;
				let d_day_value = calculateDateDifference(insertedDdayValue);
				let finalDaysDifference = showDday(d_day_value);
			
				// insertedDdayValue 값이 변경되었을 때 이벤트 리스너 등록
				document.getElementById('detailInfoItemBox_in_expireDate').addEventListener('change', handleDdayValueChange);
				
				const frgName = document.getElementById('detailInfoItemBox_frg_name').value;
				const inName = document.getElementById('detailInfoItemBox_in_name').value;
				const inState = document.querySelector('input[name="in_state"]:checked').value;
				const inCompany = document.getElementById('detailInfoItemBox_in_company').value;
				const inExpireDate = document.getElementById('detailInfoItemBox_in_expireDate').value;
				let dDay = document.getElementById('detailInfoItemBox_d_DAY').value;
				dDay = finalDaysDifference;
				const inCount = document.getElementById('detailInfoItemBox_in_count').value;
				const inType = document.getElementById('detailInfoItemBox_in_type').value;
				inIndex=selectIndex;
				
				const requestData = {
					frg_name : frgName,
					in_name : inName,
					in_state : inState,
					in_company : inCompany,
					in_expireDate : inExpireDate,
					in_count : inCount,
					in_type : inType,
					in_index : inIndex
				};
				
				$.ajax({
					url: `${pageContext.servletContext.contextPath}/frg/innerCtrl/updateInnerData`,
					type: "POST",
					data: JSON.stringify(requestData), // JSON 데이터를 문자열로 변환하여 body에 넣어 서버로 보냄
					dataType: 'json', // 응답에 포함된 JSON 데이터를 알맞게 파싱해서 사용할 수 있도록 처리
					contentType: 'application/json', // 요청의 컨텐츠 타입을 JSON으로 설정
					success: function (response) {						
						if (response.success) {
							alertMsg = "수정 완료";
							showAlert(alertMsg);
							location.reload(); // 페이지 새로고침
						} else {
							alertMsg = "수정 실패: " + response.message;
							showAlert(alertMsg);
						}
					},
					error: function (err) {
						alertMsg = "수정 실패: 서버 내부 오류가 발생했습니다.";
						showAlert(alertMsg);
					}
				});
				
				originalData = null;
				
				// 수정 완료 버튼 숨기고, 수정 버튼 보이기
				document.getElementById('beforeUpdateBtns').classList.remove('hidden');
				document.getElementById('beforeUpdateBtns').classList.add('d-flex');
				document.getElementById('afterUpdateBtns').classList.remove('d-flex');
				document.getElementById('afterUpdateBtns').classList.add('hidden');
			}
			
			let selectIndex = null;
			let originalData = null;
			
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
			
			function handleRowClick(in_name, in_expireDate, d_DAY, in_state, frg_index) {
				  
				  document.getElementById('updateBtn').disabled = false;
				  document.getElementById('deleteBtn').disabled = false;
				
				// 수정 완료 버튼 숨기고, 수정 버튼 보이기
					document.getElementById('beforeUpdateBtns').classList.remove('hidden');
					document.getElementById('beforeUpdateBtns').classList.add('d-flex');
					document.getElementById('afterUpdateBtns').classList.remove('d-flex');
					document.getElementById('afterUpdateBtns').classList.add('hidden');

				    // 2. 모든 항목을 disabled 상태로 변경
				    document.getElementById('detailInfoItemBox_frg_name').disabled = true;
				    document.getElementById('detailInfoItemBox_in_name').disabled = true;
				    document.getElementById('detailInfoItemBox_in_company').disabled = true;
				    document.getElementById('detailInfoItemBox_in_expireDate').disabled = true;
				    document.getElementById('detailInfoItemBox_d_DAY').disabled = true;
				    document.getElementById('detailInfoItemBox_in_count').disabled = true;
				    document.getElementById('detailInfoItemBox_in_type').disabled = true;
				    document.getElementById('coolRadio').disabled = true;
				    document.getElementById('frozenRadio').disabled = true;
				  
				document.getElementById('detailInfoItemBox_in_name').value = in_name;
				document.getElementById('detailInfoItemBox_d_DAY').value = d_DAY;
				
				const testExpireDate = convertDateFormat(in_expireDate);
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
				
				const requestData = {
						in_name: in_name,
						frg_index: frg_index
					};
				
				$.ajax({
				    url: `${pageContext.servletContext.contextPath}/frg/innerCtrl/getInnerData`,
				    type: "POST",
				    data: requestData,
				    dataType: "json",
				    success: function (responseData) {
				        const in_count = responseData.innerData[0].in_count;
				        document.getElementById('detailInfoItemBox_in_count').value = in_count;
				        const in_company = responseData.innerData[0].in_company;
				        document.getElementById('detailInfoItemBox_in_company').value = in_company;
				        const in_type = responseData.innerData[0].in_type;
				        document.getElementById('detailInfoItemBox_in_type').value = in_type;
				        const in_index = responseData.innerData[0].in_index;
				        selectIndex = in_index;
				        const frg_name = responseData.FrgName;
				        selectFrgName = frg_name; // 여기에서 FrgName 값을 받아옴
				        document.getElementById('detailInfoItemBox_frg_name').value = selectFrgName;
				        
				        originalData = {
								frg_name: frg_name,
					            in_name: in_name,
					            in_state: in_state,
					            in_company: in_company,
					            in_expireDate: in_expireDate,
					            d_DAY: d_DAY,
					            in_count: in_count,
					            in_type: in_type
					        };
				    },
					error: function() {
						// 에러 발생 시의 코드
						console.error('Failed to get food info from the server.');
					}
				});
				
				return false;
			}
			
			function deleteBtnClicked() {
				
				confirmMsg = "정말 삭제하시겠습니까?";
				showConfirm(
						confirmMsg, // 앞서 정의한 confirmMsg
						function() {
							// Y 클릭하면
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
										alertMsg = "삭제 완료";
										showAlert(alertMsg);
										location.reload(); // 페이지 새로고침
									} else {
										alertMsg = "삭제 실패: " + response.message;
										showAlert(alertMsg);
									}
								},
								error: function (err) {
									alertMsg = "삭제 실패: 서버 내부 오류가 발생했습니다.";
									showAlert(alertMsg);
								}
							});
						},
						function() {
							// N 클릭하면
							return;
						}						
				);				
						return false;
			}
			
			function cancelBtnClicked() {
				document.getElementById('detailInfoItemBox_frg_name').disabled = true;
				document.getElementById('detailInfoItemBox_in_name').disabled = true;
				document.getElementById('detailInfoItemBox_in_company').disabled = true;
				document.getElementById('detailInfoItemBox_in_expireDate').disabled = true;
				document.getElementById('detailInfoItemBox_d_DAY').disabled = true;
				document.getElementById('detailInfoItemBox_in_count').disabled = true;
				document.getElementById('detailInfoItemBox_in_type').disabled = true;
				document.getElementById('coolRadio').disabled = true;
				document.getElementById('frozenRadio').disabled = true;
			
				document.getElementById('beforeUpdateBtns').classList.add('d-flex');
				document.getElementById('afterUpdateBtns').classList.remove('d-flex');
				document.getElementById('beforeUpdateBtns').classList.remove('hidden');
				document.getElementById('afterUpdateBtns').classList.add('hidden');
				
				// 원래 데이터로 복원하는 작업
			    if (originalData !== null) {
			    	document.getElementById('detailInfoItemBox_frg_name').value = originalData.frg_name; 
			        document.getElementById('detailInfoItemBox_in_name').value = originalData.in_name;
			        document.getElementById('detailInfoItemBox_in_company').value = originalData.in_company;
			        // 날짜 변환 함수를 활용하여 "yyyy-MM-dd" 형식으로 변환
			        const formattedDate = convertDateFormat(originalData.in_expireDate);
			        document.getElementById('detailInfoItemBox_in_expireDate').value = formattedDate;
					// Handling 보관상태 (Storage State)
			        if (originalData.in_state) {
			            if (originalData.in_state === "cool") {
			                document.getElementById('coolRadio').checked = true;
			            } else if (originalData.in_state === "frozen") {
			                document.getElementById('frozenRadio').checked = true;
			            }
			        }
			        document.getElementById('detailInfoItemBox_d_DAY').value = originalData.d_DAY;
			        document.getElementById('detailInfoItemBox_in_count').value = originalData.in_count;
			        document.getElementById('detailInfoItemBox_in_type').value = originalData.in_type;
			    }
				
				originalData = null;
			}
			</script>

		<!-- jQuery CDN -->
		<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous" ></script>

	</head>
	<body id="page-top">
		<header class="masthead">
			<nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
				<div class="container px-4 px-lg-5">
					<a class="navbar-brand" href="${pageContext.servletContext.contextPath}/frg/index">
						TakeCareOfFridge
					</a>
					<button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<ul class="navbar-nav ms-auto my-2 my-lg-0">
						<li class="nav-item">
							<a class="nav-link" href="${pageContext.servletContext.contextPath}/frg/frgShow">
								MyFridge
							</a>
						</li>
						<li class="nav-item hidden">
							<a class="nav-link" href="${pageContext.servletContext.contextPath}/board/list">
								Community
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="${pageContext.servletContext.contextPath}/frg/logout">
								Logout
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="${pageContext.servletContext.contextPath}/frg/myPage">
								<i class="fa-solid fa-circle-user"></i>
							</a>
						</li>
					</ul>
				</div>
			</nav>
			<div id="customAlert" class="hidden position-fixed top-0 start-0 w-100 h-100 bg-black-50 z-5 transition-opacity transition-duration-03 transition-timing-easeOut">
				<!-- 알림창 -->
				<div class="d-flex align-items-sm-center justify-content-sm-center text-center bg-white py-2 rounded-3 w-40 h-20 position-absolute top-50 start-50 translate-middle text-keepAll text-prewrap z-10 transition-all transition-duration-03 transition-timing-easeOut shadow-forAlert">
					<p id="alertContent" class="m-auto fs-5">알림창!</p>
				</div>
			</div>
			<div id="customConfirm" class="hidden position-fixed top-0 start-0 w-100 h-100 bg-black-50 z-5 transition-opacity transition-duration-03 transition-timing-easeOut">
				<!-- 컨펌창 -->
				<div class="w-35 h-20 d-flex flex-column align-items-sm-center justify-content-sm-center text-center bg-white p-3 rounded-3 position-absolute top-50 start-50 translate-middle text-keepAll text-prewrap z-10 transition-all transition-duration-03 transition-timing-easeOut shadow-forAlert">
					<p id="confirmContent" class="my-4 mx-auto fs-5">컨펌창!</p>
					<div class="w-100 h-50 d-flex flex-row justify-content-sm-end align-items-sm-center mx-3 my-0">
						<button id="confirmYesBtn" class="w-10 h-25 btn d-flex justify-content-sm-end align-items-sm-center btn-primary text-center rounded-3 mx-2 py-3">Yes</button>
						<button id="confirmNoBtn" class="w-10 h-25 btn d-flex justify-content-sm-end align-items-sm-center btn-secondary rounded-3 mx-2 py-3">No</button>
					</div>
				</div>
			</div>
			<div class="w-100 vh-80 d-flex flex-row">
				<!-- 신호등 + 전체 -->
				<div id="trafficLight" class="w-7 h-30 mx-2 py-1 d-flex flex-column justify-content-sm-around bg-traffic">
					<!-- 신호등 -->
					<p class="w-100 mb-0 d-flex justify-content-sm-center fs-3 fw-bold text-white-75">
						${ trafficLight[0].red }
					</p>
					<p class="w-100 mb-0 d-flex justify-content-sm-center fs-3 fw-bold text-white-75">
						${ trafficLight[0].yellow }
					</p>
					<p class="w-100 mb-0 d-flex justify-content-sm-center fs-3 fw-bold text-white-75">
						${ trafficLight[0].green }
					</p>
				</div>
				<div class="w-90 h-100 bottom-0">
					<!-- innerCtrl 남은 공간 -->
					<div class="vw-80 h-100 d-flex flex-row mx-auto">
						<!-- innerCtrl 박스 -->
						<div class="w-45 h-100 d-flex flex-column mx-1 my-2">
							<!-- 왼쪽 내용 -->
							<div class="w-100 h-15 d-flex flex-row flex-sm-grow-1 bg-white-30 rounded-4 my-2">
								<!-- currentStateBox -->
								<div class="w-30 h-100 d-flex flex-column justify-content-sm-center align-items-sm-center my-auto px-3 py-2">
									<!-- currentFrg -->
									<label class="w-80 h-50" for="frgSelect">냉장고 선택</label>
									<select class="w-100 h-50 bg-transparent border-05 border-white border-dashed border-opacity-50 rounded-4 px-3 py-1" id="frgSelect" onchange="changeFrg(this.value, '${ pageContext.servletContext.contextPath }/frg/innerCtrl');">
										<option value="all">전체</option>
										<c:forEach var="name" items="${ frgNames }">
											<option value="${name}" <c:if test="${ frgName eq name }">selected</c:if>>
												${name}
											</option>
										</c:forEach>
									</select>
								</div>
								<div class="w-40 h-100 d-flex flex-row justify-content-sm-around align-items-sm-center my-auto">
									<!-- stateBtns -->
									<button class="stateBtn btn w-30 h-40 rounded-4 text-white border-white border-05 border-dashed border-opacity-50" id="all" onclick="filterDataByState('all');">전체</button>
									<button class="stateBtn btn w-30 h-40 rounded-4 text-white border-white border-05 border-dashed border-opacity-50" id="cool" onclick="filterDataByState('cool');">냉장</button>
									<button class="stateBtn btn w-30 h-40 rounded-4 text-white border-white border-05 border-dashed border-opacity-50" id="frozen" onclick="filterDataByState('frozen');">냉동</button>
								</div>
								<div class="w-30 h-100 d-flex flex-row justify-content-sm-center align-items-sm-center my-auto">
									<!-- goToInnerAddBtn -->
									<button class="stateBtn btn w-70 h-40 rounded-4 text-white border-white border-05 border-dashed border-opacity-50" onclick="addBtnClicked()">식품 등록</button>
								</div>
							</div>
							<div class="w-100 h-85 postion-relative d-flex flex-column bg-white-30 rounded-4 overflowY-auto flex-sm-grow-1">
								<!-- wholeFoodListBox -->
								<table id="foodTable" class="w-95 border-none border-transparent table-fixed mx-auto mt-1">
									<thead class="w-100 h-5 border-none border-transparent">
										<tr class="w-100 h-100 rounded-4 border-none border-transparent border-opacity-25">
											<th class="tableHead w-5 h-100 position-sticky top-025r bg-white-70 transition-bgColor transition-duration-03 transition-timing-ease z-2 rounded-start-4 p-2">
												<span class="circleColor black_circle width-4 height-4 rounded-circle d-sm-block justify-content-sm-center align-items-sm-center mx-auto"></span>
											</th>
											<th class="tableHead w-20 h-100 position-sticky top-025r bg-white-70 transition-bgColor transition-duration-03 transition-timing-ease z-2 text-center p-2">식품명</th>
											<th class="tableHead w-30 h-100 position-sticky top-025r bg-white-70 transition-bgColor transition-duration-03 transition-timing-ease z-2 text-center p-2">유통기한</th>
											<th class="tableHead w-20 h-100 position-sticky top-025r bg-white-70 transition-bgColor transition-duration-03 transition-timing-ease z-2 text-center p-2">D-day</th>
											<th class="tableHead w-25 h-100 position-sticky top-025r bg-white-70 transition-bgColor transition-duration-03 transition-timing-ease z-2 rounded-end-4 text-center p-2">보관 상태</th>
										</tr>
									</thead>
									<tbody id="tableBody" class="w-100 h-95 border-none border-transparent overflowX-hidden overflowY-auto">
										<c:forEach var="item" items="${ dataList }">
											<tr class="w-100 h-100 position-relative z-1" onclick="handleRowClick('${ item.in_name }', '${ item.in_expireDate }', '${ item.d_DAY }', '${ item.in_state }', ${item.frg_index});">
												<td class="w-5 h-100 rounded-start-4 text-center p-2">
													<span class="circleColor width-4 height-4 rounded-circle d-sm-block justify-content-sm-center align-items-sm-center mx-auto" ddayData="${ item.d_DAY }"></span>
												</td>
												<td class="w-20 h-100 text-center p-2">
													${ item.in_name }
												</td>
												<td class="w-30 h-100 text-center p-2">
													<fmt:formatDate value="${ item.in_expireDate }" pattern="yyyy-MM-dd" />
												</td>
												<td class="w-20 h-100 text-center p-2">
													${item.d_DAY}
												</td>
												<td class="w-25 h-100 text-center rounded-end-4" data-in-state="${item.in_state}">
													<c:choose>
														<c:when test="${ item.in_state == 'frozen'}">
															냉동
														</c:when>
														<c:otherwise>
															냉장
														</c:otherwise>
													</c:choose>
												</td>
											</tr>
										</c:forEach>
									</tbody>
								</table>
							</div>
						</div>
						<div class="w-55 h-100 position-relative d-flex flex-row mx-1 my-2">
							<!-- 오른쪽 내용 -->
							<div class="w-100 h-100 my-2 bg-white-30 rounded-4">
								<!-- detailInfoBox -->
								<div class="w-90 h-8 d-flex justify-content-sm-center align-items-sm-center bg-white-30 rounded-4 text-center fw-bold mx-auto mt-2 mb-1 py-1">
									상세 보기
								</div>
								<form class="w-90 h-90 d-flex flex-column justify-content-sm-center align-items-sm-center mx-auto" action="${ pageContext.servletContext.contextPath }/frg/innerFoodCtrl" method="post" onsubmit="return false;">
									<div class="w-100 h-10 hidden">
										<label for="indexValue">식품 번호</label>
										<input id="indexValue" type="number" />
									</div>
									<div class="w-100 h-10 d-flex flex-row align-items-sm-center border-1 border-dashed border-white border-opacity-10 rounded-4 mx-auto my-1 py-2">
    									<label class="w-30 h-80 text-white fw-bold mx-2 px-2" for="detailInfoItemBox_frg_name">보관 냉장고</label>
    									<div id="frgSelectContainer" class="w-70 h-80 mx-1">
       										<select id="detailInfoItemBox_frg_name" class="w-70 h-100 bg-transparent border-05 border-white border-dashed border-opacity-50 rounded-4 px-3 py-1" disabled>
       										<option value="">제품을 선택하세요</option>
       										<c:forEach var="name" items="${frgNames}">
          								 		<option value="${name}">${name}</option>
          								 	</c:forEach>	
        									</select>
   									    </div>
									</div>
									<div class="w-100 h-10 d-flex flex-row align-items-sm-center border-05 border-dashed border-white border-opacity-10 rounded-4 mx-auto my-1 py-2">
										<label class="w-30 h-80 text-white fw-bold mx-2 px-2" for="detailInfoItemBox_in_name">식품명</label>
										<input class="w-70 h-80 text-white bg-transparent border-none mx-1" type="text" id="detailInfoItemBox_in_name" disabled />
									</div>
									<div class="w-100 h-10 d-flex flex-row align-items-sm-center border-05 border-dashed border-white border-opacity-10 rounded-4 mx-auto my-1 py-2">
										<label class="w-30 h-80 text-white fw-bold mx-2 px-2" for="">보관 상태</label>
										<div class="w-70 h-100 position-relative d-flex flex-row justify-content-sm-around align-items-sm-center">
											<div class="w-50 h-100 d-flex flex-row align-items-sm-center my-auto">
												<input type="radio" class="width-4 height-4 d-flex align-items-sm-center position-relative appear-none border-1 border-solid border-white rounded-circle" id="coolRadio" name="in_state" value="cool" disabled />
												<span class="text-white ms-3 me-4">냉장</span>
											</div>
											<div class="w-50 h-100 d-flex flex-row align-items-sm-center my-auto">
												<input type="radio" class="width-4 height-4 d-flex align-items-sm-center position-relative appear-none border-1 border-solid border-white rounded-circle" id="frozenRadio" name="in_state" value="frozen" disabled />
												<span class="text-white ms-3 me-4">냉동</span>
											</div>
										</div>
									</div>
									<div class="w-100 h-10 d-flex flex-row align-items-sm-center border-05 border-dashed border-white border-opacity-10 rounded-4 mx-auto my-1 py-2">
										<label class="w-30 h-80 text-white fw-bold mx-2 px-2" for="detailInfoItemBox_in_company">제조사명</label>
										<input class="w-70 h-80 text-white bg-transparent border-none mx-1" type="text" id="detailInfoItemBox_in_company" disabled />
									</div>
									<div class="w-100 h-10 d-flex flex-row align-items-sm-center border-05 border-dashed border-white border-opacity-10 rounded-4 mx-auto my-1 py-2">
										<label class="w-30 h-80 text-white fw-bold mx-2 px-2" for="detailInfoItemBox_in_expireDate">유통/소비기한</label>
										<input class="w-70 h-80 text-white bg-transparent border-none mx-1" type="date" id="detailInfoItemBox_in_expireDate" disabled />
									</div>
									<div class="w-100 h-10 d-flex flex-row align-items-sm-center border-05 border-dashed border-white border-opacity-10 rounded-4 mx-auto my-1 py-2">
										<label class="w-30 h-80 text-white fw-bold mx-2 px-2" for="detailInfoItemBox_d_DAY">D-Day</label>
										<input class="w-70 h-80 text-white bg-transparent border-none mx-1" type="number" id="detailInfoItemBox_d_DAY" disabled />
										<span></span>
									</div>
									<div class="w-100 h-10 d-flex flex-row align-items-sm-center border-05 border-dashed border-white border-opacity-10 rounded-4 mx-auto my-1 py-2">
										<label class="w-30 h-80 text-white fw-bold mx-2 px-2" for="detailInfoItemBox_in_count">수량</label>
										<input class="w-70 h-80 text-white bg-transparent border-none mx-1" type="number" id="detailInfoItemBox_in_count" disabled />
									</div>
									<div class="w-100 h-10 d-flex flex-row align-items-sm-center border-05 border-dashed border-white border-opacity-10 rounded-4 mx-auto my-1 py-2">
										<label class="w-30 h-80 text-white fw-bold mx-2 px-2" for="detailInfoItemBox_in_type">식품 유형</label>
										<input class="w-70 h-80 text-white bg-transparent border-none mx-1" type="text" id="detailInfoItemBox_in_type" disabled />
									</div>
									<div class="w-100 h-10 d-flex flex-column justify-content-sm-center align-items-sm-center mx-auto">
										<div id="beforeUpdateBtns" class="w-100 h-100 d-flex justify-content-sm-center align-items-sm-center">
											<button class="btn w-20 h-80 rounded-4 text-white border-white border-05 border-dashed border-opacity-50 mx-2" id="updateBtn" onclick="updateBtnClicked()">수정</button>
											<button class="btn w-20 h-80 rounded-4 text-white border-white border-05 border-dashed border-opacity-50 mx-2" id="deleteBtn" onclick="deleteBtnClicked()">삭제</button>
										</div>
										<div id="afterUpdateBtns" class="w-100 h-100 hidden justify-content-sm-center align-items-sm-center">
											<button class="btn w-20 h-80 rounded-4 text-white border-white border-05 border-dashed border-opacity-50 mx-2" id="updateEndBtn" onclick="updateEndBtnClicked()">수정 완료</button>
											<button class="btn w-20 h-80 rounded-4 text-white border-white border-05 border-dashed border-opacity-50 mx-2" id="cancelBtn" onclick="cancelBtnClicked()">취소</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	</body>
</html>