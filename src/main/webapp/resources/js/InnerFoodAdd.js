let foodNameInput, checkCustomAll, dueDateAuto, foodType, foodCount, foodCompany, searchInput, searchSubmit, settingBox, tbodyTag;

window.onload = function () {

	foodNameInput = document.getElementById("foodNameInput");
	checkCustomAll = document.getElementsByName("checkCustom");
	dueDateAuto = document.querySelector("#dueDateAuto");
	foodType = document.querySelector("#foodType");
	foodCount = document.querySelector("#foodCount");
	foodCompany = document.querySelector("#foodCompany");
	searchInput = document.querySelector("#searchInput");
	searchSubmit = document.querySelector("#searchSubmit");
	settingBox = document.querySelector(`.settingBox${settingBoxNumber}`);
	tbodyTag = document.querySelector("#tbodyTag");
	
}

/* searchFoodAPI(); */
function searchFoodAPI() {

	//검색을 한 번한 이후에는 무조건 검색 내용을 초기화
	$("#tbodyTag").html("");

	const searchFood = document.querySelector('#searchInput');
	const searchData = searchFood.value;
	let data = { searchApi: searchData };

	$.ajax({
		url: contextPath + '/frg/innerAdd/search',
		async: true,
		method: 'post',
		data: data, // 데이터를 객체 형태로 전달합니다.
		dataType: 'json',
		success: function (data, textStatus) {
			// 성공적으로 응답을 받았을 때 처리할 로직을 작성합니다.
			if (data.length == 1) {
				alert(data.api_name + "을 성공적으로 조회했습니다. 확인을 눌러주세요.");
			} else if (data.length > 1) {
				alert("총 " + data.length + "개의 동일제품이 검색되었습니다. \n 하단 표에서 원하는 제품을 선택하세요.");
			}


			$.each(data, function (index, food) {
				var count = index + 1; // 클래스명을 위한 숫자(count) 계산
				var divClass = "num" + count; // 클래스명 생성

				$("#tbodyTag").append(`
        
            <tr>
              <td><input type="radio" class="${divClass}" name="foodApiName"/></td>
              <td>${food.api_name}</td>
              <td>${food.api_company}</td>
              <td>${food.api_expiredate}</td>
              <td>${food.api_type}</td>
            </tr>		      
        
        `);


				// 선택된 divClass를 가진 input 요소에 대한 이벤트 처리
				$('input.' + divClass).on('change', function () {
					if ($(this).is(':checked')) {

						// 선택된 input의 부모인 tr 요소를 선택
						var trElement = $(this).closest('tr');

						// tr 요소 내의 td 요소들의 값을 가져와서 처리
						var apiName = trElement.find('td:nth-child(2)').text();
						var apiCompany = trElement.find('td:nth-child(3)').text();
						var apiExpireDate = trElement.find('td:nth-child(4)').text();
						var apiType = trElement.find('td:nth-child(5)').text();

						console.log(apiName);
						console.log(apiCompany);
						console.log(apiExpireDate);
						console.log(apiType);

						const settingBox = document.querySelectorAll(".addSettingBox");
						console.log("settingBox.length : " + settingBox.length);



						// 변수에 할당된 값으로 각각의 input 태그의 value 값 설정
						document.getElementById('foodNameInput').value = apiName;
						document.getElementById('foodNameInput').disabled = true;

						document.getElementById('foodCompany').value = apiCompany;
						document.getElementById('foodCompany').disabled = true;

						document.getElementById('dueDateAuto').value = apiExpireDate;
						document.getElementById('dueDateAuto').disabled = true;

						document.getElementById('foodType').value = apiType;
						document.getElementById('foodType').disabled = true;
					}
				});
			});

		},
		error: function (data, err) {
			if (data.length == 0) {
				alert("검색하신 " + data + "는(은) 없는 제품입니다. 직접 입력하여 등록하세요");
			} else {
				console.log('알 수 없는 이유로 식품 조회에 실패했습니다. 재시도하세요.');
				console.log(data);
				console.log(err);
			}
		}

	});
}

let settingBoxNumber = 1;
let frgOptionCounter = 1; // 냉장고 옵션의 카운터 변수
/* createNewSettingBox(); */
function createNewSettingBox() {

	const addSettingBox = document.querySelector(".addsettingBox-Wrapper");
	const settingBoxElement = document.createElement("div");
	settingBoxElement.innerHTML = `
	  <hr class="horizontalLine" style="border-style: dashed">
		<div class="box0" onclick="toggleSettingBox();"><i class="fa-solid fa-square-check"></i><p>폼 선택하기</p></div>
		<div class="addSettingBox addSettingBox${settingBoxNumber}">
			<div class="box1">
				<label>
					<p>냉장고 선택</p> <select name="frgList" id="frgOption${frgOptionCounter}">
						<option value="">냉장고 선택</option>
				</select>
				</label>
			</div>
			
			<div class="box2">
				<p>보관 위치</p>
				<label> <input type="radio" name="frgState"
					id="foodStateFrozen" />냉동
				</label> <label> <input type="radio" name="frgState"
					id="foodStateCool" />냉장 <br>
				</label>
			</div>

			<div class="box3">
				<label>
					<p>식품명</p>
					<div class="box3-1">
						<div class="box3-2">
							<input type="text" name="foodName" id="foodNameInput"
								placeholder="검색 결과가 입력됩니다." />
							<div class="box3-3">
								<input type="checkbox" name="checkCustom" id="checkCustomInput" onclick="checkCustomOrNot();">직접입력하기
							</div>
						</div>
					</div>
				</label>
			</div>

			<div class="box4">
				<label>
					<p>유통/소비기한</p>
					<div class="box4-1">
						<input type="text" name="expireDateAuto" id="dueDateAuto"
							placeholder="검색 결과가 입력됩니다."> 
						<input type="date"
							name="expireDateCustom" id="dueDateCustom" value="">
					</div>
				</label>
			</div>

			<div class="box5">
				<label>
					<p>식품유형</p> <input type="text" name="foodType" id="foodType"
					placeholder="검색 결과가 입력됩니다.">
				</label>
			</div>

			<div class="box6">
				<label>
					<p>수량</p> <input type="number" name="foodCount" id="foodCount"
					placeholder="식품 수량 등록">
				</label>
			</div>

			<div class="box7">
				<label>
					<p>제조사명</p> <input type="text" name="foodCompany"
					id="foodCompany" placeholder="검색 결과가 입력됩니다.">
				</label>
			</div>
		</div>
	  `;

	addSettingBox.appendChild(settingBoxElement);

	const frgOptionId = settingBoxElement.querySelector(`#frgOption${frgOptionCounter}`);

	frgOptionId.style.width = "300px";
	frgOptionId.style.height = "30px";
	frgOptionId.style.backgroundColor = "beige";
	frgOptionId.style.border = "0px";

	frgNames.forEach(function (name) {
		if (name !== "") {
			const option = document.createElement("option");
			option.value = name;
			option.textContent = name;
			frgOptionId.appendChild(option);
		}
	});

	const settingBox = settingBoxElement.querySelector(`.addSettingBox${settingBoxNumber}`);

	settingBox.style.position = "relative";
	settingBox.style.width = "550px";
	settingBox.style.height = "447px";
	settingBox.style.backgroundColor = "gray";
	settingBox.style.padding = "inherit";

	// 카운터를 증가시켜 다음 요소에 대한 고유한 ID 생성
	frgOptionCounter++;
	settingBoxNumber++;

};

/* checkCustomOrNot(); */
function checkCustomOrNot() {

	let checkCustom = "";
	//checkCustom이 여러개일 경우, 그 중에 사용자가 선택한 checkCustom만 잡아오고 싶어. 어떻게 해?
	checkCustomAll.forEach(function (checkCustomElement) {
		if (checkCustomElement.checked) {
			checkCustom = checkCustomElement;
			console.log("checkCustom : " + checkCustom);
		}
	});

	//선택된 것의 value를 가져옴. 이후에 어떤 로직을 짜야 하지?

	//settingBox이 여러개일 경우, 그 중에 사용자가 선택한 checkCustom이 속해있는 settingBox만 잡아오고 싶어. 어떻게 해?
	function findSettingBoxFromClickedCheckCustom(clickedCheckCustom) {
		// 클릭된 요소의 상위 요소들을 탐색하여 settingBox를 찾음
		let settingBoxElement = clickedCheckCustom;

		while (settingBoxElement) {
			if (settingBoxElement.classList.contains("settingBox")) {
				return settingBoxElement;
			}
			settingBoxElement = settingBoxElement.parentElement;
		}

		// 찾지 못한 경우 null 반환
		return null;
	}

	// click 이벤트를 추가하여 사용자가 선택한 settingBox를 찾음
	document.addEventListener("click", function (event) {
		const clickedElement = event.target;
		if (clickedElement.nodeName === "INPUT" && clickedElement.getAttribute("name") === "checkCustom") {
			settingBox = findSettingBoxFromClickedCheckCustom(clickedElement);
			console.log("settingBox : " + settingBox);
		}
	});


	//직접 입력하기를 누른 경우의 수
	//1. 식품명에 아무것도 안 씀 + 직접입력하기 누름
	if (settingBox.foodNameInput.value === "" && settingBox.checkCustom.checked == true) {

		settingBox.foodNameInput.disabled = false;

		settingBox.foodNameInput.placeholder = "식품명을 기입학세요";
		settingBox.searchInput.placeholder = "식품을 검색할 수 없어요";
		settingBox.dueDateAuto.placeholder = "하단에서 유통/소비기한을 입력하세요";
		settingBox.foodCompany.placeholder = "제조사는 입력할 수 없어요";
		settingBox.foodType.placeholder = "식품 유형을 입력하세요";

		settingBox.dueDateAuto.style.backgroundColor = "white";
		settingBox.foodCompany.style.backgroundColor = "white";

	} else if (settingBox.foodNameInput.value === settingBox.searchInput.value && settingBox.checkCustom.checked == true) {
		//2. 식품명에 '검색한 식품명'이 들어가있음 + 직접 입력하기 누름 (변심 또는 실수)
		let customFinalCheck = confirm("직접 입력하기로 변경하시겠습니까?\n변경 후에는 현재 검색한 내역과 등록한 값이 초기화됩니다.");

		if (customFinalCheck == true) { //변경 확정
			//초기화
			console.log("settingBox : " + settingBox);
			console.log("settingBox.foodNameInput.value : " + settingBox.foodNameInput.value);
			settingBox.foodNameInput.value = "";
			settingBox.dueDateAuto.value = "";
			settingBox.foodType.value = "";
			settingBox.foodCount.value = "";
			settingBox.foodCompany.value = "";
			tbodyTag.html = "";

			//disabled 해제
			settingBox.foodNameInput.disabled = false;
			settingBox.dueDateAuto.disabled = false;
			settingBox.foodType.disabled = false;
			settingBox.foodCount.disabled = false;
			settingBox.foodCompany.disabled = false;

		} else { //변경 취소
			firstCheckCustom.checked == false;

			//변경 취소가 되면 모든 것이 원래대로 돌아와야 함.
			settingBox.foodNameInput.disabled = true;
			settingBox.foodCompany.disabled = true;

			settingBox.foodNameInput.placeholder = "검색결과가 입력됩니다.";
			settingBox.searchInput.placeholder = "식품을 검색하세요.";
			settingBox.dueDateAuto.placeholder = "검색결과가 입력됩니다.";
			settingBox.foodCompany.placeholder = "검색결과가 입력됩니다.";
			settingBox.foodType.placeholder = "검색결과가 입력됩니다.";

			settingBox.dueDateAuto.style.backgroundColor = "beige";
			settingBox.foodCompany.style.backgroundColor = "beige";
		}
	}
}


/* toggleSettingBox(); */
function toggleSettingBox() {
	const settingBoxElements = document.querySelectorAll(".box0");
	const settingBoxPairs = [];

	// 각 settingBox 요소와 해당하는 addSettingBox 요소를 객체로 묶어서 저장
	settingBoxElements.forEach(function (settingBox, index) {
		const addSettingBox = document.querySelectorAll(".addSettingBox")[index];
		settingBoxPairs.push({ settingBox, addSettingBox });

		settingBox.addEventListener("click", function () {
			// 클릭할 때 "selected" 클래스를 토글
			if (settingBox.classList.contains("selected")) {
				settingBox.classList.remove("selected");
				addSettingBox.style.backgroundColor = "gray"; // 선택이 해제되면 기본 색상으로 변경
			} else {
				settingBox.classList.add("selected");
				addSettingBox.style.backgroundColor = "green"; // 선택되었을 때 배경색을 빨간색으로 변경
			}
		});
	});
}

/* addFinish(); */


//1개의 settingBox밖에 안 됨 :{} 상태.
function extractDataFromSettingBox() {
  let frgList = document.querySelector("#frgOption"); // frgList의 ID를 선택
  let frgState = document.querySelector("[name='frgState']"); // frgState의 name을 선택
  let foodName = document.querySelector("#foodNameInput"); // foodName의 ID를 선택
  let expireDateAuto = document.querySelector("#dueDateAuto"); // expireDateAuto의 ID를 선택
  let expireDateCustom = document.querySelector("#dueDateCustom"); // expireDateCustom의 ID를 선택
  let foodType = document.querySelector("#foodType"); // foodType의 ID를 선택
  let foodCount = document.querySelector("#foodCount"); // foodCount의 ID를 선택
  let foodCompany = document.querySelector("#foodCompany"); // foodCompany의 ID를 선택

  console.log("frgList.value : " + frgList.value);
  console.log("frgState.value : " + frgState.value);
  console.log("foodName.value : " + foodName.value);
  console.log("expireDateAuto.value : " + expireDateAuto.value);
  console.log("expireDateCustom.value : " + expireDateCustom.value);
  console.log("foodType.value: " + foodType.value);
  console.log("foodCount.value : " + foodCount.value);
  console.log("foodCompany.value : " + foodCompany.value);

  return [{
    frgList: frgList ? frgList.value : null,
    frgState: frgState ? frgState.value : null,
    foodName: foodName ? foodName.value : null,
    expireDateAuto: expireDateAuto ? expireDateAuto.value : null,
    expireDateCustom: expireDateCustom ? expireDateCustom.value : null,
    foodType: foodType ? foodType.value : null,
    foodCount: foodCount ? foodCount.value : null,
    foodCompany: foodCompany ? foodCompany.value : null,
  }];
}


//완료 버튼 눌렀을 때 일어나는 함수
function addFinish(){

	//e.preventDefault() // submit이 갖고 있는 기본 동작을 제거하는 기능(없으면 에러남) 

	const settingBoxes = document.querySelectorAll(".addSettingBox");//settingBox 모두 데려와

	const idNums = Array.from(settingBoxes).map((settingBox) => {
		const frgNameInput = settingBox.querySelector(`input[name^="frg_name_"]`);
		const idNum = frgNameInput.name.split("_")[2];
	
		return parseInt(idNum);
	});

	const settingBoxesDataPromises = idNums.map((idNum, index) => {
		return extractDataFromSettingBox(settingBoxes[index], idNum);
	});

    // Promise.all()을 사용해서 모든 settingBox의 데이터가 반환될 때까지 기다림
  	const settingBoxesData = await Promise.all(settingBoxesDataPromises);

	$.ajax({
		type: "POST",
		data: json.stringify(settingBoxesData),
		dataType: "json",
		success: function (response){
		  alert("성공적으로 등록 완료");
		  window.location.href =`${contextPath}/frg/innerAdd`;
		},
		error: function (err){
		  alert("등록 실패");
		  //err.status == 뭐냐에 따라서 페이지 랜더링 분류
		  if (err.status === 404) {
	        alert("요청한 페이지를 찾을 수 없습니다.");
	      } else if (err.status === 500) {
	        alert("서버 내부 오류가 발생했습니다.");
	      } else {
			alert("error - " + err);
		  }
		}
	});

}