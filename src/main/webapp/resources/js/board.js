let alertMsg, alertContent, alertWindow, plusBtn, likeNumDisplay, fullHeart, emptyHeart, addLikeData, cancelLikeData, fullHeartTemplate, emptyHeartTemplate, newFullHeart, newEmptyHeart, likeNum;

window.onload = function () {
	alertContent = document.querySelector("#alertContent");
	alertWindow = document.querySelector("#customAlert");
	plusBtn = document.querySelector("#plusBtn");
	likeNumDisplays = document.querySelectorAll("[id^=likeNum-]");
	fullHeart = document.querySelectorAll("[id^=full-heart-]");
	emptyHeart = document.querySelectorAll("[id^=empty-heart-]");
	
	plusBtn.addEventListener("click", () => window.location.href = "`${contextPath}/comm/board/${boardIndex}`");
	
	emptyHeart.forEach(function (heart) {
		heart.addEventListener("click", addLikeHandler);
	});

	fullHeart.forEach(function (heart) {
		heart.addEventListener("click", cancelLikehandler);
	});
};

// SESS_ID 데려오려는 함수
function getUserId() {
	return fetch(contextPath + "/frg/getUserId").then(function (response) {
		if (response.ok) {
			return response.text();
		} else {
			throw new Error("사용자 ID를 가져올 수 없었습니다.");
		}
	});
}

// 알림창 띄우기
function showAlert(alertMsg) {
	alertContent.textContent = alertMsg;
	alertWindow.classList.remove("hidden");
	alertWindow.classList.add("show");
	
	setTimeout(function () {
		alertWindow.classList.remove("show");
		alertWindow.classList.add("hidden");
	}, 3000);
}

function addLikeHandler(e) {
    addLike(e.target);
}

function cancelLikeHandler(e) {
    cancelLike(e.target);
}

// emptyHeart 클릭 (좋아요 add)
function addLike(heart) {

	// board_index 가져오기
	let boardIndex = heart.getAttribute("data-board-index");
	
	// SESS_ID를 가져오는 함수를 호출
	getUserId()
	.then(function (userId) {
		addLikeData = {
			board_index: parseInt(boardIndex),
			user_id: userId,
		};
		
		// ajax로 값을 서버로 넘겨서 좋아요할 row 추가
		$.ajax({
			url: `${contextPath}/comm/addLike`,
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(addLikeData),
			dataType: "json",
			success: function (response) {
				
				// 꽉 찬 하트로 바꾸기
				heart.classList.remove("fa-regular");
				heart.classList.add("fa-solid");
				heart.setAttribute("id", `full-heart-${boardIndex}`);
				heart.removeEventListener("click", addLikeHandler);
				heart.addEventListener("click", cancelLikeHandler);
				
				// 화면에 좋아요 수 업데이트 하기
		        likeNumDisplay = document.querySelector(`#likeNum-${boardIndex}`);
        		likeNumDisplay.textContent = response.updatedLike;
			},
			error: function (err) {
				if (err.status === 404) {
					alertMsg = "요청한 페이지를 찾을 수 없습니다.";
					showAlert(alertMsg);
				} else if (err.status === 500) {
					alertMsg = "서버 내부 오류가 발생했습니다. 관리자에게 문의하세요.";
					showAlert(alertMsg);
				} else {
					alertMsg = "error가 발생했습니다. " + err;
					showAlert(alertMsg);
				}
			},
		});
	})
	.catch(function (error) {
		console.error("사용자 ID를 얻는 데 실패했습니다:", error);
	});
}

// fullHeart 클릭 (좋아요 취소)
function cancelLike(heart) {

	// board_index 가져오기
	let boardIndex = heart.getAttribute("data-board-index");
	
	// SESS_ID를 가져오는 함수를 호출
	getUserId()
	.then(function (userId) {
		cancelLikeData = {
			board_index: parseInt(boardIndex),
			user_id: userId,
		};
		
		// ajax로 값을 서버로 넘겨서 좋아요했던 row 삭제
		$.ajax({
			url: `${contextPath}/comm/cancelLike`,
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(cancelLikeData),
			dataType: "json",
			success: function (response) {
				
				// 빈 하트로 바꾸기
				heart.classList.remove("fa-solid");
				heart.classList.add("fa-regular");
				heart.setAttribute("id", `empty-heart-${boardIndex}`);
				heart.removeEventListener("click", cancelLikeHandler);
				heart.addEventListener("click", addLikeHandler);
				
				// 화면에 좋아요 수 업데이트 하기
		        likeNumDisplay = document.querySelector(`#likeNum-${boardIndex}`);
        		likeNumDisplay.textContent = response.updatedLike;
			},
			error: function (err) {
				if (err.status === 404) {
					alertMsg = "요청한 페이지를 찾을 수 없습니다.";
					showAlert(alertMsg);
				} else if (err.status === 500) {
					alertMsg = "서버 내부 오류가 발생했습니다. 관리자에게 문의하세요.";
					showAlert(alertMsg);
				} else {
					alertMsg = "error가 발생했습니다. " + err;
					showAlert(alertMsg);
				}
			},
		});
	})
	.catch(function (error) {
		console.error("사용자 ID를 얻는 데 실패했습니다:", error);
	});
}

// 검색 버튼 누르면 게시글 결과에서 관련 글만 필터링