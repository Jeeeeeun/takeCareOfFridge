/**
 * 
 */
 

window.onload = function() {
	let nameLists;
	nameLists = JSON.parse(frgNameLists);
};

$(document).ready(function() {
	//냉장고 목록이 사용자가 갖고 있는 냉장고 목록과 같게 뜨도록 하는 function
	function createOption() {

		$.ajax({
			url: '/frg/innerAdd',
			method: 'GET',
			success: function(data) {
				console.log("냉장고 이름 목록 : ", data);
				for (let i = 0; i < nameLists.length; i++) {
					//1. option이라는 태그를 만들어줘
					var option = document.createElement("option");
					//2. 냉장고 이름을 가져와야 함 (frg_name)
					const node = document.createTextNode(nameLists[i]);
					//value 설정 (이게 곧 frg_index)
					option.value = nameList[i].frg_index;

					option.appendChild(node);

					select.appendChild(option);
				}
			},
			error: function(err) {
				console.error("냉장고 이름 목록을 가져오는데 실패했습니다.");
			}
		})
	}
});

// 함수를 호출하여 냉장고 이름 목록을 가져옵니다.
getFrgNameList();


//식품명 search 눌렀을 때 foodAPI table에서 식품 있는지 유무 알려주고 그 식품을 알려주는 function (auto인 경우)
function searchFunction() {

	const frgNameSubmmited = document.getElementById("formSubmit").value;

	if (submitButton.trim().length === 0) {
		alert("식품명을 입력하세요");
		return;
	}

	//ajax 요청 준비
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState === 4 && this.status === 200) {
			console.log(xhttp.responseText);
			const frgNameList = JSON.parse(this.responseText);

			displayFrgNameList(frgNameList);
		}
	}

	//요청 전송
	const formData = new FormData();
	formData.append("frgNameSubmmited", frgNameSubmmited);
	xhttp.open("POST", "/innerFoodAdd", true);
	xhttp.send(formData);

}

function displayFrgNameList(frgNameList) {

	//결과를 표시할 DOM 요소 선택
	let resultContainer = document.getElementById("resultContainer");
	//결과를 컨테이너에 추가
	for (let i = 0; i < frgNameList.length; i++) {
		let frgItem = document.createElement("div");
		frgItem.textContent = frgNameList[i].frgNameSubmmited;
		resultContainer.appendChild(frgItem);
	}
}


//"직접 입력하기"버튼을 눌렀을 때 실행되는 function
function foodAddCustom() {

	// input 태그 가져오기
	// "식품명 검색" input
	let FoodName = document.getElementById("FoodName");
	// "직접 입력하기" search 버튼
	let formSubmit = document.getElementById("formSubmit");
	// div - formDue
	let formDue = document.querySelector(".formDue");
	// "유통/소비기한" input (auto)
	let formDueAuto = document.getElementById("formDueAuto");
	// "유통/소비기한" input (custom)
	let formDueCustom = document.querySelector(".formDueCustom");
	// "식품 유형" input
	let FoodType = document.getElementById("FoodType");
	// hr 선
	let horizontalLine = document.querySelector(".horizontalLine");
	// "제조사명" input
	let FoodCom = document.getElementById("FoodCom");
	// "제조사명" label name
	let FoodComLabelName = document.querySelector(".FoodComLabelName"); // 첫 번째 요소를 선택
	// div - settingBox
	let settingBox = document.querySelector(".settingBox");
	// div - settingBoxWrapper
	let settingBoxWrapper = document.getElementById("settingBoxWrapper");

	// "직접 입력하기" input
	//let formFoodAddCustom = document.getElementById("formFoodAddCustom");
	const formFoodAddCustom = document.querySelector('#formFoodAddCustom');
	const hiddenInput = document.createElement('input');

	// "직접 입력하기" 를 체크하면 
	hiddenInput.setAttribute('type', 'hidden');
	hiddenInput.setAttribute('name', 'custom');
	hiddenInput.setAttribute('value', '0');

	formFoodAddCustom.addEventListener('change', (event) => {
		if (event.target.checked) {
			//(1-1. 숫자 1을 servlet(webservlet : innerFoodAdd)으로 보내기)
			//체크 했다 = 직접 입력하겠다 (custom = 1)
			hiddenInput.setAttribute('value', '1');
		}
		else {
			//(1-2. 숫자 0을 servlet(webservlet : innerFoodAdd)으로 보내기)
			//체크 안했다 = auto로 하겠다 (auto = 0)
			hiddenInput.setAttribute('value', '0');
		}
	});


	// "직접 입력하기"를 체크하면 아래 코드를 실행해줘.
	if (formFoodAddCustom.checked == true) {
		// FoodName의 type을 text로 변경
		FoodName.type = "text";
		// FoodName에 autofocus를 매겨줘.
		FoodName.autofocus = true;
		// formSubmit 버튼을 없애줘.
		formSubmit.style.display = "none";
		// formDueAuto을 없애줘.
		formDueAuto.style.display = "none";
		// formDueCustom을 나타나게 해줘.
		formDueCustom.style.display = "block";
		// formDue의 height를 줄여줘.
		formDue.style.height = "8.5vh";
		// horizontalLine을 없애줘.
		horizontalLine.style.display = "none";
		// FoodType의 readonly를 해제
		FoodType.readOnly = false;
		// FoodType의 placeholder를 '식품유형을 입력하세요'로 변경
		FoodType.placeholder = "식품유형을 입력하세요";
		// FoodComLabelName 없애줘.
		FoodComLabelName.style.display = "none";
		// FoodCom 없애줘.
		FoodCom.style.display = "none";
		// settingBox의 위치를 가운데로 조정
		settingBox.style.margin = "auto";

	} else {
		// FoodName의 type을 search로 변경
		FoodName.type = "search";
		// FoodName에 autofocus를 매겨줘.
		FoodName.autofocus = true;
		// formSubmit 버튼 다시 생기게 해줘.
		formSubmit.style.display = "inline-block";
		// formDueAuto을 다시 생기게 해줘.
		formDueAuto.style.display = "block";
		// formDue의 height를 원래대로 늘려줘.
		formDue.style.height = "16vh";
		// horizontalLine을 다시 만들어줘.
		horizontalLine.style.display = "block";
		// FoodType의 readonly를 다시 만들어줘.
		FoodType.readOnly = true;
		// FoodType의 placeholder를 '식품 검색이 완료되면, 식품 유형이 보일거에요'로 변경
		FoodType.placeholder = "식품 검색이 완료되면, 식품 유형이 보일거에요";
		// FoodComLabelName 다시 만들어줘.
		FoodComLabelName.style.display = "block";
		// FoodCom 다시 만들어줘.
		FoodCom.style.display = "block";
		// settingBox의 위치를 가운데로 조정
		settingBox.style.margin = "0px auto";
	}
}


// 플러스 버튼 눌렀을 때 
function plusBtnClicked() {
	const settingBoxWrapper = document.getElementById('add-settingBox');
	const settingBoxElement = document.createElement("div");
	settingBoxElement.className = "settingBox";
	settingBoxElement.innerHTML =
		`
    	<div class="formBackground-child">
		<div class="formBack formFridge">
			<label for="Fridge" class="labelName">냉장고</label>
			<div class="formRight">
				<select id="Fridge" style="color: #604C3F;">
					<option value="0">선택하세요</option>
				</select>
			</div>
		</div>
		<div class="formBack formState">
			<p class="labelName">보관 위치</p>
			<div class="formRight">
				<input type="radio" value="frozen" name="formState" id="cool"><label for="cool">냉동</label>
				<input type="radio" value="cool" name="formState" id="frozen"><label for="frozen">냉장</label>
			</div>
		</div>
		<div class="formBack formName">
			<label for="FoodName" class="labelName">식품명</label>
			<div class="formRight">
				<input type="search" class="formText" id="FoodName" placeholder="식품명을 검색하세요"
					style="color: #604C3F;" autofocus>
				<button type="submit" id="formSubmit" onclick="searchFunction();">search</button>
				<br>
				<input type="checkbox" id="formFoodAddCustom" onclick="foodAddCustom();"><label
					for="formFoodAddCustom">직접 입력하기</label>
			</div>
		</div>
		<div class="formBack formDue">
			<label for="FoodDue" class="labelName">유통/소비기한</label>
			<div class="formRight">
				<div class="formPbox formDueBox">
					<input type="text" id="formDueAuto" placeholder="식품 검색이 완료되면, 제조기한이 보일거에요"
						style="color: #604C3F;" readonly>
				</div>
				<hr class="horizontalLine">
				<div class="formPbox formDueBox">
					<p>( ↓ 제품에 적힌 유통기한을 입력해주세요 )</p>
					<input type="date" id="FoodDue" class="formDueCustom" style="color: #604C3F;">
				</div>
			</div>
		</div>
		<div class="formBack formType">
			<label for="FoodType" class="labelName">식품 유형</label>
			<div class="formRight">
				<input type="text" class="formText" id="FoodType" placeholder="식품 검색이 완료되면, 식품유형이 보일거에요"
					style="color: #604C3F;" readonly>
			</div>
		</div>
		<div class="formBack formCount">
			<label for="FoodCount" class="labelName">수량</label>
			<div class="formRight">
				<input type="number" class="formText" id="FoodCount" min="1" placeholder="수량을 등록하세요"
					style="color: #604C3F;">
			</div>
		</div>
		<div class="formBack formCom">
			<label for="FoodCom" class="labelName FoodComLabelName">제조사명</label>
			<div class="formRight">
				<input type="text" class="formText" id="FoodCom" placeholder="식품 검색이 완료되면, 제조사명이 보일거에요"
					style="color: #604C3F;" readonly>
			</div>
		</div>
		<div id="add-settingBox"></div>
			<div>
				<!--   class="plusAndEnd" -->
				<hr class="horizontalLine2">
				<div class="btns">
					<button type="button" class="btn" onclick="plusBtnClicked();">
						<i class="fa-solid fa-plus"></i>
					</button>
					<button type="submit" class="btn" onclick="submitBtnClicked();">완료</button>
				</div>
			</div>	
		</div>
    	`
	//appenChild 사용해서 settingBoxWrapper안에 넣음
	settingBoxWrapper.appendChild(settingBoxElement);

};



//완료 버튼 눌렀을 때
function submitBtnClicked() {
	const settingBoxes = document.querySelectorAll('.settingBox');
	const settingBoxesDataPromises = Array.from(settingBoxes).map(extractDataFromSettingBox);

	// Promise.all()을 사용해서 모든 settingBox의 데이터가 반환될 때까지 기다림
	const settingBoxesData = Promise.all(settingBoxesDataPromises);
	const jsonData = JSON.stringify({ settingBoxesData });
	console.log(jsonData); // JSON 문자열을 포맷하여 콘솔에 출력

	$.ajax({
		type: 'POST',
		url: `/takeCareOfFridge/innerFoodAdd`,
		contentType: 'application/json; charset=utf-8',
		data: jsonData,
		success: function(response) {
			alert('식품 등록이 완료되었습니다.');
		},
		error: function(err) {
			alert('식품 등록에 실패하였습니다.');
			if (err.stauts === 404) {
				alert('요청하신 페이지를 찾을 수 없습니다.');
			} else if (err.status === 500) {
				alert('서버 내부 오류가 발생했습니다.');
			}
		}
	})
}
 