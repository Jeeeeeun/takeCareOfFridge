var currentIndex = 0;
var frgName, frgShape, hRadio, vRadio, sRadio, frgAstate, frgBstate, aFrozenBtn, aCoolBtn, bFrozenBtn, bCoolBtn, frgInfoChangeBtn, frgCorrectionEndBtn;

window.onload = function () {
	// DOM 객체 위에서 선언해둔 거 이렇게 onload 안에서 초기화시키면 여러 함수에서 전역변수처럼 쓸 수 있음.
	frgName = document.getElementsByClassName("frg_name");
	frgShape = document.getElementsByClassName("frg_shape");
	hRadio = document.getElementById("hRadio");
	vRadio = document.getElementById("vRadio");
	sRadio = document.getElementById("sRadio");
	frgAstate = document.getElementById("myFrgAstate");
	frgBstate = document.getElementById("myFrgBstate");
	aFrozenBtn = document.getElementById("frgAfrozenBtn");
	aCoolBtn = document.getElementById("frgAcoolBtn");
	bFrozenBtn = document.getElementById("frgBfrozenBtn");
	bCoolBtn = document.getElementById("frgBcoolBtn");
	frgInfoChangeBtn = document.getElementById("frgInfoChange");
	frgCorrectionEndBtn = document.getElementById("frgInfoCorrectionEndBtn");

	updateFrg(currentIndex);
};

// 처음 렌더링 될 때, 또는 냉장고 정보 바꾸는 화살표 prev(◀)든 next(▶)든 눌리면 실행될 함수
function updateFrg(i) {
	
	frgName[0].textContent = frgListJson[i].frg_name;
	frgName[1].value = frgListJson[i].frg_name;

  switch (frgListJson[i].frg_shape) {
    case "H":
      frgShape[0].src = window.contextPath + "/resources/img/hFrgLabel.svg";
      frgShape[0].style.height = "80%";
      frgShape[0].style.width = "auto";
      hRadio.checked = true;
      vRadio.checked = false;
      sRadio.checked = false;
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
      hRadio.checked = false;
      vRadio.checked = true;
      sRadio.checked = false;
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
      hRadio.checked = false;
      vRadio.checked = false;
      sRadio.checked = true;
      frgAstate.style.position = "relative";
      frgAstate.style.fontWeight = "bold";
      frgBstate.style.display = "none";
      bFrozenBtn.selected = false;
      bCoolBtn.selected = false;
      break;
  }

  // A 상태에 대한 코드
  switch (frgListJson[i].frg_Astate) {
    case "frozen":
      aFrozenBtn.selected = false;
      aCoolBtn.selected = true;
      aFrozenBtn.className = "frgSelected";
      aCoolBtn.className = "frgNotSelected";
      break;
    case "cool":
      aFrozenBtn.selected = true;
      aCoolBtn.selected = false;
      aFrozenBtn.className = "frgNotSelected";
      aCoolBtn.className = "frgSelected";
      break;
  }

  // B 상태에 대한 코드
  switch (frgListJson[i].frg_Bstate) {
    case "frozen":
      bFrozenBtn.selected = true;
      bCoolBtn.selected = false;
      bFrozenBtn.className = "frgSelected";
      bCoolBtn.className = "frgNotSelected";
      break;
    case "cool":
      bFrozenBtn.selected = false;
      bCoolBtn.selected = true;
      bFrozenBtn.className = "frgNotSelected";
      bCoolBtn.className = "frgSelected";
      break;
  }
}

function prevFrg() {
	// 이전 냉장고 보는 화살표 버튼 누르면
	
	// 지금 냉장고가 맨 처름 냉장고 아니지? 맨 처음 거 아니면 아래 로직 실행해줘.
	if (currentIndex > 0) {

		// 앞 일련번호로 냉장고 정보 바꿔줘
		currentIndex--;
		updateFrg(currentIndex);
		
		// 모든 냉장고 정보 수정될 수 있게 read-only 해제 돼있으면 
 		if (!(frgName[1].disabled && hRadio.disabled && vRadio.disabled && sRadio.disabled && aFrozenBtn.disabled && aCoolBtn.disabled && bFrozenBtn.disabled && bCoolBtn.disabled)) {
 		
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
		if (!(frgName[1].disabled && hRadio.disabled && vRadio.disabled && sRadio.disabled && aFrozenBtn.disabled && aCoolBtn.disabled && bFrozenBtn.disabled && bCoolBtn.disabled)) {
		
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

function trfStandardBtnClicked() {
	// 신호등 기준 수정하기 버튼(펜 모양 아이콘) 클릭하면
	
		// 수정하기 버튼(펜 모양 아이콘) 숨기기
		
		// 두 개의 세로 기준선 아래로 안내 문구 등장
		// (작성하는 숫자는 D-Day 개념입니다. D-10은 유통기한 10일 남음 => -10 작성)
		// (반드시 왼쪽(dangerous) 숫자가 오른쪽(warning) 숫자보다 큰 정수여야 합니다.)
		
		// 기준 값이 나와있는 부분 innerText 초기화 + input 태그 비활성화 해제

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
	
	// 수정완료 버튼 숨겨진 거 보여줘
	frgCorrectionEndBtn.style.display = "flex";
}

function frgDiscardBtnClicked() {
	// 냉장고 삭제 버튼 클릭되면
	
	// 정말 삭제하겠냐고 묻는 알림창
		// Y 클릭하면
			// 진짜 지워줌
		// N 클릭하면
			// 원래 화면 유지
}

function radioBtnClicked() {
	// 냉장고 정보 수정할 때 라디오 버튼 눌리면
	
	// 그게 기존에 눌려있던 라디오 버튼과 다를 때
		// 왼쪽 상자에 보이는 냉장고 모양 그림 바꿔줘
}

function frgStateBtnClicked(e) {
	// 냉장고 상태 버튼이 클릭되면

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

		if (siblingButton) {
			siblingButton.classList.remove("frgSelected");
			siblingButton.classList.add("frgNotSelected");
		}

		if (clickedButton === aFrozenBtn || clickedButton === aCoolBtn) {
			// A 버튼 클릭 시, B 버튼 상태 변경
			bFrozenBtn.classList.toggle("frgSelected");
			bFrozenBtn.classList.toggle("frgNotSelected");
			bCoolBtn.classList.toggle("frgSelected");
			bCoolBtn.classList.toggle("frgNotSelected");
		} else if (clickedButton === bFrozenBtn || clickedButton === bCoolBtn) {
			// B 버튼 클릭 시, A 버튼 상태 변경
			aFrozenBtn.classList.toggle("frgSelected");
			aFrozenBtn.classList.toggle("frgNotSelected");
			aCoolBtn.classList.toggle("frgSelected");
			aCoolBtn.classList.toggle("frgNotSelected");
		}
	}
}

function frgCorrectionEnd() {
	// 냉장고 정보 수정 완료 버튼 클릭하면
	
	// 버튼 눌린거 맞는지 한 번 확인
	console.log("수정완료 버튼 클릭됨");
	
	// ajax으로 값 넘기기
	
	// 단, 넘어가는 frg_shape === "S"일 경우에는 Bstate는 무조건 null로 강제 넘김 처리
}