window.onload = function() {
	const newStateBtns = document.getElementById('settingBoxWrapper');
	const settingBoxes = document.querySelectorAll('.settingBox');

	if (settingBoxes) {
		settingBoxes.forEach(generateUniqueID);
	}

	if (newStateBtns) {
		newStateBtns.addEventListener('click', function(e) {
			if (e.target.classList.contains('stateSelectBtn')) {
				stateBtnClicked(e.target);
			} else if (e.target.matches('input[type="radio"][name="${initialSettingBox}.name"]')) {
				radioClicked(e, e.target.nextElementSibling);
			}
		});
	} else {
		console.error("Element with ID 'settingBoxWrapper' not found.");
	}

};

// 냉장고 모양 라디오 버튼 클릭하면 아래쪽에 선택한 냉장고의 모양이 등장하게 처리
function radioClicked(e, label) {

	const selectedRadio = e.target;

	// 클릭된 라디오 버튼이 속한 settingBox 요소를 찾음
	const settingBox = e.target.closest('.settingBox');

	const radios = settingBox.querySelectorAll('input[name="frg_shape"]');
	radios.forEach(radio => radio.checked = false);

	selectedRadio.checked = true;

	const img = label.querySelector('img');
	const imgSrc = img.src;

	// selected-fridge라는 class를 가진 요소를 찾음
	const selectedFridge = settingBox.querySelector('.selected-fridge');

	// 기존에 이미지가 있으면 삭제
	while (selectedFridge.firstChild) {
		selectedFridge.removeChild(selectedFridge.firstChild);
	}

	// 새로 생성한 이미지 요소를 selectedFridge에 추가
	var selectedFrgImg = document.createElement('img');
	selectedFrgImg.src = imgSrc;
	selectedFrgImg.alt = img.alt;
	selectedFrgImg.style.display = 'flex';
	selectedFrgImg.style.justifyContent = 'center';
	selectedFrgImg.style.width = '80%';
	selectedFrgImg.style.height = '80%';
	selectedFridge.appendChild(selectedFrgImg);

	// 클릭된 라디오 버튼이 속한 settingBox 요소의 하위 A, B 라벨과 버튼 찾기
	const fridgeInfoLabelStates = settingBox.querySelectorAll('.fridgeInfoLabelState');
	const stateSelectBtns = settingBox.querySelectorAll('.stateSelectBtn');

	// 냉장고 종류(H, V, S)에 따라 A, B 섹션 레이블과 버튼의 display 속성 조작
	const selectedShape = e.target.value;
	if (selectedShape === 'S') {
		// 단일형 냉장고(S) 선택 시, A 섹션만 보이고 B 섹션 숨김
		fridgeInfoLabelStates[0].style.display = 'inline-block';
		stateSelectBtns[0].style.display = 'inline-block';
		stateSelectBtns[1].style.display = 'inline-block';
		fridgeInfoLabelStates[1].style.display = 'none';
		stateSelectBtns[2].style.display = 'none';
		stateSelectBtns[3].style.display = 'none';
	} else {
		// 가로형 냉장고(H) 또는 세로형 냉장고(V) 선택 시, A, B 섹션 모두 보임
		fridgeInfoLabelStates[0].style.display = 'inline-block';
		stateSelectBtns[0].style.display = 'inline-block';
		stateSelectBtns[1].style.display = 'inline-block';
		fridgeInfoLabelStates[1].style.display = 'inline-block';
		stateSelectBtns[2].style.display = 'inline-block';
		stateSelectBtns[3].style.display = 'inline-block';
	}
}

// 냉장고 A, B 섹션 이름 선택 버튼 동작 스위칭 기능
function stateBtnClicked(clickedBtn) {

	const settingBox = clickedBtn.closest('.settingBox');
	const btns = settingBox.querySelectorAll(`button[name='${clickedBtn.name}']`);

	// 선택된 버튼의 클래스 추가 또는 제거
	if (!clickedBtn.classList.contains('selected')) {
		
		// 중복된 value 값이 있는지 확인
		const correspondingBtns = Array.from(btns).filter(
			btn => btn.value !== clickedBtn.value
		);

		if (correspondingBtns.length === 1) {
			correspondingBtns[0].classList.remove("selected");
			clickedBtn.classList.add("selected");
		} else {
			clickedBtn.classList.add("selected");
		}

		// A 버튼과 B 버튼 사이의 동작 처리

		const frg_AstateBtns = settingBox.querySelectorAll("button[name='frg_Astate']");
		const frg_BstateBtns = settingBox.querySelectorAll("button[name='frg_Bstate']");

		if (clickedBtn.name === "frg_Astate") {

			const correspondingB = Array.from(frg_BstateBtns).find(
				btn => btn.value !== clickedBtn.value
			);

			frg_BstateBtns.forEach(btn => {
				if (btn !== correspondingB) {
					btn.classList.remove("selected");
				}
			});
			correspondingB.classList.add("selected");

		} else if (clickedBtn.name === "frg_Bstate") {

			const correspondingA = Array.from(frg_AstateBtns).find(
				btn => btn.value !== clickedBtn.value
			);

			frg_AstateBtns.forEach(btn => {
				if (btn !== correspondingA) {
					btn.classList.remove("selected");
				}
			});
			correspondingA.classList.add("selected");
		}
	}
}

// 고유 id 만들려고 변수 생성
let idCounter = 0;

// 라디오 버튼 이름에 사용될 고유 ID를 만드는 함수
function generateUniqueID() {
	return "frg_shape_" + idCounter++;
}

// 화면 아래쪽 + 버튼 눌렀을 때 settingBox 추가 생성
function plusBtnClicked() {
	const settingBoxWrapper = document.getElementById('settingBoxWrapper');

	const uniqueID = new generateUniqueID();
	const settingBoxElement = document.createElement("div");
	settingBoxElement.innerHTML = `
    <hr class="horizontalLine" style="border-style: dashed">
    <div class="settingBox">
        <div class="setting-titleBox">냉장고 모양</div>
        <div class="setting-itemBox"></div>
        <div class="setting-titleBox">냉장고 정보</div>
        <div class="setting-itemBox">
            <div class="selected-fridge"></div>
            <div class="fridge-info">
                <div class="fridgeInfoBox">
                        <label class="fridgeInfoLabelName" for="frg_name" style="margin-top: 33px;">이름</label>
                        <input class="fridgeInfoInput" id="frg_name" name="frg_name" required/><br>

                        <label class="fridgeInfoLabelState">A</label>
                        <button type="button" name="frg_Astate" value="cool" class="stateSelectBtn" onclick="stateBtnClicked(this)">냉장</button>
                        <button type="button" name="frg_Astate" value="frozen" class="stateSelectBtn" onclick="stateBtnClicked(this)">냉동</button><br>

                        <label class="fridgeInfoLabelState">B</label>
                        <button type="button" name="frg_Bstate" value="cool" class="stateSelectBtn" onclick="stateBtnClicked(this)">냉장</button>
                        <button type="button" name="frg_Bstate" value="frozen" class="stateSelectBtn" onclick="stateBtnClicked(this)">냉동</button>
                </div>
            </div>
        </div>
    </div>
    `;

	const settingBoxItem = settingBoxElement.querySelector(".setting-itemBox");

	const horizonRadio = document.createElement("input");
	horizonRadio.type = "radio";
	horizonRadio.name = uniqueID;
	horizonRadio.id = "horizon";
	horizonRadio.value = "H";
	horizonRadio.onclick = (event) => radioClicked(event, horizonLabel);

	const horizonLabel = document.createElement("label");
	horizonLabel.htmlFor = "horizon";
	const horizonImage = document.createElement("img");
	horizonImage.id = "ho";
	horizonImage.alt = "가로형 냉장고";
	horizonImage.src = contextPath + "resources/img/hFrgLabel.svg";
	horizonLabel.appendChild(horizonImage);

	const verticalRadio = document.createElement("input");
	verticalRadio.type = "radio";
	verticalRadio.name = uniqueID;
	verticalRadio.id = "vertical";
	verticalRadio.value = "V";
	verticalRadio.onclick = (event) => radioClicked(event, verticalLabel);

	const verticalLabel = document.createElement("label");
	verticalLabel.htmlFor = "vertical";
	const verticalImage = document.createElement("img");
	verticalImage.id = "ve";
	verticalImage.alt = "세로형 냉장고";
	verticalImage.src = contextPath + "resources/img/vFrgLabel.svg";
	verticalLabel.appendChild(verticalImage);

	const singleRadio = document.createElement("input");
	singleRadio.type = "radio";
	singleRadio.name = uniqueID;
	singleRadio.id = "single";
	singleRadio.value = "S";
	singleRadio.onclick = (event) => radioClicked(event, singleLabel);

	const singleLabel = document.createElement("label");
	singleLabel.htmlFor = "single";
	const singleImage = document.createElement("img");
	singleImage.id = "si";
	singleImage.alt = "단일형 냉장고";
	singleImage.src = contextPath + "resources/img/sFrgLabel.svg";
	singleLabel.appendChild(singleImage);

	settingBoxItem.appendChild(horizonRadio);
	settingBoxItem.appendChild(horizonLabel);
	settingBoxItem.appendChild(verticalRadio);
	settingBoxItem.appendChild(verticalLabel);
	settingBoxItem.appendChild(singleRadio);
	settingBoxItem.appendChild(singleLabel);

	settingBoxWrapper.appendChild(settingBoxElement);
};

/* SESS_ID 데려오려는 함수 */ 
async function getUserId() {
	const response = await fetch(contextPath + '/getUserId');

	if (response.ok) {
		return await response.text();
	} else {
		throw new Error('사용자 ID를 가져올 수 없었습니다.');
	}
};

// settingBox마다 사용자가 입력한 값들을 json으로 처리
async function extractDataFromSettingBox(settingBox) {
	const frgShapeName = settingBox.querySelector('input[type="radio"]').name; // 라디오 버튼의 name 속성값 가져옴.   
	const frgShape = settingBox.querySelector(`input[name="${frgShapeName}"]:checked`);

	const frgName = settingBox.querySelector('input[name="frg_name"]');
	const frgAstate = settingBox.querySelector('button[name="frg_Astate"].selected');
	const frgBstate = settingBox.querySelector('button[name="frg_Bstate"].selected');

	const userId = await getUserId();

	return {
		user_id: userId,
		frg_shape: frgShape ? frgShape.value : null,
		frg_name: frgName ? frgName.value : null,
		frg_Astate: frgAstate ? frgAstate.value : null,
		frg_Bstate: frgBstate ? frgBstate.value : null,
	};
}

// 완료 버튼 눌렀을 때 실행될 코드
async function submitBtnClicked() {
	const settingBoxes = document.querySelectorAll('.settingBox');
	const settingBoxesDataPromises = Array.from(settingBoxes).map(extractDataFromSettingBox);

	// Promise.all()을 사용해서 모든 settingBox의 데이터가 반환될 때까지 기다림
	const settingBoxesData = await Promise.all(settingBoxesDataPromises);
	const jsonData = JSON.stringify({ settingBoxesData });
	console.log(jsonData); // JSON 문자열을 포맷하여 콘솔에 출력

	$.ajax({
		type: 'POST',
		url: `${window.contextPath}/frgListAdd`, // 이 주소가 FrgListAdd 서블릿
		contentType: 'application/json; charset=utf-8',
		data: jsonData,
		success: function(response) { // 성공적으로 처리됐을 때 작업 수행
			alert('냉장고 등록이 완료되었습니다.');
			window.location.href = "/frgListShow";
		},
		error: function(err) { // 오류가 발생했을 때 작업 수행
			alert('냉장고 등록에 실패했습니다.');
			if (err.status === 404) {
				alert('요청한 페이지를 찾을 수 없습니다.');
			} else if (err.status === 500) {
				alert('서버 내부 오류가 발생했습니다.');
			}
		}
	});
}