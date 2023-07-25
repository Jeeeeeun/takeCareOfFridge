var currentIndex = 0;
var frgIndex,
  frgName,
  frgShape,
  checkedRadio,
  hRadio,
  vRadio,
  sRadio,
  frgAstate,
  frgBstate,
  aFrozenBtn,
  aCoolBtn,
  bFrozenBtn,
  bCoolBtn,
  frgInfoChangeBtn,
  frgCorrectionEndBtn,
  dangerousStandard,
  warningStandard,
  dangerousValue,
  warningValue,
  dangerousSpan,
  warningSpan,
  trfCorrectionEndBtn,
  announcement,
  alertMsg,
  alertContent,
  alertWindow,
  confirmMsg,
  confirmContent,
  confirmWindow;

window.onload = function () {
  // DOM 객체 위에서 선언해둔 거 이렇게 onload 안에서 초기화시키면 여러 함수에서 전역변수처럼 쓸 수 있음.
  frgIndex = document.querySelector("#frg_index");
  frgName = document.querySelectorAll(".frg_name");
  frgShape = document.querySelectorAll(".frg_shape");
  hRadio = document.querySelector("#hRadio");
  vRadio = document.querySelector("#vRadio");
  sRadio = document.querySelector("#sRadio");
  frgAstate = document.querySelector("#myFrgAstate");
  frgBstate = document.querySelector("#myFrgBstate");
  aFrozenBtn = document.querySelector("#frgAfrozenBtn");
  aCoolBtn = document.querySelector("#frgAcoolBtn");
  bFrozenBtn = document.querySelector("#frgBfrozenBtn");
  bCoolBtn = document.querySelector("#frgBcoolBtn");
  frgInfoChangeBtn = document.querySelector("#frgInfoChange");
  frgCorrectionEndBtn = document.querySelector("#frgInfoCorrectionEndBtn");
  trfChangeBtn = document.querySelector("#standardChange");
  standardWrapper = document.querySelector("#standards-wrapper");
  dangerousStandard = document.querySelector("#dangerousStandard");
  warningStandard = document.querySelector("#warningStandard");
  dangerousSpan = document.querySelector("#dangerousSpan");
  warningSpan = document.querySelector("#warningSpan");
  trfCorrectionEndBtn = document.querySelector("#trfCorrectionEndBtn");
  announcement = document.querySelector("#announcement");
  alertContent = document.querySelector("#alertContent");
  alertWindow = document.querySelector("#customAlert");
  confirmContent = document.querySelector("#confirmContent");
  confirmWindow = document.querySelector("#customConfirm");

  updateFrg(currentIndex);
  checkedRadio = document.querySelector('input[name="frg_shape"]:checked'); // 순서 중요

  // 첫 렌더링 시에는 값 지정
  dangerousValue = trfStandard[0].dangerous_standard;
  warningValue = trfStandard[0].warning_standard;

  trfStandardShow(dangerousValue, warningValue);
};

// 사용자 정보 가져오기
function getUserInfo(){
    $.ajax({
        url: `${contextPath}/frg/userInfo`,
        method: "GET",
        dataType: "json",
        success: function(data){
                $('#name').val(data.user_name);
                $('#id').val(data.user_id);
                $('#email').val(data.user_email);
                $('#pw').val(data.user_pw);
        },
        error: function(xhr, status, error) {
            console.error("Error: ", error);
            alert("사용자 정보를 불러오는데 실패했습니다."); // 오류가 발생하면 메시지 표시
        }
    });
}
//사용자 정보 가져온 함수를 불러와서 페이지가 생성되면서 해당 정보를 가져옴
$(document).ready(function() {
    getUserInfo();
});

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

// 컨펌창 켜기
function showConfirm(confirmMsg, yesClicked, noClicked) {
  confirmContent.textContent = confirmMsg;
  confirmWindow.classList.remove("hidden");
  confirmWindow.classList.add("show");

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
  confirmWindow.classList.remove("show");
  confirmWindow.classList.add("hidden");
}

// 처음 렌더링 될 때, 또는 냉장고 정보 바꾸는 화살표 prev(◀)든 next(▶)든 눌리면 실행될 함수
function updateFrg(i) {
  frgIndex.value = frgListJson[i].frg_index;
  frgName[0].textContent = frgListJson[i].frg_name;
  frgName[1].value = frgListJson[i].frg_name;

  switch (frgListJson[i].frg_shape) {
    case "H":
      frgShape[0].src = window.contextPath + "/resources/img/hFrgLabel.svg";
      frgShape[0].style.height = "80%";
      frgShape[0].style.width = "auto";
      hRadio.setAttribute("checked", ""); // hRadio.checked = true;도 같은 효과를 내지만, 실제로 라디오버튼 요소에 checked 속성을 추가해주진 못함.
      vRadio.removeAttribute("checked");
      sRadio.removeAttribute("checked");
      frgAstate.style.position = "relative";
      frgAstate.style.fontWeight = "bold";
      frgBstate.style.position = "relative";
      frgBstate.style.fontWeight = "bold";
      frgBstate.style.display = "flex";
      break;
    case "V":
      frgShape[0].src = window.contextPath + "/resources/img/vFrgLabel.svg";
      frgShape[0].style.height = "80%";
      frgShape[0].style.width = "auto";
      hRadio.removeAttribute("checked");
      vRadio.setAttribute("checked", "");
      sRadio.removeAttribute("checked");
      frgAstate.style.position = "relative";
      frgAstate.style.fontWeight = "bold";
      frgBstate.style.position = "relative";
      frgBstate.style.fontWeight = "bold";
      frgBstate.style.display = "flex";
      break;
    case "S":
      frgShape[0].src = window.contextPath + "/resources/img/sFrgLabel.svg";
      frgShape[0].style.height = "80%";
      frgShape[0].style.width = "auto";
      hRadio.removeAttribute("checked");
      vRadio.removeAttribute("checked");
      sRadio.setAttribute("checked", "");
      frgAstate.style.position = "relative";
      frgAstate.style.fontWeight = "bold";
      frgBstate.style.display = "none";
      bFrozenBtn.removeAttribute("selected");
      bCoolBtn.removeAttribute("selected");
      break;
  }

  // A 상태에 대한 코드
  switch (frgListJson[i].frg_Astate) {
    case "frozen":
      aFrozenBtn.setAttribute("selected", "");
      aCoolBtn.removeAttribute("selected");
      aFrozenBtn.className = "frgSelected";
      aCoolBtn.className = "frgNotSelected";
      break;
    case "cool":
      aFrozenBtn.removeAttribute("selected");
      aCoolBtn.setAttribute("selected", "");
      aFrozenBtn.className = "frgNotSelected";
      aCoolBtn.className = "frgSelected";
      break;
  }

  // B 상태에 대한 코드
  switch (frgListJson[i].frg_Bstate) {
    case "frozen":
      bFrozenBtn.setAttribute("selected", "");
      bCoolBtn.removeAttribute("selected");
      bFrozenBtn.className = "frgSelected";
      bCoolBtn.className = "frgNotSelected";
      break;
    case "cool":
      bFrozenBtn.removeAttribute("selected");
      bCoolBtn.setAttribute("selected", "");
      bFrozenBtn.className = "frgNotSelected";
      bCoolBtn.className = "frgSelected";
      break;
  }
}

function prevFrg() {
  // 이전 냉장고 보는 화살표 버튼 누르면

  // 지금 냉장고가 맨 처음 냉장고 아니지? 맨 처음 거 아니면 아래 로직 실행해줘.
  if (currentIndex > 0) {
    // 앞 일련번호로 냉장고 정보 바꿔줘
    currentIndex--;
    updateFrg(currentIndex);

    // 모든 냉장고 정보 수정될 수 있게 read-only 해제 돼 있으면
    if (
      !(
        frgName[1].disabled &&
        hRadio.disabled &&
        vRadio.disabled &&
        sRadio.disabled &&
        aFrozenBtn.disabled &&
        aCoolBtn.disabled &&
        bFrozenBtn.disabled &&
        bCoolBtn.disabled
      )
    ) {
      // 해제된 정보들 칸 다시 read-only로 만들어줘.
      frgName[1].disabled = true;
      hRadio.disabled = true;
      vRadio.disabled = true;
      sRadio.disabled = true;
      aFrozenBtn.disabled = true;
      aCoolBtn.disabled = true;
      bFrozenBtn.disabled = true;
      bCoolBtn.disabled = true;

      // 수정 완료 버튼 숨겨줘.
      frgCorrectionEndBtn.style.display = "none";

      // 수정하기 버튼 숨겼던 거 다시 드러내줘.
      frgInfoChangeBtn.style.display = "flex";
    }
  }
}

function nextFrg() {
  // 지금 냉장고가 맨 마지막 냉장고 아니지? 그러면 아래 로직 실행해줘
  if (currentIndex < frgListJson.length - 1) {
    // 뒷 일련번호로 냉장고 정보 바꿔줘
    currentIndex++;
    updateFrg(currentIndex);

    // 모든 냉장고 정보 수정될 수 있게 read-only 해제 돼있으면
    if (
      !(
        frgName[1].disabled &&
        hRadio.disabled &&
        vRadio.disabled &&
        sRadio.disabled &&
        aFrozenBtn.disabled &&
        aCoolBtn.disabled &&
        bFrozenBtn.disabled &&
        bCoolBtn.disabled
      )
    ) {
      // 해제된 정보들 칸 다시 read-only로 만들어줘.
      frgName[1].disabled = true;
      hRadio.disabled = true;
      vRadio.disabled = true;
      sRadio.disabled = true;
      aFrozenBtn.disabled = true;
      aCoolBtn.disabled = true;
      bFrozenBtn.disabled = true;
      bCoolBtn.disabled = true;

      // 수정 완료 버튼 숨겨줘.
      frgCorrectionEndBtn.style.display = "none";

      // 수정하기 버튼 숨겼던 거 다시 드러내줘.
      frgInfoChangeBtn.style.display = "flex";
    }
  }
}

// 신호등 기준 값 보여주기, 화면 처음 렌더링 될 때
function trfStandardShow(dangerStandard, warnStandard) {
  // 첫 렌더링 시에만 값을 할당
  if (!dangerStandard && !warnStandard) {
    dangerStandard = trfStandard[0].dangerous_standard;
    warnStandard = trfStandard[0].warning_standard;
  }

  // 첫 렌더링이 아니라면 여기서부터 실행됨
  if (dangerStandard > 0) {
    dangerousStandard.value = dangerStandard;
    dangerousSpan.textContent = "일 지남";
  } else {
    dangerStandard = Math.abs(dangerStandard);
    dangerousStandard.value = dangerStandard;
    dangerousSpan.textContent = "일 남음";
  }

  if (warnStandard > 0) {
    warningStandard.value = warnStandard;
    warningSpan.textContent = "일 지남";
  } else {
    warnStandard = Math.abs(warnStandard);
    warningStandard.value = warnStandard;
    warningSpan.textContent = "일 남음";
  }
}

function trfStandardBtnClicked() {
  // 신호등 기준 수정하기 버튼(펜 모양 아이콘) 클릭하면

  // 수정하기 버튼(펜 모양 아이콘) 숨기기
  trfChangeBtn.style.display = "none";

  // 수정 완료 버튼 숨겨져 있던 것 등장
  trfCorrectionEndBtn.style.display = "flex";

  // 안내 문구 없을 때 벌려놓은 공간 일시적으로 좁힘
  announcement.style.height = "2%";

  // 두 개의 세로 기준선 아래로 안내 문구 등장
  // (작성하는 숫자는 D-Day 개념입니다. D-10은 유통기한 10일 남음 => -10 작성)
  // (반드시 왼쪽(dangerous) 숫자가 오른쪽(warning) 숫자보다 큰 정수여야 합니다.)
  let mention =
    "작성 예시1) -10: 유통/소비기한 10일 남음\n작성 예시2) +5: 유통/소비기한 5일 지남\n★ 왼쪽 숫자(위험 판단 기준)가 오른쪽 숫자(경고 판단 기준)보다 큰 숫자여야 합니다.";
  const announce = document.createElement("pre"); // pre: 사전에 서식이 지정된(preformatted) 텍스트 태그를 말함.

  announce.textContent = mention;

  announce.style.color = "red";
  announce.style.fontSize = "60%";
  announce.style.margin = 0;
  announce.style.position = "absolute";
  announce.style.top = "43%";
  announce.style.margin = "0 3%";

  announcement.appendChild(announce);

  // input 태그들의 위치, 너비 일시적인 조정
  standardWrapper.style.width = "80%";
  standardWrapper.style.marginLeft = "10%";

  // 위험 기준 input 태그 조작
  dangerousStandard.value = dangerousValue;
  dangerousStandard.disabled = false;
  dangerousStandard.style.borderStyle = "dashed";
  dangerousStandard.style.borderWidth = "1px";
  dangerousStandard.style.borderColor = "#c9bc9c";

  // 위험 기준 input 태그 옆 "일 지남", "일 남음" 부분 글씨 일시적 삭제
  dangerousSpan.textContent = "";

  // 경고 기준 input 태그 조작
  warningStandard.value = warningValue;
  warningStandard.disabled = false;
  warningStandard.style.borderStyle = "dashed";
  warningStandard.style.borderWidth = "1px";
  warningStandard.style.borderColor = "#c9bc9c";

  // 경고 기준 input 태그 옆 "일 지남", "일 남음" 부분 글씨 일시적 삭제
  warningSpan.textContent = "";
}

function trfCorrectionEnd() {
  // 신호등 내용 수정 완료 버튼 클릭하면

  // SESS_ID를 가져오는 함수를 호출
  getUserId()
    .then(function (userId) {
      // jsp에서 값 가져와서 data라는 변수의 JSON 형태로 저장
      const updatedTrfData = {
        user_id: userId,
        dangerous: parseInt(dangerousStandard.value, 10),
        warning: parseInt(warningStandard.value, 10),
      };

      // 다시 렌더링을 위한 값 지정
      dangerousValue = updatedTrfData.dangerous;
      warningValue = updatedTrfData.warning;

      // 값 크기 비교 (유효하게 들어갈 수 있는지 검사)
      if (updatedTrfData.dangerous <= updatedTrfData.warning) {
        alertMsg =
          "위험 판단 기준이 경고 판단 기준보다 숫자가 커야 합니다.\n값을 다시 입력해 주세요.";
        showAlert(alertMsg);
        return;
      } else if (
        dangerousStandard.value === "" ||
        warningStandard.value === ""
      ) {
        alertMsg = "숫자가 입력되지 않은 곳이 있습니다. 다시 입력해 주세요.";
        showAlert(alertMsg);
        return;
      }

      // ajax로 값을 서버로 넘겨 수정 및 저장됨
      $.ajax({
        type: "POST",
        url: `${contextPath}/frg/trfStandardChange`,
        contentType: "application/json",
        data: JSON.stringify(updatedTrfData),
        dataType: "json",
        success: function (response) {
          // "일 지남", "일 남음" 부분 글씨와 함께 바뀐 데이터로 재등장
          trfStandardShow(dangerousValue, warningValue);

          // 안내 문구 삭제
          const announcePre = announcement.querySelector("pre"); // announcement란 id 가진 요소 안에 있는 <pre> 태그
          if (announcePre) {
            // 만약 <pre> 태그가 있으면
            announcement.removeChild(announcePre); // 없애줘
          }

          // 안내 문구 없을 때 확보해둔 공간 회복
          announcement.style.height = "14%";

          setTimeout(function () {
            // 시간차 두고 알림창 띄우기
            alertMsg = "냉장고 속 식품 보관 관리 기준이 변경되었습니다.";
            showAlert(alertMsg);
          }, 100);
        },
        error: function (err) {
          alertMsg = "냉장고 식품 보관 관리 기준 변경에 실패했습니다.";
          showAlert(alertMsg);
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

      // 기준 input 칸 다시 read-only로
      dangerousStandard.disabled = true;
      warningStandard.disabled = true;

      // input 태그들 위치, 너비, 스타일 원상복귀
      standardWrapper.style.width = "86%";
      standardWrapper.style.marginLeft = "16%";

      dangerousStandard.style.borderStyle = "solid";
      dangerousStandard.style.borderWidth = "0px";
      dangerousStandard.style.borderColor = "transparent";

      warningStandard.style.borderStyle = "solid";
      warningStandard.style.borderWidth = "0px";
      warningStandard.style.borderColor = "transparent";

      // 숨겨졌던 수정하기 버튼 등장
      trfChangeBtn.style.display = "flex";

      // 드러나 있던 수정 완료 버튼 숨김
      trfCorrectionEndBtn.style.display = "none";
    })
    .catch(function (error) {
      console.error("사용자 ID를 얻는 데 실패했습니다:", error);
    });
}

function frgInfoChangeBtnClicked() {
  // 냉장고 수정하기 버튼(펜 모양 아이콘) 클릭하면

  // 냉장고 수정하기 버튼 숨기기
  frgInfoChangeBtn.style.display = "none";

  // read-only 풀어줘
  frgName[1].disabled = false;
  hRadio.disabled = false;
  vRadio.disabled = false;
  sRadio.disabled = false;
  aFrozenBtn.disabled = false;
  aCoolBtn.disabled = false;
  bFrozenBtn.disabled = false;
  bCoolBtn.disabled = false;

  // 냉장고 이름 칸에 focus 잡아줘. 커서는 맨 끝에!
  frgName[1].focus();

  frgName[1].addEventListener("focus", function () {
    const frgNameLength = this.value.length;

    this.setSelectionRange(frgNameLength, frgNameLength);
  });

  // 수정완료 버튼 숨겨진 거 보여줘
  frgCorrectionEndBtn.style.display = "flex";
}

function radioBtnClicked(e) {
  // 냉장고 정보 수정할 때 라디오 버튼 눌리면

  // 클릭된 라디오 버튼 찾기
  const clickedRadio = e.target;

  // 그게 기존에 눌려있던 라디오 버튼과 다를 때
  if (checkedRadio.value !== clickedRadio.value) {
    // 기존 선택됐던 라디오 버튼의 checked 속성을 없애주고
    checkedRadio.removeAttribute("checked");

    // 새로 선택된 라디오 버튼에 checked 속성을 추가해줘
    clickedRadio.setAttribute("checked", "");

    // 왼쪽 상자에 보이는 냉장고 모양 그림 바꿔줘
    switch (clickedRadio.value) {
      case "H":
        frgShape[0].src = window.contextPath + "/resources/img/hFrgLabel.svg";
        break;
      case "V":
        frgShape[0].src = window.contextPath + "/resources/img/vFrgLabel.svg";
        break;
      case "S":
        frgShape[0].src = window.contextPath + "/resources/img/sFrgLabel.svg";
        frgBstate.style.display = "none";
        bFrozenBtn.removeAttribute("selected");
        bCoolBtn.removeAttribute("selected");
        break;
    }

    // 선택된 라디오 버튼을 checkedRadio로 업데이트
    checkedRadio = clickedRadio;
  }
}

function frgStateBtnClicked(e) {
  // 냉장고 정보 수정할 때 냉장고 상태 버튼이 클릭되면

  // 클릭된 버튼 찾기
  const clickedButton = e.target;

  // 선택된 상대 버튼 찾기 (같은 냉장고 상태 안의 다른 버튼)
  const siblingButton = clickedButton.parentElement.querySelector(
    `button.frgSelected:not(#${clickedButton.id})`
  );

  // 클릭한 버튼이 frgSelected를 갖고 있지 않았다면, 아래 로직 실행
  if (!clickedButton.classList.contains("frgSelected")) {
    clickedButton.classList.remove("frgNotSelected");
    clickedButton.classList.add("frgSelected");
    clickedButton.setAttribute("selected", "");

    if (siblingButton) {
      siblingButton.classList.remove("frgSelected");
      siblingButton.classList.add("frgNotSelected");
      siblingButton.removeAttribute("selected");
    }

    if (clickedButton === aFrozenBtn || clickedButton === aCoolBtn) {
      // A 버튼 클릭 시, B 버튼 상태 변경
      bFrozenBtn.classList.toggle("frgSelected");
      bFrozenBtn.classList.toggle("frgNotSelected");
      bCoolBtn.classList.toggle("frgSelected");
      bCoolBtn.classList.toggle("frgNotSelected");

      // selected 속성 조절
      if (bFrozenBtn.classList.contains("frgSelected")) {
        bFrozenBtn.setAttribute("selected", "");
        bCoolBtn.removeAttribute("selected");
      } else {
        bCoolBtn.setAttribute("selected", "");
        bFrozenBtn.removeAttribute("selected");
      }
    } else if (clickedButton === bFrozenBtn || clickedButton === bCoolBtn) {
      // B 버튼 클릭 시, A 버튼 상태 변경
      aFrozenBtn.classList.toggle("frgSelected");
      aFrozenBtn.classList.toggle("frgNotSelected");
      aCoolBtn.classList.toggle("frgSelected");
      aCoolBtn.classList.toggle("frgNotSelected");

      // selected 속성 조절
      if (aFrozenBtn.classList.contains("frgSelected")) {
        aFrozenBtn.setAttribute("selected", "");
        aCoolBtn.removeAttribute("selected");
      } else {
        aCoolBtn.setAttribute("selected", "");
        aFrozenBtn.removeAttribute("selected");
      }
    }
  }
}

function frgCorrectionEnd() {
  // 냉장고 정보 수정 완료 버튼 클릭하면

  // SESS_ID를 가져오는 함수를 호출
  getUserId()
    .then(function (userId) {
      // jsp에서 값 가져와서 updatedFrgdata라는 변수의 JSON 형태로 저장
      const updatedFrgData = {
        user_id: userId,
        frg_index: frgIndex.value,
        frg_name: frgName[1].value,
        frg_shape: checkedRadio.value,
        frg_Astate: frgAstate.querySelector("button[selected]").value,
        frg_Bstate:
          checkedRadio.value === "S"
            ? null
            : frgBstate.querySelector("button[selected]").value,
      };

      // 혹시 frg_name 비어있지는 않은지 확인
      if (frgName[1] === null || frgName[1].value === "") {
        alertMsg = "냉장고 이름을 올바르게 입력하세요.";
        showAlert(alertMsg);
        frgName[1].focus();
        return;
      }

      // 다시 렌더링해서 보여줄 데이터 지정
      frgName[0].textContent = updatedFrgData.frg_name;
      frgName[1].value = updatedFrgData.frg_name;

      switch (updatedFrgData.frg_shape) {
        case "H":
          frgShape[0].src = window.contextPath + "/resources/img/hFrgLabel.svg";
          hRadio.setAttribute("checked", "");
          vRadio.removeAttribute("checked");
          sRadio.removeAttribute("checked");
          break;
        case "V":
          frgShape[0].src = window.contextPath + "/resources/img/vFrgLabel.svg";
          hRadio.removeAttribute("checked");
          vRadio.setAttribute("checked", "");
          sRadio.removeAttribute("checked");
          break;
        case "S":
          frgShape[0].src = window.contextPath + "/resources/img/sFrgLabel.svg";
          hRadio.removeAttribute("checked");
          vRadio.removeAttribute("checked");
          sRadio.setAttribute("checked", "");
          frgBstate.style.display = "none";
          break;
      }

      switch (updatedFrgData.frg_Astate) {
        case "frozen":
          aFrozenBtn.setAttribute("selected", "");
          aCoolBtn.removeAttribute("selected");
          aFrozenBtn.className = "frgSelected";
          aCoolBtn.className = "frgNotSelected";
          break;
        case "cool":
          aFrozenBtn.removeAttribute("selected");
          aCoolBtn.setAttribute("selected", "");
          aFrozenBtn.className = "frgNotSelected";
          aCoolBtn.className = "frgSelected";
          break;
      }

      switch (updatedFrgData.frg_Bstate) {
        case "frozen":
          bFrozenBtn.setAttribute("selected", "");
          bCoolBtn.removeAttribute("selected");
          bFrozenBtn.className = "frgSelected";
          bCoolBtn.className = "frgNotSelected";
          break;
        case "cool":
          bFrozenBtn.removeAttribute("selected");
          bCoolBtn.setAttribute("selected", "");
          bFrozenBtn.className = "frgNotSelected";
          bCoolBtn.className = "frgSelected";
          break;
      }

      // ajax으로 값 넘기기
      $.ajax({
        type: "POST",
        url: `${contextPath}/frg/frgInfoChange`,
        contentType: "application/json",
        data: JSON.stringify(updatedFrgData),
        dataType: "json",
        success: function (response) {
          alertMsg = "냉장고 정보가 성공적으로 변경되었습니다.";
          showAlert(alertMsg);
        },
        error: function (err) {
          alertMsg = "냉장고 정보 변경에 실패했습니다.";
          showAlert(alertMsg);
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
      // 숨겨졌던 수정하기 버튼 등장
      frgInfoChangeBtn.style.display = "flex";

      // 드러나 있던 수정 완료 버튼 숨김
      frgCorrectionEndBtn.style.display = "none";
    })
    .catch(function (error) {
      console.error("사용자 ID를 얻는 데 실패했습니다:", error);
    });
}

function frgDiscardBtnClicked() {
  // 냉장고 삭제 버튼 클릭되면

  // 정말 삭제하겠냐고 묻는 알림창
  confirmMsg = "정말 삭제하시겠습니까?";
  showConfirm(
    confirmMsg,
    function () {
      // Y 클릭하면
      // SESS_ID를 가져오는 함수를 호출
      getUserId().then(function (userId) {
        const deleteData = {
          user_id: userId,
          frg_name: frgName[1].value,
        };

        $.ajax({
          type: "POST",
          url: `${contextPath}/frg/removeFrgList`,
          contentType: "application/json",
          data: JSON.stringify(deleteData),
          dataType: "json",
          success: function () {
            alertMsg = "냉장고가 성공적으로 삭제되었습니다.";
            showAlert(alertMsg);

            // 렌더링된 냉장고 목록에서 삭제된 냉장고를 지우고, 렌더링할 냉장고 개수(currentIndex)를 실제로도 줄여줌.
            removeFrgFromList(deleteData.frg_name);

            // 삭제된 냉장고가 현재 인덱스와 같거나 클 때만 이전 인덱스로 이동
            if (frgListJson.length > 0 && currentIndex >= frgListJson.length) {
              currentIndex--;
            }

            // 남은 냉장고가 있다면 바로 이전 순서의 냉장고를 보여줌.
            if (frgListJson.length > 0) {
              updateFrg(currentIndex);
            } else { // 남은 냉장고가 하나도 없다면
              alertMsg = "등록된 냉장고가 없습니다. 잠시 후 냉장고 등록 페이지로 이동합니다.";
              showAlert(alertMsg);
              // 3.5초 후 냉장고 추가 페이지로 이동
              setTimeout(function () {
                window.location.href = `${contextPath}/frg/frgAdd`;
              }, 3500);
            }
          },
          error: function (err) {
            alertMsg = "냉장고 정보 삭제에 실패했습니다.";
            showAlert(alertMsg);
            if (err.status === 404) {
              alertMsg = "요청한 페이지를 찾을 수 없습니다.";
              showAlert(alertMsg);
            } else if (err.status === 500) {
              alertMsg =
                "서버 내부 오류가 발생했습니다. 관리자에게 문의하세요.";
              showAlert(alertMsg);
            } else {
              alertMsg = "error가 발생했습니다. " + err;
              showAlert(alertMsg);
            }
          },
        });
      });
    },
    function () {
      // N 클릭하면
      return;
    }
  );
}

function removeFrgFromList(frgName) {
  frgListJson = frgListJson.filter((frgListJson) => frgListJson.frg_name !== frgName);
}

//세션 만료 관련 , 해당 로직은 바꿀것이 없다.
function checkSession(){
    $.ajax({
        url: `${contextPath}/frg/sessionExpire`,
        method: "GET",
        dataType: "json",
        success: function(data){
            if(data.sessionExpired){            
                alert("다시 로그인 해주세요.");
                window.location.href = `${contextPath}/frg/login`;
            }
        },
        error: function(xhr, status, error){
        	alert("다시 로그인 해주세요.");
            window.location.href = `${contextPath}/frg/login`;
            console.error("Error: ", error);
        }
    });
}
//일정 시간 간격으로 세션 상태 확인 (세션 만료 관련 ajax와 세트)
setInterval(checkSession, 1000 * 60 * 60 * 24 + 1000); //24:00:01 마다 세션 검토