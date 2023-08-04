// 고유 id 만들려고 변수 생성
let idCounter = 0;

// 전역변수로 사용할 변수 선언
let settingBoxElement, trashIcon;

// 페이지 로딩되자마자, DOM 객체 캐치
document.addEventListener("DOMContentLoaded", () => {
	const firstSettingBox = document.querySelector('.settingBox');
	const firstFormTrashIcon = firstSettingBox.querySelector('#trashIcon_0');
	firstFormTrashIcon.addEventListener("click", () => {
		removeSettingBoxById(0);
	});
});

/* --------------- 냉장고 등록 form (settingBox) 생성 관련 --------------- */

// 화면 아래쪽 + 버튼 눌렀을 때
function plusBtnClicked() {
	idCounter++;
	createNewSettingBox(idCounter);
}

// 새 setting 박스 만들기
function createNewSettingBox(idNum) {
	const settingBoxWrapper = document.querySelector(".settingBoxWrapper");
	const settingBoxElement = document.createElement("div");
	settingBoxElement.innerHTML = `
		<hr id="horizontalLine_${idNum}" class="horizontalLine" style="border-style:dashed;"/>
		<div id="settingBox_${idNum}" class="settingBox d-flex flex-column position-relative vw-60 vh-75 mx-auto">
			<div class="w-100 mt-3p mb-2 text-end">
				<div class="w-100 text-white">
					<i id="trashIcon_${idNum}" class="fa-solid fa-trash"></i>
				</div>
			</div>
			<div class="d-grid d-grid-col-25-75 d-grid-row-40-60 justify-content-sm-center align-items-sm-center gap-2 fs-xl fw-semibold text-white position-relative vw-60 vh-70 mx-auto">
				<div class="setting-titleBox">냉장고 모양</div>
				<div class="setting-itemBox">
					<div>
						<input type="radio" name="frg_shape" id="horizon" value="H" onclick="radioClicked(event, this.nextElementSibling)" />
						<label for="horizon">
							<img id="ho_${idNum}" class="ho" alt="가로형 냉장고" src="${ contextPath }/resources/img/hFrgLabel.svg" />
						</label>
					</div>
					<div>
						<input type="radio" name="frg_shape" id="vertical" value="V" onclick="radioClicked(event, this.nextElementSibling)" />
						<label for="vertical">
							<img id="ve_${idNum}" class="ve" alt="세로형 냉장고" src="${ contextPath }/resources/img/vFrgLabel.svg" />
						</label>
					</div>
					<div>
						<input type="radio" name="frg_shape" id="single" value="S" onclick="radioClicked(event, this.nextElementSibling)" />
						<label for="single">
							<img id="si_${idNum}" class="si" alt="단일형 냉장고" src="${ contextPath }/resources/img/sFrgLabel.svg" />
						</label>
					</div>
				</div>
				<div class="setting-titleBox">냉장고 정보</div>
				<div class="setting-itemBox">
					<div class="selected-fridge"></div>
					<div class="fridge-info">
						<div class="fridgeInfoBox">
							<div class="w-100">
								<label class="fridgeInfoLabelName" for="frg_name_${idNum}">이름</label>
								<input class="fridgeInfoInput" id="frg_name_${idNum}" name="frg_name_${idNum}" />
							</div>
							<div class="w-100">
								<label class="fridgeInfoLabelState">A</label>
								<button type="button" name="frg_Astate_${idNum}" value="cool" class="stateSelectBtn" onclick="stateBtnClicked(this, ${idNum})">
									냉장
								</button>
								<button type="button" name="frg_Astate_${idNum}" value="frozen" class="stateSelectBtn" onclick="stateBtnClicked(this, ${idNum})">
									냉동
								</button>
							</div>
							<div class="w-100">
								<label class="fridgeInfoLabelState">B</label>
								<button type="button" name="frg_Bstate_${idNum}" value="cool" class="stateSelectBtn" onclick="stateBtnClicked(this, ${idNum})">
									냉장
								</button>
								<button type="button" name="frg_Bstate_${idNum}" value="frozen" class="stateSelectBtn" onclick="stateBtnClicked(this, ${idNum})">
									냉동
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		`;

	settingBoxElement
		.querySelectorAll("input[type='radio']")
		.forEach((radioBtn) => {
			const radioId = radioBtn.getAttribute("id");
			const newId = `${radioId}_${idNum}`;
			const radioName = radioBtn.getAttribute("name");
			const newName = `${radioName}_${idNum}`;
			const labelFor = settingBoxElement.querySelector(`label[for="${radioId}"]`);

			radioBtn.setAttribute("id", newId); // innerHTML에서 ${idNum}을 더해주지 않아도 저절로 들어갔던 이유
			radioBtn.setAttribute("name", newName); // innerHTML에서 ${idNum}을 더해주지 않아도 저절로 들어갔던 이유
			labelFor.setAttribute("for", newId);  // innerHTML에서 ${idNum}을 더해주지 않아도 저절로 들어갔던 이유

			radioBtn.addEventListener("click", (e) =>
				radioClicked(e, labelFor, idNum)
			);
		});

	const horizonRadio = settingBoxElement.querySelector(`#horizon_${idNum}`);
	const horizonLabel = settingBoxElement.querySelector(`label[for="horizon_${idNum}"]`);

	horizonRadio.onclick = function (event) {
		radioClicked(event, horizonLabel, idNum);
	};

	const verticalRadio = settingBoxElement.querySelector(`#vertical_${idNum}`);
	const verticalLabel = settingBoxElement.querySelector(`label[for="vertical_${idNum}"]`);

	verticalRadio.onclick = function (event) {
		radioClicked(event, verticalLabel, idNum);
	};

	const singleRadio = settingBoxElement.querySelector(`#single_${idNum}`);
	const singleLabel = settingBoxElement.querySelector(`label[for="single_${idNum}"]`);

	singleRadio.onclick = function (event) {
		radioClicked(event, singleLabel, idNum);
	};

	// settingBox별 삭제(trashIcon) 아이콘
	trashIcon = settingBoxElement.querySelector(`#trashIcon_${idNum}`);
	trashIcon.addEventListener("click", () => removeSettingBoxById(idNum));

	settingBoxWrapper.appendChild(settingBoxElement);
}





/* --------------- settingBox 안의 버튼 조작 기능 --------------- */

// 라디오 버튼 클릭하면 -> 선택한 냉장고의 모양이 아래쪽에 등장
function radioClicked(e, label, idNum) {
	const selectedRadio = e.target;

	// 클릭된 라디오 버튼이 속한 settingBox 요소를 찾음
	const settingBox = e.target.closest(".settingBox");

	// settingBox 안에 있는 모든 라디오 버튼 DOM 객체 지정
	const radios = settingBox.querySelectorAll(`input[name="frg_shape_${idNum}"]`);

	// 이전에 클릭되어 있었을 라디오 버튼은 모두 선택 취소 처리
	radios.forEach((radio) => (radio.checked = false));

	// 이번에 클릭한 라디오 버튼만 선택 처리
	selectedRadio.checked = true;

	// 라디오 버튼과 연결된 <label>에 있는 <img> 태그 DOM 객체 지정 
	const img = label.querySelector("img");

	// 선택된 이미지의 경로를 변수로 지정
	const imgSrc = img.src;

	// selected-fridge라는 class를 가진 요소를 찾음 (선택한 냉장고 이미지가 뜰 점선 테두리 박스 캐치)
	const selectedFridge = settingBox.querySelector(".selected-fridge");

	// 기존에 이미지가 떠 있는 게 있으면 삭제
	while (selectedFridge.firstChild) {
		selectedFridge.removeChild(selectedFridge.firstChild);
	}

	// <label>에서 가져온 이미지 파일을 새로 만든 selecedFrgImg라는 <img>에 넣음
	var selectedFrgImg = document.createElement("img");
	selectedFrgImg.src = imgSrc;
	selectedFrgImg.alt = img.alt;

	// selecedFridge에 추가한 <img> 요소의 스타일 지정
	selectedFrgImg.style.display = "flex";
	selectedFrgImg.style.justifyContent = "center";
	selectedFrgImg.style.width = "80%";
	selectedFrgImg.style.height = "80%";

	// selectedFrgImg를 selectedFridge 점선 박스에 집어 넣음
	selectedFridge.appendChild(selectedFrgImg);

	// 클릭된 라디오 버튼이 속한 settingBox 요소의 하위 A, B 라벨과 버튼 DOM 객체 지정
	const fridgeInfoLabelStates = settingBox.querySelectorAll(".fridgeInfoLabelState");
	const stateSelectBtns = settingBox.querySelectorAll(".stateSelectBtn");

	// 냉장고 종류(H, V, S)에 따라 A, B 섹션 레이블과 버튼의 보임 여부를 결정
	const selectedShape = e.target.value;
	if (selectedShape === "S") {
		// 단일형 냉장고(S) 선택 시, A 섹션만 보이고 B 섹션 숨김
		fridgeInfoLabelStates[0].style.display = "inline-block";
		stateSelectBtns[0].style.display = "inline-block";
		stateSelectBtns[1].style.display = "inline-block";
		fridgeInfoLabelStates[1].style.display = "none";
		stateSelectBtns[2].style.display = "none";
		stateSelectBtns[3].style.display = "none";

		// frg_Bstate 버튼 중 선택된 것 선택 취소
		const selectedBstateBtn = settingBox.querySelector(`button[name="frg_Bstate_${idNum}"].selected`);
		if (selectedBstateBtn) {
			selectedBstateBtn.classList.remove("selected");
		}
	} else {
		// 가로형 냉장고(H) 또는 세로형 냉장고(V) 선택 시, A, B 섹션 모두 보임
		fridgeInfoLabelStates[0].style.display = "inline-block";
		stateSelectBtns[0].style.display = "inline-block";
		stateSelectBtns[1].style.display = "inline-block";
		fridgeInfoLabelStates[1].style.display = "inline-block";
		stateSelectBtns[2].style.display = "inline-block";
		stateSelectBtns[3].style.display = "inline-block";
	}
}

// 냉장고 A, B 섹션 이름 선택 버튼 동작 스위칭 기능
function stateBtnClicked(clickedBtn, idNum) {

	// 클릭된 버튼이 어떤 settingBox에 있어?
	const settingBox = clickedBtn.closest(".settingBox");

	// 클릭된 버튼의 name 속성값과 같은 값을 가진 버튼들 다 가져와 (예, button[name^='frg_Astate_']인 버튼 2개 - cool과 frozen)
	const btns = settingBox.querySelectorAll(`button[name="${clickedBtn.name}"]`);

	if (!clickedBtn.classList.contains("selected")) {
		// 클릭된 버튼에 selected 속성이 추가되어 있다면

		// 클릭된 버튼의 value와 다른 값을 가진 버튼들만 필터링 해서 가져와. (똑같은 name 안에서)
		const correspondingBtns = Array.from(btns).filter(
			(btn) => btn.value !== clickedBtn.value
		);

		// 다른 value를 가진 버튼이 1개면 (즉, 클릭된 버튼과 반대의 value를 가진 버튼인 것을)
		if (correspondingBtns.length === 1) {

			// 반대의 value를 가진 버튼에서는 selected 속성을 지워줘
			correspondingBtns[0].classList.remove("selected");

			// 클릭된 버튼에서는 select 속성을 추가해줘
			clickedBtn.classList.add("selected");

		} else {

			// 클릭된 버튼에서는 select 속성을 추가해줘
			clickedBtn.classList.add("selected");
		}

		// A 버튼들 2개 가져와
		const frg_AstateBtns = settingBox.querySelectorAll(`button[name="frg_Astate_${idNum}"]`);

		// B 버튼들 2개 가져와
		const frg_BstateBtns = settingBox.querySelectorAll(`button[name="frg_Bstate_${idNum}"]`);

		if (clickedBtn.name === `frg_Astate_${idNum}`) {
			// 만약, 클릭된 버튼이 A 버튼들 중의 하나라면

			// 클릭된 버튼의 value 값과 다른 B 버튼을 골라줘
			const correspondingB = Array.from(frg_BstateBtns).find(
				(btn) => btn.value !== clickedBtn.value
			);

			// B 버튼들의 value를 검사해서 클릭된 A 버튼과 value 값이 같은 버튼은
			frg_BstateBtns.forEach((btn) => {
				if (btn !== correspondingB) {
					
					// selected 속성 없애줘
					btn.classList.remove("selected");
				}
			});

			// 클릭된 A 버튼과 value 값이 다른 버튼에 selected 속성을 추가해줘
			correspondingB.classList.add("selected");

		} else if (clickedBtn.name === `frg_Bstate_${idNum}`) {
			// 만약, 클릭된 버튼이 B 버튼들 중의 하나라면

			// 클릭된 버튼의 value 값과 다른 A 버튼을 골라줘
			const correspondingA = Array.from(frg_AstateBtns).find(
				(btn) => btn.value !== clickedBtn.value
			);

			// A 버튼들의 value를 검사해서 클릭된 B 버튼과 value 값이 같은 버튼은
			frg_AstateBtns.forEach((btn) => {
				if (btn !== correspondingA) {

					// selected 속성 없애줘
					btn.classList.remove("selected");
				}
			});

			// 클릭된 B 버튼과 value 값이 다른 버튼에 selected 속성을 추가해줘
			correspondingA.classList.add("selected");
		}
	}
}


/* --------------- 한 명의 회원에게는 똑같은 이름의 냉장고를 만들 수 없게 하기 위한 중복 방지 검사 --------------- */

// 기존에 있는 냉장고 이름들을 가져오는 함수 (중복 확인 목적)
function getExistingFrgNames(user_Id) {
	return fetch(`${contextPath}/frg/getFrgNames?user_id=${user_Id}`)
	.then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			throw new Error("냉장고 이름 목록을 가져오는 데 실패했습니다.");
		}
	});
}

// 냉장고 이름 중복 확인
function checkFrgNameDuplication(newFrgNames, existingFrgNames) {
	const duplicatedNames = newFrgNames.filter((name) => {
		return existingFrgNames.includes(name);
	});
	
	if (duplicatedNames.length > 0) { // 겹치는 이름이 한 개라도 있으면
		alertMsg = `${duplicatedNames.join(', ')}(이)라는 냉장고 이름이 이미 존재합니다.`;
		showAlert(alertMsg);
		return false;
	}
	return true;
}


/* --------------- 서버로 데이터를 넘기기 전 유효한 값이 전부 있는지 확인 절차 ---------------- */

// 각 settingBox 별로 라디오 버튼들 중에서 최소한 하나는 선택되어 있는 것 맞지?
function checkAtLeastOneRadioBtnSelected(idNum) {
	const hRadio = document.querySelector(`input[id="horizon_${idNum}"]`);
	const vRadio = document.querySelector(`input[id="vertical_${idNum}"]`);
	const sRadio = document.querySelector(`input[id="single_${idNum}"]`);
	
	// hRadio, vRadio, sRadio 검사를 수행하기 전에 이들이 존재하는지 확인
	if (hRadio && vRadio && sRadio) {
		if (!hRadio.checked && !vRadio.checked && !sRadio.checked) {
			return hRadio; // 라디오 버튼이 비어있으면 첫 번째 빈 라디오 버튼 요소를 반환
		}
	}
	return null; // 비어있는 라디오 버튼이 없으면(즉, 최소 하나의 radio 버튼이 선택돼 있다면) null 반환
}

// 모든 settingBox에서 라디오버튼 하나씩 다 선택 돼 있어?
function checkAllGroupsOfRadios(numberOfSettingBoxes) {
	for (let i = 0; i < numberOfSettingBoxes; i++) {

		const hRadio = document.querySelector(`input[id="horizon_${i}"]`);
		if(!hRadio) continue; // hRadio가 없으면 다음 i로 이동

		if (checkAtLeastOneRadioBtnSelected(i) !== null) {
			return false; // 빈 라디오 버튼 그룹이 하나라도 있으면 false 반환
		}
	}
	return true; // 빈 라디오 버튼 그룹이 하나도 없으면 true 반환
}

// 냉장고 이름 비어 있어?
function checkFrgNameFilledIn(idNum) {
	const fridgeName = document.querySelector(`input[id="frg_name_${idNum}"]`);

	if (fridgeName) {
		if(fridgeName.value.trim() === '') {
			return fridgeName; // 빈 곳이 있으면 첫 번째 비어있는 frgName 요소 반환
		}
	}
	return null; // 냉장고 이름이 다 채워져 있거나 아예 settingBox가 삭제돼서 그 번호의 입력란이 없으면 null 반환
}

// 모든 settingBox에서 냉장고 이름 비어있는지 전부 검사해줘.
function checkAllGroupsOfFrgNames(numberOfSettingBoxes) {
	for (let i = 0; i < numberOfSettingBoxes; i++) {

		const frgName = document.querySelector(`input[id="frg_name_${i}"]`);
		if (!frgName) continue; // frgName이 없으면 다음 i로 이동

		if (checkFrgNameFilledIn(i) !== null) {
			return false; // 빈 곳이 한 군데라도 있으면 false 반환
		}
	}
	return true; // 빈 곳이 한 군데도 없으면 true 반환
}

// 냉장고 보관 상태 버튼 체크 돼 있지?
// (single 냉장고에서는 Bstate 없고, horizon이든 vertical이든 Astate가 체크돼 있으면 Bstate는 자동으로 선택되니까 A만 검사하자)
function checkFrgStateBtnSelected(idNum) {
	const fridgeAstate = document.querySelector(`button[name="frg_Astate_${idNum}"]`);

	if (fridgeAstate) {
		if (!fridgeAstate.classList.contains('selected')) {
			return fridgeAstate; // 냉장고 상태 버튼 선택된 게 없으면 그 요소를 반환
		}
	}
    return null; // 냉장고 상태 버튼 선택돼 있거나 그 idNum에 해당하는 frgAstate 버튼이 없으면 null 반환
}

// 냉장고 보관 상태 버튼 전부 체크되어 있는지 검사해줘.
function checkAllGroupsOfFrgStates(numberOfSettingBoxes) {
	for (let i = 0; i < numberOfSettingBoxes; i++) {

		const fridgeAstate = document.querySelector(`button[name="frg_Astate_${i}"]`);
		if (!fridgeAstate) continue; // fridgeAstate가 없으면 다음 i로 이동

		if (checkFrgStateBtnSelected(i) !== null) {
			return false; // 냉장고 보관 상태 버튼 선택 안 된 곳이 한 군데라도 있으면 false 반환
		}
	}
	return true; // 냉장고 보관 상태 버튼 선택 안 된 곳이 하나도 없으면 true 반환
}

// 혹시 라디오 버튼, 냉장고 이름, 냉장고 보관상태 A, B 중 빈 요소 있으면 등록 실패할 수 있으니까 그 빈 요소가 어떤 건지 찾아줘.
function getFirstEmptyElement(numberOfSettingBoxes) {
	for (let i = 0; i < numberOfSettingBoxes; i++) {
		const emptyRadio = checkAtLeastOneRadioBtnSelected(i);
		const emptyFrgName = checkFrgNameFilledIn(i);
		const emptyFrgState = checkFrgStateBtnSelected(i);

		// 각각의 DOM 객체를 확인해서 비어있는 곳이 있으면, 그 첫 번째 요소 자체와 그 요소가 무엇인지를 반환
		if(emptyRadio) {
			return {element: emptyRadio, type: 'radio'};
		}

		if(emptyFrgName) {
			return {element: emptyFrgName, type: 'frgName'};
		}

		if(emptyFrgState) {
			return {element: emptyFrgState, type: 'frgState'};
		}
	}

	return null; // 모든 요소 빈 게 없으면 null 반환
}

// 아예 통째로 내용이 비어있는 settingBox는 없는 거야?
function getEmptySettingBox(numberOfSettingBoxes) {

	// 비어있는 settingBox의 idNum(인덱스) 모아보자.
    let emptySettingBoxes = [];

	// settingBox들의 개수만큼 반복해서 세 요소가 모두 비어있는지 검사하자
    for (let i = 0; i < numberOfSettingBoxes; i++) {
        const emptyRadio = checkAtLeastOneRadioBtnSelected(i);
        const emptyFrgName = checkFrgNameFilledIn(i);
        const emptyFrgState = checkFrgStateBtnSelected(i);

        // 세 가지 요소가 모두 비어 있으면 해당 settingBox의 idNum(인덱스)을 빈 settingBox 목록에 추가
        if (emptyRadio && emptyFrgName && emptyFrgState) { 
            emptySettingBoxes.push(i);
        }
    }

	// 비어있는 settingBox가 몇 번 idNum을 가진 settingBox들인지 그 번호들의 배열을 반환
    return emptySettingBoxes;
}

// submit 전 빈 form 자동 삭제하기
function removeEmptySettingBoxes(emptySettingBoxes, settingBoxes) {
	return new Promise((resolve) => {
		emptySettingBoxes.forEach((indexOfEmptySettingBox, idx, array) => {
			// indexOfEmptySettingBox: 반복중인 배열 emptySettingBoxes의 인덱스
			// idx: forEach를 반복하고 있는 인덱스(for문의 i 같은 느낌)
			// array: forEach를 호출한 원본 배열, 즉 emptySettingBoxes 배열 그 자체

			settingBoxes[indexOfEmptySettingBox].remove();

			// emptySettingBoxes 배열의 맨 마지막 요소까지 왔으면
			if (idx === array.length -1) {
				resolve();
				// resolve(): 시간차를 두고 실행되는 '비동기' 작업 정상적으로 완료됐을 때 호출되는 함수
				// 이 함수는 정상적으로 실행됐음을 알린 후
				// 이후에 붙는 then 안의 함수를 실행함.

				// 그니까 이 함수의 역할은 이 순간 즉시 끝났음을 의미.
			}
		});
	});
}

// settingBox를 idNum에 따라서 개별적으로 삭제
function removeSettingBoxById(idNum) {

	// settingBox들 모두를 감싸고 있는 settingBoxWrapper 데려와
	const settingBoxWrapper = document.querySelector(".settingBoxWrapper");
	
	// settingBoxWrapper에 있는 settingBox가 딱 1개뿐일 때
	if (settingBoxWrapper.querySelectorAll(".settingBox").length === 1) {
		alertMsg = "양식이 1개만 남았을 때는 삭제하실 수 없습니다.";
		showAlert(alertMsg);
		return;
	}
	
	// 버리려는 settingBox가 뭔지 찾아줘
	const discardSettingBox = settingBoxWrapper.querySelector(`#trashIcon_${idNum}`).closest(".settingBox");
  
	// 버리려는 settingBox가 맨 처음 있는 settingBox인지 확인
	const isFirstSettingBox = discardSettingBox === settingBoxWrapper.querySelector(".settingBox"); // true or false
  
	// 버리려는 settingBox가 맨 처음 있는 settingBox인지 여부에 따라서
	// settingBox들을 구분 짓는 가로선 horizontalLine 어떤 것이 지워져야 하는지 달라짐
	let shouldBeRemovedHorizontalLine;

	if (isFirstSettingBox) {
		// 맨 처음에 있는 settingBox면

		// 지울 settingBox 아래에 있는 horizontalLine이 바로 지우려는 horizontalLine이야. (위쪽에는 horizontalLine이 없을 거거든.)
		shouldBeRemovedHorizontalLine = document.querySelector(`#horizontalLine_${parseInt(idNum) + 1}`);
	} else {
		// 맨 처음에 있는 settingBox가 아니면
		
		// 지울 settingBox 위에 있는 horizontalLine이 바로 지우려는 horizontalLine이야.
		shouldBeRemovedHorizontalLine = document.querySelector(`#horizontalLine_${idNum}`);
	}
  
	// 컨펌창으로 settingBox 버리는 거 진짜 맞는지 확인
	confirmMsg = "선택하신 양식을 삭제할까요?";
	showConfirm (
		confirmMsg, // 컨펌 메시지 띄워줌
		function () {
			// Yes 눌렀을 때 동작
		
			if (shouldBeRemovedHorizontalLine) { // 지워야 할 horizontalLine이 만약에 있으면
				shouldBeRemovedHorizontalLine.remove(); // 지워줘
			}
			discardSettingBox.remove(); // 휴지통 아이콘 누른 그 settingBox 지워줘
		},
		function () {
			// No 눌렀을 때 동작
			return;
		}
	);
}
  

// SESS_ID 데려오려는 함수
function getUserId() {
	return fetch(contextPath + "/frg/getUserId")
	.then(function (response) {
		if (response.ok) {
			return response.text();
		} else {
			throw new Error("User ID를 가져올 수 없었습니다.");
		}
	});
}

// 서버로 보낼 데이터 추출
function extractDataFromSettingBox(settingBox, idNum) {
	const frgShapeName = settingBox.querySelector('input[type="radio"]').name;
	const frgShape = settingBox.querySelector(`input[name="${frgShapeName}"]:checked`);
	
	const frgName = settingBox.querySelector(`input[name="frg_name_${idNum}"]`);
	
	const frgAstate = settingBox.querySelector(`button[name="frg_Astate_${idNum}"].selected`);
	
	// frgShape의 값이 'S'이면 frg_Bstate는 null로 설정됨
	const frgBstate = frgShape && frgShape.value === "S" ? null : settingBox.querySelector(`button[name="frg_Bstate_${idNum}"].selected`);
	
	// 빈 settingBox 있으면 그 idNum에 대한 데이터 추출은 즉시 종료 (JSON 데이터 만들기는 실행 안 됨)
	if (!settingBox || !frgShape || !frgName || !frgAstate || (frgShape.value !== "S" && !frgBstate)) {
		return Promise.resolve(null);
	}
	
	return getUserId().then(function (userId) {
		// getUserId(). then()에서 생성되는 Promise 객체가 getUserId()의 반환값을 기다려서 받은 다음

		// JSON 데이터를 생성해서 반환
		return {
			user_id: userId,
			frg_shape: frgShape.value,
			frg_name: frgName.value,
			frg_Astate: frgAstate.value,
			frg_Bstate: frgBstate ? frgBstate.value : null,
		};
	});
}
  

// 완료 버튼 클릭하면
function submitBtnClicked(e) {
	
	// submit 버튼의 기본 동작은 무효화
	e.preventDefault();
	
	// 모든 settingBox들 가져와
	const settingBoxes = document.querySelectorAll(".settingBox");

	// settingBox들의 개수
	const numberOfSettingBoxes = settingBoxes.length;
  
	// 비어있는 settingBox들의 idNum으로 이뤄진 배열
	const emptySettingBoxes = getEmptySettingBox(numberOfSettingBoxes);
	
	if (emptySettingBoxes.length > 0) {
		// 비어있는 settingBox가 있으면
		
		// 비어있는 settingBox의 idNum에 1을 더한 배열을 새로 생성
		const indexesOfEmptySettingBoxes = emptySettingBoxes.map((i) => i + 1);

		// 비어있는 settingBox가 사용자가 보기에 몇 번째 박스인지 알려주는 메시지 지정
		confirmMsg = `${indexesOfEmptySettingBoxes.join(", ")}번째 박스가 비어있습니다. 삭제할까요?`;
		
		// 컨펌창 실행
		showConfirm(confirmMsg, () => {
			// Yes 클릭하면

			// 빈 박스 지워주고
			removeEmptySettingBoxes(emptySettingBoxes, settingBoxes).then(() => {

				// 삭제된 빈 박스를 제외한 꽉 찬 settingBox들의 집합인 updatedSettingBoxes를 얻음
				const updatedSettingBoxes = document.querySelectorAll(".settingBox");

				// 진짜 등록 완료 처리
				completeSubmittingForm(updatedSettingBoxes, settingBoxes);
			});
		}, () => {
			// No 클릭하면 컨펌창 꺼지고 원래 화면으로 return
			return;
		});
	} else {

		// 빈 settingBox 없으면 진짜 등록 완료 처리
		completeSubmittingForm(numberOfSettingBoxes, settingBoxes);
	}
}

// 빈 form 없으면 냉장고 등록 완료 처리할 함수
function completeSubmittingForm(numberOfSettingBoxes, settingBoxes) {
	
	// 라디오 버튼 체크 or 냉장고 이름 or 보관 상태 빈 곳 있어?
	if (checkAllGroupsOfRadios(numberOfSettingBoxes) 
		&& checkAllGroupsOfFrgNames(numberOfSettingBoxes)
		&& checkAllGroupsOfFrgStates(numberOfSettingBoxes)) {

		// 빈 곳 없으면 아래 내용 실행해줘.

		// 냉장고 이름에 붙은 idNum을 추출해서 배열을 만들어줘
		const idNums = Array.from(settingBoxes).map((settingBox) => {

			// 냉장고 이름 입력란을 찾아줘
			const frgNameInput = settingBox.querySelector(`input[name^="frg_name_"]`);

			// 그 냉장고 이름 입력란의 name 속성값 끝에 붙은 숫자로 된 문자열을 가져온 다음에
			const idNum = frgNameInput.name.split("_")[2];
	
			// 숫자화 해서 idNums라는 배열에 넣어줘.
			return parseInt(idNum);
		});
	
		// idNums 배열에 있는 요소를 사용해서 extractDataFromSettingBox로 만든 JSON 데이터들을 settingBoxesDataPromises라는 배열에 넣어줘
		const settingBoxesDataPromises = idNums.map((idNum, index) => {
			return extractDataFromSettingBox(settingBoxes[index], idNum);
		});
	
		// extractDataFromSettingBox()에 있는 모든 Promise가 성공적으로  완료될 때까지,
		// 즉 settingBoxesDataPromises가 완성되기를 기다린 다음 .then()을 실행해줘
		Promise.all(settingBoxesDataPromises)
			.then(function (settingBoxesData) {

				// 빈 settingBox 데이터가 혹시 있다면 필터링해서 제외하고 꽉 찬 settingBox의 데이터만 가져와
				settingBoxesData = settingBoxesData.filter(data => data !== null);
	
				// 새로 등록할 냉장고들의 이름을 배열로 만들어줘
				const newFrgNames = settingBoxesData.map((data) => data.frg_name);
				
				// return 안을 반환해줘
				return getUserId() // User ID를 받아온 다음
				.then((userId) => getExistingFrgNames(userId)) // 그 User ID에 이미 있는 냉장고 이름들을 가져와서
				.then((existingFrgNames) => {
					if(checkFrgNameDuplication(newFrgNames, existingFrgNames)) {
						// 새로 등록할 냉장고 이름들에 기존에 등록되어 있던 이름이 없으면 서버에 요청을 보냄

						$.ajax({
							type: "POST", // HTTP 요청 방식
							url: `${contextPath}/frg/frgAdd_form`, // 이 AJAX 요청을 받을 목적지
							contentType: "application/json; charset=UTF-8", // 서버로 보낼 데이터의 MIME 타입을 설정. JSON 타입의 데이터를 UTF-8 인코딩으로 전송함
							data: JSON.stringify(settingBoxesData), // 서버로 전송할 데이터. settingBoxesData 객체를 JSON 형식의 문자열로 변형해서 보냄을 의미
							dataType: "json", // 서버에서 반환되는 데이터의 MIME 타입을 설정.
							success: function (response) { // 요청이 성공적으로 수행되면 실행될 콜백 함수
								alertMsg = "냉장고 등록이 완료되었습니다.";
								showAlert(alertMsg);
								window.location.href = `${contextPath}/frg/frgShow`;
							},
							error: function (err) { // 요청에 실패하면 실행될 콜백 함수
								alertMsg = "냉장고 등록에 실패했습니다.";
								showAlert(alertMsg);
								if (err.status === 404) {
									alertMsg = "요청한 페이지를 찾을 수 없습니다.";
									showAlert(alertMsg);
								} else if (err.status === 500) {
									alertMsg = "서버 내부 오류가 발생했습니다.";
									showAlert(alertMsg);
								} else {
									alertMsg = "알 수 없는 오류가 발생했습니다";
									showAlert(alertMsg);
								}
							},
						})
					}
				})
			})
			.catch(function (error) { // Promise.all이 실패하면 에러 발생
				console.error(error);
			});
	} else {

		// 냉장고 모양, 냉장고 이름, 냉장고 보관 상태 중에서 어디가 비었어? 비어있는 첫 번째 요소로 가자
		const firstEmptyInfo = getFirstEmptyElement(numberOfSettingBoxes);

		switch (firstEmptyInfo.type) {
			case 'radio':
				showAlert('냉장고 모양을 선택하지 않은 곳이 있습니다.');
				break;
			case 'frgName':
				showAlert('냉장고 이름을 작성하지 않은 곳이 있습니다.');
				break;
			case 'frgState':
				showAlert('냉장고 보관 상태를 선택하지 않은 곳이 있습니다.');
				break;
		}

		firstEmptyInfo.element.focus(); // 빈 곳으로 focus 가자.
			
		window.scrollIntoView({ // 그 위치로 자동 스크롤
			behavior: 'smooth'
		});
	}
}