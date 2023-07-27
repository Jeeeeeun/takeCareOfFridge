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
					//var apiExpireDate = trElement.find('td:nth-child(4)').text();
					var apiType = trElement.find('td:nth-child(5)').text();
	
					console.log(apiName);
					console.log(apiCompany);
					//console.log(apiExpireDate);
					console.log(apiType);
	
					const settingBox = document.querySelectorAll(".addSettingBox");
					console.log("settingBox.length : " + settingBox.length);
	
					// 변수에 할당된 값으로 각각의 input 태그의 value 값 설정
					document.getElementById('foodNameInput').value = apiName;
					document.getElementById('foodNameInput').disabled = true;
	
					document.getElementById('foodCompany').value = apiCompany;
					document.getElementById('foodCompany').disabled = true;

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
let frgOptionCounter = 1;
let frgStateCounter = 1; 
/* createNewSettingBox(); */
function createNewSettingBox() {

	const addSettingBox = document.querySelector(".addSettingBox-Wrapper");
	const settingBoxElement = document.createElement("div");
	settingBoxElement.innerHTML = `
	  <hr class="horizontalLine" style="border-style: dashed">
		<div class="addSettingBox${settingBoxNumber}">
			<!-- 냉장고 목록 -->
			<div class="box1">
				<label>
					<p>냉장고 선택</p> <select name="frgList" id="frgOption${frgOptionCounter}">
						<option value="">냉장고 선택</option>
				</select>
				</label>
			</div>

			<!-- 보관 위치 -->
			<div class="box2">
				<p>보관 위치</p>
				<label> <input type="radio" name="frgState${frgStateCounter}" 
					id="foodStateFrozen"  value="frozen" checked/>냉동
				<label> <input type="radio" name="frgState${frgStateCounter}"
					id="foodStateFrozen" value="cool" />냉장 
			</div>

			<!-- 식품명 -->
			<div class="box3">
				<label>
					<p>식품명</p>
					<div class="box3-1">
						<div class="box3-2">
							<input type="text" name="foodName" id="foodNameInput"
								placeholder="검색 결과가 입력됩니다." disabled />
							<div class="box3-3">
								<input type="checkbox" name="checkCustom"
									id="checkCustomInput" onclick="checkCustomOrNot();">직접입력하기
							</div>
						</div>
					</div>
				</label>
			</div>

			<!-- 유통/소비기한 -->
			<div class="box4">
				<label>
					<p>유통/소비기한</p>
					<div class="box4-1">
						<input type="date" name="expireDate" id="dueDate" value="">
					</div>
				</label>
			</div>

			<!-- 식품유형 -->
			<div class="box5">
				<label>
					<p>식품유형</p> <input type="text" name="foodType"
					id="foodType" placeholder="검색 결과가 입력됩니다." disabled>
				</label>
			</div>

			<!-- 수량 -->
			<div class="box6">
				<label>
					<p>수량</p> <input type="number" name="foodCount"
					id="foodCount" placeholder="식품 수량 등록">
				</label>
			</div>

			<!-- 제조사명 -->
			<div class="box7">
				<label>
					<p>제조사명</p> <input type="text" name="foodCompany"
					id="foodCompany" placeholder="검색 결과가 입력됩니다." disabled>
				</label>
			</div>
		</div>
	  `;

	addSettingBox.appendChild(settingBoxElement);

	const frgOptionId = settingBoxElement.querySelector(`#frgOption${frgOptionCounter}`);

	frgOptionId.style.width = "340px";
	frgOptionId.style.height = "30px";
	frgOptionId.style.backgroundColor = "white";
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
	settingBox.style.width = "inherit";
	settingBox.style.height = "inherit";
	settingBox.style.backgroundColor = "#d3cdcd";
	settingBox.style.padding = "inherit";

	// 카운터를 증가시켜 다음 요소에 대한 고유한 ID 생성
	frgOptionCounter++;
	settingBoxNumber++;
	frgStateCounter++;

};

/* checkCustomOrNot(); */
function checkCustomOrNot() {
  const foodNameInput = document.getElementById("foodNameInput");
  const checkCustom = document.querySelector("#checkCustomInput");
  const dueDate = document.querySelector("#dueDate");
  const foodType = document.querySelector("#foodType");
  const searchInput = document.querySelector("#searchInput");
  const tbodyTag = document.querySelector("#tbodyTag");
  const foodCompany = document.querySelector("#foodCompany");
  const foodCount = document.querySelector("#foodCount");

  const isCustomChecked = checkCustom.checked;
  
  foodNameInput.disabled = !isCustomChecked;
  foodType.disabled = !isCustomChecked;
  searchInput.disabled = isCustomChecked;

  foodNameInput.placeholder = isCustomChecked ? "식품명을 기입하세요." : "검색결과가 입력됩니다.";
  searchInput.placeholder = isCustomChecked ? "식품을 검색할 수 없어요." : "식품을 검색하세요.";
  dueDate.placeholder = isCustomChecked ? "하단에서 유통/소비기한을 입력하세요." : "검색결과가 입력됩니다.";
  foodType.placeholder = isCustomChecked ? "식품 유형을 입력하세요." : "검색결과가 입력됩니다.";
  foodCompany.placeholder = isCustomChecked ? "제조사명은 입력할 수 없어요." : "검색결과가 입력됩니다.";

  const changeBackground = isCustomChecked ? "#b7aeae" : "white";
  foodNameInput.style.backgroundColor = changeBackground;
  dueDate.style.backgroundColor = changeBackground;
  foodType.style.backgroundColor = changeBackground;
  foodCount.style.backgroundColor = changeBackground;
  foodCompany.style.backgroundColor = changeBackground;
  
}


/* toggleSettingBox(); */
/*
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
*/
