// 고유 id 만들려고 변수 생성
let idCounter = 0;

// 전역변수로 사용할 변수 선언
let alertMsg, alertContent, alertWindow, confirmMsg, confirmContent, confirmWindow, confirmYesBtn, confirmNoBtn;

// 페이지 로딩되자마자, DOM 객체 캐치
window.onload = function() {
	alertContent = document.querySelector("#alertContent");
	alertWindow = document.querySelector("#customAlert");
	confirmContent = document.querySelector("#confirmContent");
	confirmWindow = document.querySelector("#customConfirm");
	confirmYesBtn = document.querySelector("#confirmYesBtn");
	confirmNoBtn = document.querySelector("#confirmNoBtn");
}

// 알림창 띄우기
function showAlert(alertMsg) {
	alertContent.textContent = alertMsg;
	alertWindow.classList.remove("hidden");
	alertWindow.classList.add("show");
	
	setTimeout(function () {
		alertWindow.classList.remove("show");
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

// 화면 아래쪽 + 버튼 눌렀을 때 settingBox 추가 생성
function plusBtnClicked() {
	idCounter++;
	createNewSettingBox(idCounter);
}

// 새 setting 박스 만들기
function createNewSettingBox(idNum) {
	const settingBoxWrapper = document.querySelector(".settingBoxWrapper");
	const settingBoxElement = document.createElement("div");
	settingBoxElement.innerHTML = `
		<hr class="horizontalLine" style="border-style: dashed">					
		<div class="settingBox d-flex flex-column position-relative vw-60 vh-75 mx-auto">
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

	settingBoxWrapper.appendChild(settingBoxElement);
}

// 냉장고 모양 라디오 버튼 클릭하면 아래쪽에 선택한 냉장고의 모양이 등장하게 처리
function radioClicked(e, label, idNum) {
	const selectedRadio = e.target;

	// 클릭된 라디오 버튼이 속한 settingBox 요소를 찾음
	const settingBox = e.target.closest(".settingBox");
	const radios = settingBox.querySelectorAll(`input[name="frg_shape_${idNum}"]`);

	radios.forEach((radio) => (radio.checked = false));
	selectedRadio.checked = true;

	const img = label.querySelector("img");
	const imgSrc = img.src;

	// selected-fridge라는 class를 가진 요소를 찾음
	const selectedFridge = settingBox.querySelector(".selected-fridge");

	// 기존에 이미지가 있으면 삭제
	while (selectedFridge.firstChild) {
		selectedFridge.removeChild(selectedFridge.firstChild);
	}

	// 새로 생성한 이미지 요소를 selectedFridge에 추가
	var selectedFrgImg = document.createElement("img");
	selectedFrgImg.src = imgSrc;
	selectedFrgImg.alt = img.alt;
	selectedFrgImg.style.display = "flex";
	selectedFrgImg.style.justifyContent = "center";
	selectedFrgImg.style.width = "80%";
	selectedFrgImg.style.height = "80%";
	selectedFridge.appendChild(selectedFrgImg);

	// 클릭된 라디오 버튼이 속한 settingBox 요소의 하위 A, B 라벨과 버튼 찾기
	const fridgeInfoLabelStates = settingBox.querySelectorAll(".fridgeInfoLabelState");
	const stateSelectBtns = settingBox.querySelectorAll(".stateSelectBtn");

	// 냉장고 종류(H, V, S)에 따라 A, B 섹션 레이블과 버튼의 display 속성 조작
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
	const settingBox = clickedBtn.closest(".settingBox");
	const btns = settingBox.querySelectorAll(`button[name="${clickedBtn.name}"]`);

	// 선택된 버튼의 클래스 추가 또는 제거
	if (!clickedBtn.classList.contains("selected")) {

		// 중복된 value 값이 있는지 확인
		const correspondingBtns = Array.from(btns).filter(
			(btn) => btn.value !== clickedBtn.value
		);

		if (correspondingBtns.length === 1) {
			correspondingBtns[0].classList.remove("selected");
			clickedBtn.classList.add("selected");
		} else {
			clickedBtn.classList.add("selected");
		}

		// A 버튼과 B 버튼 사이의 동작 처리
		const frg_AstateBtns = settingBox.querySelectorAll(`button[name="frg_Astate_${idNum}"]`);
		const frg_BstateBtns = settingBox.querySelectorAll(`button[name="frg_Bstate_${idNum}"]`);

		if (clickedBtn.name === `frg_Astate_${idNum}`) {
			const correspondingB = Array.from(frg_BstateBtns).find(
				(btn) => btn.value !== clickedBtn.value
			);

			frg_BstateBtns.forEach((btn) => {
				if (btn !== correspondingB) {
					btn.classList.remove("selected");
				}
			});

			correspondingB.classList.add("selected");

		} else if (clickedBtn.name === `frg_Bstate_${idNum}`) {
			const correspondingA = Array.from(frg_AstateBtns).find(
				(btn) => btn.value !== clickedBtn.value
			);

			frg_AstateBtns.forEach((btn) => {
				if (btn !== correspondingA) {
					btn.classList.remove("selected");
				}
			});

			correspondingA.classList.add("selected");
		}
	}
}

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

// 각 settingBox 별로 라디오 버튼들 중에서 최소한 하나는 선택되어 있는 것 맞지?
function checkAtLeastOneRadioBtnSelected(idNum) {
	const hRadio = document.querySelector(`input[id="horizon_${idNum}"]`);
	const vRadio = document.querySelector(`input[id="vertical_${idNum}"]`);
	const sRadio = document.querySelector(`input[id="single_${idNum}"]`);

	if (!hRadio.checked && !vRadio.checked && !sRadio.checked) {
		return hRadio; // 라디오 버튼이 비어있으면 첫 번째 빈 라디오 버튼 요소를 반환
	}
	return null; // 비어있는 라디오 버튼이 없으면 null 반환
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

	if(fridgeName.value.trim() === '') {
		return fridgeName; // 빈 곳이 있으면 첫 번째 비어있는 frgName 요소 반환
	} else {
		return null; // 빈 곳 없으면 null 반환
	}
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

    if (!fridgeAstate.classList.contains('selected')) {
        return fridgeAstate; // 냉장고 상태 버튼 선택된 게 없으면 그 요소를 반환
    }
    return null; // 냉장고 상태 버튼 선택돼 있으면 null 반환
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

// 혹시 빈 요소 있어서 등록 실패하면 빈 요소 찾아줘.
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

// 아예 settingBox가 통째로 빈 form은 없는 거야?
function getEmptySettingBox(numberOfSettingBoxes) {

    let emptySettingBoxes = [];

    for (let i = 0; i < numberOfSettingBoxes; i++) {
        const emptyRadio = checkAtLeastOneRadioBtnSelected(i);
        const emptyFrgName = checkFrgNameFilledIn(i);
        const emptyFrgState = checkFrgStateBtnSelected(i);

			console.log("emptyRadio " + i + emptyRadio);
        	console.log("emptyFrgName " + i + emptyFrgName);
        	console.log("emptyFrgState " + i + emptyFrgState);

        // 세 가지 요소가 모두 비어 있으면 해당 setting box의 인덱스를 빈 setting box 목록에 추가
        if (emptyRadio && emptyFrgName && emptyFrgState) {
        	console.log("Add to emptySettingBoxes:", i); 
            emptySettingBoxes.push(i);
        }
    }

    return emptySettingBoxes;
}

// 빈 form은 삭제하자.
function removeEmptySettingBoxes(emptySettingBoxes, settingBoxes) {
	return new Promise((resolve) => {
		emptySettingBoxes.forEach((indexOfEmptySettingBox, idx, array) => {
			settingBoxes[indexOfEmptySettingBox].remove();
			if (idx === array.length -1) {
				resolve();
				// resolve(): 시간차를 두고 실행되는 '비동기' 작업 정상적으로 완료됐을 때 호출되는 함수
				// 이 함수는 정상적으로 실행됐음을 알린 후
				// 이후에 붙는 then 안의 함수를 실행함.
			}
		});
	});
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

function extractDataFromSettingBox(settingBox, idNum) {
	const frgShapeName = settingBox.querySelector('input[type="radio"]').name;
	const frgShape = settingBox.querySelector(`input[name="${frgShapeName}"]:checked`);
	
	const frgName = settingBox.querySelector(`input[name="frg_name_${idNum}"]`);
	
	const frgAstate = settingBox.querySelector(`button[name="frg_Astate_${idNum}"].selected`);
	
	// frgShape의 값이 'S'이면 frg_Bstate는 null로 설정됨
	const frgBstate = frgShape && frgShape.value === "S" ? null : settingBox.querySelector(`button[name="frg_Bstate_${idNum}"].selected`);
	
	// 빈 상자 확인 및 처리
	if (!settingBox || !frgShape || !frgName || !frgAstate || (frgShape.value !== "S" && !frgBstate)) {
		return Promise.resolve(null);
	}
	
	return getUserId().then(function (userId) {
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
	e.preventDefault();
	
	const settingBoxes = document.querySelectorAll(".settingBox");
	const numberOfSettingBoxes = settingBoxes.length;
  
	const emptySettingBoxes = getEmptySettingBox(numberOfSettingBoxes);
	
	console.log(emptySettingBoxes);
	
	if (emptySettingBoxes.length > 0) {
		const indexesOfEmptySettingBoxes = emptySettingBoxes.map((i) => i + 1);
		confirmMsg = `${indexesOfEmptySettingBoxes.join(", ")}번째 박스가 비어있습니다. 삭제할까요?`;
		
		showConfirm(confirmMsg, () => {
			removeEmptySettingBoxes(emptySettingBoxes, settingBoxes).then(() => {
				// 삭제된 빈 박스를 제외한 새로운 settingBoxes를 얻는다.
				const updatedSettingBoxes = document.querySelectorAll(".settingBox");
				completeSubmittingForm(updatedSettingBoxes, settingBoxes);
			});
		}, () => {
			// 사용자가 취소 버튼을 눌렀거나 오류가 발생한 경우 처리
			return;
		});
	} else {
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

		// 냉장고 이름에 붙은 idNum을 추출해줘 
		const idNums = Array.from(settingBoxes).map((settingBox) => {
			const frgNameInput = settingBox.querySelector(`input[name^="frg_name_"]`);
			const idNum = frgNameInput.name.split("_")[2];
	
			return parseInt(idNum);
		});
	
		const settingBoxesDataPromises = idNums.map((idNum, index) => {
			return extractDataFromSettingBox(settingBoxes[index], idNum);
		});
	
		// Promise.all()을 사용해서 모든 settingBox의 데이터가 반환될 때까지 기다림
		Promise.all(settingBoxesDataPromises)
			.then(function (settingBoxesData) {

				// 빈 form 데이터는 걸러내기
				settingBoxesData = settingBoxesData.filter(data => data !== null);
	
				const newFrgNames = settingBoxesData.map((data) => data.frg_name);
	
				return getUserId()
				.then((userId) => getExistingFrgNames(userId))
				.then((existingFrgNames) => {
					if(checkFrgNameDuplication(newFrgNames, existingFrgNames)) {
						// 중복된 이름이 없으면 서버에 요청을 보냄
						$.ajax({
							type: "POST",
							url: `${contextPath}/frg/frgAdd_form`,
							contentType: "application/json; charset=UTF-8",
							data: JSON.stringify(settingBoxesData),
							dataType: "json",
							success: function (response) {
								alertMsg = "냉장고 등록이 완료되었습니다.";
								showAlert(alertMsg);
								window.location.href = `${contextPath}/frg/frgShow`;
							},
							error: function (err) {
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
			.catch(function (error) {
				console.error(error);
			});
	} else {
		// 어디가 비었어? 빈 첫 번째 요소로 가자
		const firstEmptyInfo = getFirstEmptyElement(numberOfSettingBoxes);
		
		console.log('firstEmptyInfo:', firstEmptyInfo); // 객체가 올바른지 확인

		switch (firstEmptyInfo.type) {
			case 'radio':
				showAlert('냉장고 모양을 선택하지 않은 곳이 있습니다.');
				break;
			case 'frgName':
				console.log(firstEmptyInfo.element);
				showAlert('냉장고 이름을 작성하지 않은 곳이 있습니다.');
				break;
			case 'frgState':
				showAlert('냉장고 보관 상태를 선택하지 않은 곳이 있습니다.');
				break;
		}

		firstEmptyInfo.element.focus(); // 빈 곳으로 focus 가자.
			
		window.scrollTo({ // 그 위치로 자동 스크롤
			top: firstEmptyInfo.element.offsetTop,
			behavior: 'smooth'
		});
	}
}