let alertMsg, alertContent, alertWindow, searchForm, searchInput, inputSearchType, inputDateType, searchBtn, searchText, searchDate, posts, plusBtn, likeNumDisplay, fullHeart, emptyHeart, addLikeData, cancelLikeData, fullHeartTemplate, emptyHeartTemplate, newFullHeart, newEmptyHeart, likeNum;

window.onload = function () {
	alertContent = document.querySelector("#alertContent");
	alertWindow = document.querySelector("#customAlert");
	searchForm = document.querySelector('#searchForm');
	searchInput = document.querySelector('#searchType');
	inputSearchType = document.querySelector('#inputSearchType');
	inputDateType = document.querySelector('#inputDateType');
	searchBtn = document.querySelector('#searchBtn');
	searchText = document.querySelector('#searchText');
	searchDate = document.querySelector('#searchDate');
	posts = document.querySelector('#posts');
	plusBtn = document.querySelector("#plusBtn");
	likeNumDisplays = document.querySelectorAll("[id^=likeNum-]");
	fullHeart = document.querySelectorAll("[id^=full-heart-]");
	emptyHeart = document.querySelectorAll("[id^=empty-heart-]");
	
	searchInput.addEventListener("change", changeSearchInput);
	
	plusBtn.addEventListener("click", () => window.location.href = `${contextPath}/board/create`);
	//.addEventListener("click", () => window.location.href = `${contextPath}/board/view?board_index=${boardIndex}`);
	
	bindLikeEvent();
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

// handler 함수 쓰는 이유:
// 1. 가독성 - 이벤트와 관련된 로직을 보다 쉽게 이해할 수 있음
// 2. 재사용성 - 일반 함수로 작성하여 필요한 곳에서 여러 번 호출할 수 있음. 중복 코드를 줄이고 유지 관리가 쉬움.
// 3. 관심사 분리 - 이벤트 관련 함수를 별도의 함수로 분리하면, 프로그램의 각 부분이 자기만의 기능에 집중할 수 있게 됨. 프로그램 구조 명확성, 유지보수 용이성 도모 목적.

// 좋아요 처리 handler 함수(특정 이벤트가 발생했을 때 실행되는 함수)
function addLikeHandler(e) {
    addLike(e.target);
}

// 좋아요 취소 handler 함수(특정 이벤트가 발생했을 때 실행되는 함수)
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
				heart.style.color = "red";
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
				heart.style.color = "black";
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

// 검색창 렌더링되는 종류 바꾸기
function changeSearchInput() {
	
	if(searchInput.value === 'text') {
		searchForm.action = "${ pageContext.servletContext.contextPath }/board/searchKeyword"
		inputSearchType.style.display = "flex";
		inputDateType.style.display = "none";
		searchBtn.querySelector("i").id = "searchText";
		searchBtn.removeEventListener("click", searchPostsByDate);
        searchBtn.addEventListener("click", searchPostsByWord);
	} else if (searchInput.value === 'date') {
	searchForm.action = "${ pageContext.servletContext.contextPath }/board/searchDate"
		inputSearchType.style.display = "none";
		inputDateType.style.display = "flex";
		searchBtn.querySelector("i").id = "searchDate";
		searchBtn.removeEventListener("click", searchPostsByWord);
        searchBtn.addEventListener("click", searchPostsByDate);
	}
}

// 검색으로 동적으로 생성되는 게시글 목록에 좋아요 eventListener 붙이는 함수
function bindLikeEvent() {

  emptyHeart.forEach(function (heart) {
    heart.addEventListener("click", addLikeHandler);
  });

  fullHeart.forEach(function (heart) {
    heart.addEventListener("click", cancelLikeHandler);
  });
}

// 검색어 입력하고 검색 버튼 누르면 제목이나 내용에 검색어가 포함된 게시글 목록만 필터링되어 보임.
function searchPostsByWord() {

	let searchWord = inputSearchType.querySelector("input[type='search']").value;
	
	let searchText = document.querySelector('#searchText');
	
	const searchKeyword = {
		search: searchWord
	};
	
	$.ajax ({
		url: `${contextPath}/board/searchKeyword?search=` + encodeURIComponent(searchWord),
		method: "GET",
		contentType: "application/json",
		dataType: "json",
		success: function(searchResults) {
			alertMsg = searchWord + "(이)가 검색되었습니다.";
			showAlert(alertMsg);
			
			// 게시글 목록 초기화
			posts.textContent = '';
			
			// 검색 결과 게시글 목록의 동적 생성
			var searchPosts = '';
			if (searchResults.length === 0) { // 검색 결과가 없으면
				searchPosts = '<tr><td colspan="8" class="p-3 py-2 text-center">검색된 게시글이 존재하지 않습니다.</td></tr>';
			} else { // 검색 결과가 하나라도 있으면
				searchResults.forEach(function(board) {
					searchPosts += `<tr>
						<td class="w-7 p-3 py-2 text-center">${board.board_index}</td>
						<td class="w-45 p-3 py-2">${board.board_title}</td>
						<td class="w-7 p-3 py-2 text-center">${board.board_hasAttach >= 1 ? '<i class="fa-solid fa-paperclip"></i>' : ''}</td>
						<td class="w-10 p-3 py-2 text-center">${board.user_id}</td>
						<td class="w-10 p-3 py-2 text-center">${new Date(board.board_regDate).toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</td>
						<td class="w-7 p-3 py-2 text-center">${board.board_commentCount}</td>
						<td class="w-7 p-3 py-2 text-center">`;
	
						if (userId === board.user_id) {
							searchPosts += `<span title="내가 쓴 게시글은 좋아요를 누를 수 없어요.">${board.board_like}</span>`;
						} else {
							if (likeStatus[status.index].is_liked === 1) {
								searchPosts += `<span>
										<i class="fa-solid fa-heart text-red" id="full-heart-${board.board_index}" data-board-index="${board.board_index}"></i>&nbsp;
										<span id="likeNum-${board.board_index}">${board.board_like}</span>
									</span>`;
								} else {
									searchPosts += `<span>
											<i class="fa-regular fa-heart" id="empty-heart-${board.board_index}" data-board-index="${board.board_index}"></i>&nbsp;
											<span id="likeNum-${board.board_index}">${board.board_like}</span>
										</span>`;
									}
								}
								searchPosts += `</td>
										<td class="w-7 p-3 py-2 text-center">${board.board_viewCount}</td>
									</tr>`;
								});
							}
							posts.innerHTML = searchPosts;
							bindLikeEvent();
						},
		error: function(err) {
			alertMsg = searchWord + "을(를) 검색하는 데 실패했습니다."
			showAlert(alertMsg);
		}
	});
}

// 게시글 작성일 범위로 검색하면 그 기간 안에 작성된 게시글 목록만 필터링되어 보임.
function searchPostsByDate() {
	let fromDate = inputDateType.querySelectorAll("input[type='date']")[0].value;
	let toDate = inputDateType.querySelectorAll("input[type='date']")[1].value;
	
	//searchDate
}