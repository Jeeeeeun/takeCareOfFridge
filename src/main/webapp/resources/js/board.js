let fullHeart, emptyHeart, addLikeData, cancelLikeData, fullHeartTemplate, emptyHeartTemplate, newFullHeart, newEmptyHeart, likeNum;

window.onload = function () {
  fullHeart = document.querySelectorAll("[id^=full-heart-]");
  emptyHeart = document.querySelectorAll("[id^=empty-heart-]");

emptyHeart.forEach(function (heart) {
    heart.addEventListener("click", function () {
      // board_index 가져오기
      let boardIndex = heart.getAttribute("data-board-index");

      // SESS_ID를 가져오는 함수를 호출
      getUserId()
        .then(function (userId) {
          addLikeData = {
            board_index: boardIndex,
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
            
            console.log(response.updatedLike);
            // 꽉 찬 하트로 바꾸기
              fullHeartTemplate = `<span id="full-heart-${boardIndex}" data-board-index="${boardIndex}"><i class="fa-solid fa-heart"></i>&nbsp;<span id="likeNum-${boardIndex}">${response.updatedLike}</span></span>`;
              heart.outerHTML = fullHeartTemplate;
              
              // 꽉 찬 하트에 addEventListener 추가하기
              newFullHeart = document.getElementById(`full-heart-${boardIndex}`);
              newFullHeart.addEventListener("click", function() {
              	// 화면에 좋아요 수 업데이트 하기
  likeNum = document.getElementById(`likeNum-${boardIndex}`);
  likeNum.textContent = response.updatedLike;
              });
            },
            error: function (err) {
              // TODO: 좋아요 처리 실패시 처리
            },
          });
        })
        .catch(function (error) {
          // TODO: 사용자 ID를 가져오는 데 실패한 경우 처리
        });
    });
  });
  

  fullHeart.forEach(function (heart) {
    heart.addEventListener("click", function () {
      // board_index 가져오기
      let boardIndex = heart.getAttribute("data-board-index");

      // SESS_ID를 가져오는 함수를 호출
      getUserId()
        .then(function (userId) {
          cancelLikeData = {
            board_index: boardIndex,
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
              emptyHeartTemplate = `<span id="empty-heart-${boardIndex}" data-board-index="${boardIndex}"><i class="fa-regular fa-heart"></i>&nbsp;<span id="likeNum-${boardIndex}">${response.updatedLike}</span></span>`;
              heart.outerHTML = emptyHeartTemplate;
              
              // 빈 하트에 addEventListener 추가하기
              newEmptyHeart = document.getElementById(`empty-heart-${boardIndex}`);
              newEmptyHeart.addEventListener("click", function() {
              // 화면에 좋아요 수 업데이트 하기
  likeNum = document.getElementById(`likeNum-${boardIndex}`);
  likeNum.textContent = response.updatedLike;
              });
            },
            error: function (err) {
              // TODO: 좋아요 취소 실패시 처리
            },
          });
        })
        .catch(function (error) {
          // TODO: 사용자 ID를 가져오는 데 실패한 경우 처리
        });
    });
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

// 검색 버튼 누르면 게시글 결과에서 관련 글만 필터링

// + 버튼 누르면 게시글 작성 페이지로 이동