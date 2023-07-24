// 고유 id 만들려고 변수 생성
let idCounter = 0;

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
	<div class="settingBox">
		<div class="setting-titleBox">냉장고 모양</div>
		<div class="setting-itemBox">
			<div>
				<input type="radio" name="frg_shape" id="horizon" value="H" onclick="radioClicked(event, this.nextElementSibling)">
				<label for="horizon">
					<img id="ho_${idNum}" class="ho" alt="가로형 냉장고" src="${contextPath}/resources/img/hFrgLabel.svg"/>
				</label>
			</div>
			<div>
				<input type="radio" name="frg_shape" id="vertical" value="V" onclick="radioClicked(event, this.nextElementSibling)">
				<label for="vertical">
					<img id="ve_${idNum}" class="ve" alt="세로형 냉장고" src="${contextPath}/resources/img/vFrgLabel.svg"/>
				</label>
			</div>
			<div>
				<input type="radio" name="frg_shape" id="single" value="S" onclick="radioClicked(event, this.nextElementSibling)">
				<label for="single">
					<img id="si_${idNum}" class="si" alt="단일형 냉장고" src="${contextPath}/resources/img/sFrgLabel.svg">
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
						<input class="fridgeInfoInput" id="frg_name_${idNum}" name="frg_name_${idNum}" required/>
					</div>
					<div class="w-100">
						<label class="fridgeInfoLabelState">A</label>
						<button type="button" name="frg_Astate_${idNum}" value="cool" class="stateSelectBtn" onclick="stateBtnClicked(this, ${idNum})">냉장</button>
						<button type="button" name="frg_Astate_${idNum}" value="frozen" class="stateSelectBtn" onclick="stateBtnClicked(this, ${idNum})">냉동</button>
					</div>
					<div class="w-100">
						<label class="fridgeInfoLabelState">B</label>
						<button type="button" name="frg_Bstate_${idNum}" value="cool" class="stateSelectBtn" onclick="stateBtnClicked(this, ${idNum})">냉장</button>
						<button type="button" name="frg_Bstate_${idNum}" value="frozen" class="stateSelectBtn" onclick="stateBtnClicked(this, ${idNum})">냉동</button>
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
      const labelFor = settingBoxElement.querySelector(
        `label[for="${radioId}"]`
      );

      radioBtn.setAttribute("id", newId); // innerHTML에서 ${idNum}을 더해주지 않아도 저절로 들어갔던 이유
      radioBtn.setAttribute("name", newName);
      labelFor.setAttribute("for", newId);  // innerHTML에서 ${idNum}을 더해주지 않아도 저절로 들어갔던 이유

      radioBtn.addEventListener("click", (e) =>
        radioClicked(e, labelFor, idNum)
      );
    });

  const horizonRadio = settingBoxElement.querySelector(`#horizon_${idNum}`);
  const horizonLabel = settingBoxElement.querySelector(
    `label[for="horizon_${idNum}"]`
  );
  horizonRadio.onclick = function (event) {
    radioClicked(event, horizonLabel, idNum);
  };

  const verticalRadio = settingBoxElement.querySelector(`#vertical_${idNum}`);
  const verticalLabel = settingBoxElement.querySelector(
    `label[for="vertical_${idNum}"]`
  );
  verticalRadio.onclick = function (event) {
    radioClicked(event, verticalLabel, idNum);
  };
  const singleRadio = settingBoxElement.querySelector(`#single_${idNum}`);
	console.log(singleRadio);
  const singleLabel = settingBoxElement.querySelector(
    `label[for="single_${idNum}"]`
  );
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

  const radios = settingBox.querySelectorAll(
    `input[name="frg_shape_${idNum}"]`
  );
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
    const selectedBstateBtn = settingBox.querySelector(
      `button[name="frg_Bstate_${idNum}"].selected`
    );
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

    const frg_AstateBtns = settingBox.querySelectorAll(
      `button[name="frg_Astate_${idNum}"]`
    );
    const frg_BstateBtns = settingBox.querySelectorAll(
      `button[name="frg_Bstate_${idNum}"]`
    );

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

/* SESS_ID 데려오려는 함수 */
function getUserId() {
  return fetch(contextPath + "/frg/getUserId")
    .then(function (response) {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("사용자 ID를 가져올 수 없었습니다.");
      }
    });
}

function extractDataFromSettingBox(settingBox, idNum) {
  return getUserId().then(function (userId) {
    const frgShapeName = settingBox.querySelector('input[type="radio"]').name;
    const frgShape = settingBox.querySelector(
      `input[name="${frgShapeName}"]:checked`
    );

    const frgName = settingBox.querySelector(`input[name="frg_name_${idNum}"]`);

    const frgAstate = settingBox.querySelector(
      `button[name="frg_Astate_${idNum}"].selected`
    );
    // frgShape의 값이 'S'이면 frg_Bstate는 null로 설정됨
    const frgBstate =
      frgShape && frgShape.value === "S"
        ? null
        : settingBox.querySelector(`button[name="frg_Bstate_${idNum}"].selected`);

    return {
      user_id: userId,
      frg_shape: frgShape ? frgShape.value : null,
      frg_name: frgName ? frgName.value : null,
      frg_Astate: frgAstate ? frgAstate.value : null,
      frg_Bstate: frgBstate ? frgBstate.value : null,
    };
  });
}

// 완료 버튼 눌렀을 때 실행될 코드
function submitBtnClicked(e) {
  e.preventDefault();
  const settingBoxes = document.querySelectorAll(".settingBox");

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
      $.ajax({
        type: "POST",
        url: `${contextPath}/frg/frgAdd_form`,
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(settingBoxesData),
        dataType: "json",
        success: function (response) {
          alert("냉장고 등록이 완료되었습니다.");
          window.location.href = `${contextPath}/frg/frgShow`;
        },
        error: function (err) {
          alert("냉장고 등록에 실패했습니다.");
          if (err.status === 404) {
            alert("요청한 페이지를 찾을 수 없습니다.");
          } else if (err.status === 500) {
            alert("서버 내부 오류가 발생했습니다.");
          } else {
            alert("error - " + err);
          }
        },
      });
    })
    .catch(function (error) {
      console.error(error);
    });
}
