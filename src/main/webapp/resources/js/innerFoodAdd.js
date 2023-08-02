document.addEventListener('DOMContentLoaded', function() {
	// HTML이 모두 렌더링된 후 실행되어야 할 스크립트를 여기에 작성
	// 이 이벤트 핸들러는 DOMContentLoaded 이벤트가 발생했을 때 실행됩니다.
	// 냉장고 목록 select 가져오기
	let frgOptionList = document.querySelectorAll(`select[name^="frg_name-"]`);

	// frgNames를 이용하여 옵션 동적 생성
	function addOptionsToFrgList(frgOptionList, frgNames) {
		for (let i = 0; i < frgOptionList.length; i++) {
			const frgOption = frgOptionList[i];
			for (let j = 0; j < frgNames.length; j++) {
				const name = frgNames[j];
				if (name !== "") {
					const option = document.createElement("option");
					option.value = name;
					option.textContent = name;
					frgOption.appendChild(option);
				}
			}
		}
	}

	// 함수 호출
	addOptionsToFrgList(frgOptionList, frgNames);
	
});
	
// 전역변수로 사용할 변수 선언
let alertMsg, alertContent, alertWindow;

// 페이지 로딩되자마자, DOM 객체 캐치
window.onload = function() {
	alertContent = document.querySelector("#alertContent");
	alertWindow = document.querySelector("#customAlert");
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
        
		            <tr style="position: relative; width: 100%; height: 40px;">
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
					var apiType = trElement.find('td:nth-child(5)').text();
	
					console.log(apiName);
					console.log(apiCompany);
					console.log(apiType);
	
					const addSettingBoxForm = document.querySelectorAll('div[id^="addSettingBoxForm-"]');
					console.log("addSettingBoxForm.length : " + addSettingBoxForm.length);
	
					let chosenFormToSetValues;
					function findEmptyAddSettingForm(addSettingBoxForm){
						for(let i =0 ; i < addSettingBoxForm.length; i++){
							if(addSettingBoxForm[i].querySelector(`input[id^="foodNameInput-"]`).value === ""){
								console.log("here");
								chosenFormToSetValues=addSettingBoxForm[i];
								console.log("chosenFormToSetValues : "+chosenFormToSetValues);
								break;
							}
						}
						return chosenFormToSetValues;
					}
					
					chosenFormToSetValues= findEmptyAddSettingForm(addSettingBoxForm);
					
					if(chosenFormToSetValues){
						// 변수에 할당된 값으로 각각의 input 태그의 value 값 설정
						 chosenFormToSetValues.querySelector(`input[id^="foodNameInput-"]`).value = apiName;
					     chosenFormToSetValues.querySelector(`input[id^="foodNameInput-"]`).disabled = true;
					
					     chosenFormToSetValues.querySelector(`input[id^="foodCompany-"]`).value = apiCompany;
					     chosenFormToSetValues.querySelector(`input[id^="foodCompany-"]`).disabled = true;
					
					     chosenFormToSetValues.querySelector(`input[id^="foodType-"]`).value = apiType;
					     chosenFormToSetValues.querySelector(`input[id^="foodType-"]`).disabled = true;
					}
					
					
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
let formNumber = 1; 
let frgOptionCounter = 1;
let frgStateCounter = 1; 
/* createNewSettingBox(); */
function createNewSettingBox() {

	/*
	1. +를 눌렀을 때, form이 비어있는지 아닌지 확인 후 
	- 비어있으면 폼 추가가 안되게 막기, alert띄워서 "비어있으니까 폼 추가 안돼"라고 하기
	- 안비어있으면 폼 추가 허락해주기
	*/
	
	const settingBoxes = document.querySelectorAll(`div[id^="addSettingBoxForm-"]`);
	function blockToAddSettingBox(settingBoxes){
		for(let i =0 ; i < settingBoxes.length; i++){
			if(settingBoxes[i].querySelector(`input[id^="foodNameInput-"]`).value === "" &&
			   settingBoxes[i].querySelector(`input[id^="dueDate-"]`).value === "" &&
			   settingBoxes[i].querySelector(`input[id^="foodType-"]`).value === "" &&
			   settingBoxes[i].querySelector(`input[id^="foodCount-"]`).value === "" &&
			   settingBoxes[i].querySelector(`input[id^="foodCompany-"]`).value === ""){
					alert((i+1)+"번째 양식이 비어있습니다. 비어있는 양식을 먼저 채워주세요.");
					// createNewSettingBox()가 실행되는 것을 막기 위해 false를 반환
					return false;
			}
		}
		return true;
	}
	
	// blockToAddSettingBox() 함수의 결과를 확인하여 추가 여부를 결정합니다.
	if (!blockToAddSettingBox(settingBoxes)) {
	   return; // 함수 종료
	}

	const addSettingBox = document.querySelector(".addSettingBox-Wrapper");
	const settingBoxNewElement = document.createElement("div");
	settingBoxNewElement.setAttribute("id", "addSettingBoxForm-${settingBoxNumber}");
	settingBoxNewElement.innerHTML = `
	  <hr class="horizontalLine" style="border-style: dashed">
			<div class="selectedFormToRemove">
				<input type="checkbox" name="formToRemove" id="selectedForm-${formNumber}" onclick="selectedForms();">폼 선택하기
			</div>
			
			<!-- 냉장고 목록 -->
			<div class="box1">
				<label>
					<p>냉장고 선택</p> <select name="frg_name-${formNumber}" id="frgOption-${frgOptionCounter}">
						<option value="">냉장고 선택</option>
				</select>
				</label>
			</div>

			<!-- 보관 위치 -->
			<div class="box2">
				<p>보관 위치</p>
				<label> <input type="radio" name="in_state-${formNumber}" 
					id="foodStateFrozen"  value="frozen" checked/>냉동
				<label> <input type="radio" name="in_state-${formNumber}"
					id="foodStateFrozen" value="cool" />냉장 
			</div>

			<!-- 식품명 -->
			<div class="box3">
				<label>
					<p>식품명</p>
					<div class="box3-1">
						<div class="box3-2">
							<input type="text" name="in_name-${formNumber}" id="foodNameInput-${formNumber}"
								placeholder="검색 결과가 입력됩니다." disabled />
							<div class="box3-3">
								<input type="checkbox"
									id="checkCustomInput-${formNumber}" onclick="checkCustomOrNot();">직접입력하기
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
						<input type="date" name="in_expireDate-${formNumber}" id="dueDate-${formNumber}" value="">
					</div>
				</label>
			</div>

			<!-- 식품유형 -->
			<div class="box5">
				<label>
					<p>식품유형</p> <input type="text" name="in_type-${formNumber}"
					id="foodType-${formNumber}" placeholder="검색 결과가 입력됩니다." disabled>
				</label>
			</div>

			<!-- 수량 -->
			<div class="box6">
				<label>
					<p>수량</p> <input type="number" name="in_count-${formNumber}"
					id="foodCount-${formNumber}" placeholder="식품 수량 등록">
				</label>
			</div>

			<!-- 제조사명 -->
			<div class="box7">
				<label>
					<p>제조사명</p> <input type="text" name="in_company-${formNumber}"
					id="foodCompany-${formNumber}" placeholder="검색 결과가 입력됩니다." disabled>
				</label>
			</div>
	  `;

	addSettingBox.appendChild(settingBoxNewElement);
	
	//모든 addSettingBoxForm
	const settingBoxElements = document.querySelectorAll(`div[id^="addSettingBoxForm-"]`);
	const frgOptionId = document.querySelectorAll(`select[id^="frgOption-"]`);
	const foodNameInput = document.querySelectorAll(`input[id^="foodNameInput-"]`);
	const dueDate = document.querySelectorAll(`input[id^="dueDate"]`);
	const foodType = document.querySelectorAll(`input[id^="foodType"]`);
	const foodCount = document.querySelectorAll(`input[id^="foodCount"]`);
	const foodCompany = document.querySelectorAll(`input[id^="foodCompany"]`);
	
	for(let i = 0; i < settingBoxElements.length; i++){
		settingBoxElements[i].style.position = "relative";
		settingBoxElements[i].style.width = "inherit";
		settingBoxElements[i].style.height = "inherit";
		settingBoxElements[i].style.backgroundColor = "#d3cdcd";
		settingBoxElements[i].style.padding = "inherit";
	}

	for (let i = 0; i < frgOptionId.length; i++) {
	  frgOptionId[i].style.width = "340px";
	  frgOptionId[i].style.height = "30px";
	  frgOptionId[i].style.backgroundColor = "white";
	  frgOptionId[i].style.border = "0px";
	}

	for (let i = 0; i < foodNameInput.length; i++) {
	  foodNameInput[i].style.width = "340px";
	  foodNameInput[i].style.height = "30px";
	  foodNameInput[i].style.backgroundColor = "white";
	  foodNameInput[i].style.border = "0px";
	}
	
	for (let i = 0; i < dueDate.length; i++) {
	  dueDate[i].style.width = "340px";
	  dueDate[i].style.height = "30px";
	  dueDate[i].style.backgroundColor = "white";
	  dueDate[i].style.border = "0px";
	}
	
	for (let i = 0; i < foodType.length; i++) {
	  foodType[i].style.width = "340px";
	  foodType[i].style.height = "30px";
	  foodType[i].style.backgroundColor = "white";
	  foodType[i].style.border = "0px";
	}
	
	for (let i = 0; i < foodCount.length; i++) {
	  foodCount[i].style.width = "340px";
	  foodCount[i].style.height = "30px";
	  foodCount[i].style.backgroundColor = "white";
	  foodCount[i].style.border = "0px";
	}
	
	for (let i = 0; i < foodCompany.length; i++) {
	  foodCompany[i].style.width = "340px";
	  foodCompany[i].style.height = "30px";
	  foodCompany[i].style.backgroundColor = "white";
	  foodCompany[i].style.border = "0px";
	}

	frgNames.forEach(function (name) {
	  if (name !== "") {
	    for (let i = 0; i < frgOptionId.length; i++) {
	      const option = document.createElement("option");
	      option.value = name;
	      option.textContent = name;
	      frgOptionId[i].appendChild(option);
	    }
	  }
	});

	const selectedFormToRemove = document.querySelectorAll(`input[id^="selectedForm-"]`);
	for (let i = 0; i < selectedFormToRemove.length; i++) {
	  selectedFormToRemove[i].addEventListener("click", selectedForms);
	}
	
	const checkCustomInput = document.querySelectorAll(`input[id^="checkCustomInput"]`);
	for (let i = 0; i < checkCustomInput.length; i++) {
	  checkCustomInput[i].addEventListener("click", checkCustomOrNot);
	}

	// 카운터를 증가시켜 다음 요소에 대한 고유한 ID 생성
	frgOptionCounter++;
	settingBoxNumber++;
	frgStateCounter++;

};

function getAddSettingBoxForm(selectedForm){
	const addSettingBoxForm = selectedForm.closest("div[id^='addSettingBoxForm-']");
	return addSettingBoxForm;
}

/*selectedForms();*/
function selectedForms(){

	const selectedFormElements = document.querySelectorAll(`input[id^="selectedForm-"]`);
	const selectedAddSettingBoxes = document.querySelectorAll(`div[id^="addSettingBoxForm-"]`);
	const parentAddSettingBoxWrapper = document.querySelector(".addSettingBox-Wrapper");
	let selectedAddSettingForms = [];
	
	for (let i = 0; i < selectedAddSettingBoxes.length; i++) {
    let selectedForm = selectedFormElements[i];
    let addSettingBoxForm = getAddSettingBoxForm(selectedForm);
    if (addSettingBoxForm && addSettingBoxForm.parentNode === parentAddSettingBoxWrapper) {
      selectedAddSettingForms.push(addSettingBoxForm);
      addSettingBoxForm.style.backgroundColor = selectedForm.checked ? "lightpink" : "#d3cdcd";
    }else if(addSettingBoxForm && addSettingBoxForm.parentNode !== parentAddSettingBoxWrapper){
    	console.log("addSettingBoxForm의 부모 노드가 아니다");
    }
  }

  	return selectedAddSettingForms;
}

/*removeChosenSettingBox();*/
function removeChosenSettingBox() {
  const settingBoxesChosenToRemove = selectedForms();
  const parentAddSettingBoxWrapper = document.querySelector(".addSettingBox-Wrapper");
  const countToRemove = settingBoxesChosenToRemove.length;

  function countSettingBoxesChosenToRemove(countToRemove) {
    if (countToRemove === 0) {
      alert("삭제할 폼을 선택하지 않았습니다. 폼을 선택해주세요");
      return false;
    } else if (countToRemove >= 1) {
      return true;
    }
  }

  if (!countSettingBoxesChosenToRemove(countToRemove)) {
    return; // 함수 종료
  }

  for (let i = 0; i < settingBoxesChosenToRemove.length; i++) {
    const settingBoxToRemove = settingBoxesChosenToRemove[i];

    // 선택한 양식이 선택된 양식들 중 첫번째 양식인지 확인합니다.
    const isFirstForm = settingBoxToRemove === settingBoxesChosenToRemove[0];

    // 첫번째 양식인 경우, 삭제 대신 양식 초기화를 물어보는 확인 메시지를 표시합니다.
    if (isFirstForm) {
      const resetConfirmed = confirm("첫번째 양식은 삭제할 수 없습니다. 양식을 초기화하시겠습니까?");
      if (resetConfirmed) {
        // 양식을 초기화합니다.
        settingBoxToRemove.querySelector(`input[id^="foodNameInput-"]`).value = "";
        settingBoxToRemove.querySelector(`input[id^="dueDate-"]`).value = "";
        settingBoxToRemove.querySelector(`input[id^="foodType-"]`).value = "";
        settingBoxToRemove.querySelector(`input[id^="foodCount-"]`).value = "";
        settingBoxToRemove.querySelector(`input[id^="foodCompany-"]`).value = "";
      }
    } else {
      // 첫번째 양식이 아닌 경우, 삭제를 진행합니다.
      if (settingBoxToRemove && settingBoxToRemove.parentNode) {
        parentAddSettingBoxWrapper.removeChild(settingBoxToRemove);
      }
    }
  }
}


/* checkCustomOrNot(); */
function checkCustomOrNot() {

  const foodNameInputElements = document.querySelectorAll(`input[id^="foodNameInput-"]`);
  const checkCustomElements = document.querySelectorAll(`input[id^="checkCustomInput-"]`);
  const dueDateElements = document.querySelectorAll(`input[id^="dueDate-"]`);
  const foodTypeElements = document.querySelectorAll(`input[id^="foodType-"]`);
  const foodCompanyElements = document.querySelectorAll(`input[id^="foodCompany-"]`);
  const foodCountElements = document.querySelectorAll(`input[id^="foodCount-"]`);
  const searchInput = document.querySelector("#searchInput");
  const tbodyTag = document.querySelector("#tbodyTag");
  selectedAddSettingBoxes = document.querySelectorAll(`div[id^="addSettingBoxForm-"]`);
  
  for (let i = 0; i < checkCustomElements.length; i++) {
    let selectedCheckCustom = checkCustomElements[i];
    // "div[id^='addSettingBoxForm-']" 선택자와 가장 가까운 조상을 찾음
    addSettingBoxForm = selectedCheckCustom.closest("div[id^='addSettingBoxForm-']");
    console.log(addSettingBoxForm);
    let isCustomChecked = selectedCheckCustom.checked;
    const changeBackground = isCustomChecked ? "lightgreen" : "white";

    foodNameInputElements[i].disabled = !isCustomChecked;
    foodTypeElements[i].disabled = !isCustomChecked;
    foodCompanyElements[i].disabled = !isCustomChecked;
    searchInput.disabled = isCustomChecked;

    foodNameInputElements[i].placeholder = isCustomChecked ? "식품명을 기입하세요." : "검색결과가 입력됩니다.";
    searchInput.placeholder = isCustomChecked ? "식품을 검색할 수 없어요." : "식품을 검색하세요.";
    dueDateElements[i].placeholder = isCustomChecked ? "하단에서 유통/소비기한을 입력하세요." : "검색결과가 입력됩니다.";
    foodTypeElements[i].placeholder = isCustomChecked ? "식품 유형을 입력하세요." : "검색결과가 입력됩니다.";
    foodCompanyElements[i].placeholder = isCustomChecked ? "제조사명을 입력하세요." : "검색결과가 입력됩니다.";
    foodNameInputElements[i].style.backgroundColor = changeBackground;
    dueDateElements[i].style.backgroundColor = changeBackground;
    foodTypeElements[i].style.backgroundColor = changeBackground;
    foodCountElements[i].style.backgroundColor = changeBackground;
    foodCompanyElements[i].style.backgroundColor = changeBackground;
    searchInput.style.backgroundColor = changeBackground;
  }
}

/*addFinish()*/
function addFinish() {
		
		const addSettingBoxes = document.querySelectorAll(`div[id^="addSettingBoxForm-"]`);
		const addSettingBoxesDataList = [];
		
		let frgOptionInput, frgStateInput, foodNameInput, dueDateInput, foodTypeInput, foodCountInput, foodCompanyInput;
		
		for (let i = 0; i < addSettingBoxes.length; i++) {
			frgOptionInput = addSettingBoxes[i].querySelector(`select[name^="frg_name-"]`);
			frgStateInput = addSettingBoxes[i].querySelector(`input[name^="in_state-"]:checked`);
		    foodNameInput = addSettingBoxes[i].querySelector(`input[name^="in_name-"]`);
		    dueDateInput = addSettingBoxes[i].querySelector(`input[name^="in_expireDate-"]`);
		    foodTypeInput = addSettingBoxes[i].querySelector(`input[name^="in_type-"]`);
		    foodCountInput = addSettingBoxes[i].querySelector(`input[name^="in_count-"]`);
		    foodCompanyInput = addSettingBoxes[i].querySelector(`input[name^="in_company-"]`);
		    
		    console.log("frgOptionInput.value : "+frgOptionInput.value);
		    console.log("frgStateInput.value : "+frgStateInput.value);
		    console.log("foodNameInput.value : "+foodNameInput.value);
		    console.log("dueDateInput.value : "+dueDateInput.value);
		    console.log("foodTypeInput.value : "+foodTypeInput.value);
		    console.log("foodCountInput.value : "+foodCountInput.value);
		    console.log("foodCompanyInput.value : "+foodCompanyInput.value);
		
		    if ( //폼이 비어있지 않으면 데이터를 서버로 보내기
		    	frgOptionInput.value !== "" &&
		    	frgStateInput &&
		    	foodNameInput.value !== "" &&
		        dueDateInput.value !== "" &&
		        foodTypeInput.value !== "" &&
		        foodCountInput.value !== "" &&
		        foodCompanyInput.value !== ""
		    ) {
		    
		    	let frgOption = frgOptionInput.value;
		    	let frgState = frgStateInput.value;
		    	let foodName = foodNameInput.value;
		    	let dueDate = dueDateInput.value;
		    	let foodType = foodTypeInput.value;
		    	let foodCount = parseInt(foodCountInput.value);
		    	let foodCompany = foodCompanyInput.value;
		    	
		    	/*
				console.log('---------------------------');
				console.log(dueDate);
		    	console.log("preparedDueDate "+preparedDueDate);
		    	console.log('---------------------------');*/
		    	let preparedDueDate = new Date(dueDate);
		    	
		    	// 데이터를 서버로 전송하기 위해 객체로 만들기
				const addSettingBoxesData = {
					frg_name : frgOption,
					in_state : frgState,
					in_name : foodName,
					in_expireDate : preparedDueDate,
					in_type : foodType,
					in_count : foodCount,
					in_company : foodCompany
				};
				
				console.log("addSettingBoxesData",addSettingBoxesData);
				/*
				console.log('-------------------------------');
				console.log(JSON.stringify(addSettingBoxesData));
				
				addSettingBoxesDataList.push(addSettingBoxesData);
				console.log('-------------------------------');
				console.log(addSettingBoxesDataList);
				console.log('-------------------------------');*/
				
				$.ajax({
			    type: "POST",
			    url: `${contextPath}/frg/innerAdd/submit`,
			    contentType: "application/json",
			    data: JSON.stringify(addSettingBoxesData),
			    dataType: "json",
			    success: function (response) {
			        if (response.success) {
			            alert("성공적으로 등록 완료");
			            console.log("response.frg_name "+response.frg_name);
			            
			            //innerCtrl로 이동하기 위해 다시 $.ajax 호출
			            let frgNameData = { frgName: response.frg_name };
			            
			            $.ajax({
			                type: "GET",
			                url: `${contextPath}/frg/innerCtrl`,
			                data: frgNameData,
			                dataType: "html",
			                success: function (data) {
			               		$('html').html(data);
			                },
			                error: function (err) {
			               		alert("error가 발생했습니다.");
			                }
			            });
			        } else {
			            alert("등록 실패 : " + response.message);
			        }
			    },
			    error: function (err) {
			        alert("등록 실패: 서버 내부 오류가 발생했습니다.");
			    }
			});
		        
		    } else if (  // 비어있는 폼이 있을 경우 등록 불가, 해당 폼으로 자동 스크롤
		    	frgOptionInput.value === "" ||
		    	frgStateInput.value === "" ||
		        foodNameInput.value === "" ||
		        dueDateInput.value === "" ||
		        foodTypeInput.value === "" ||
		        foodCountInput.value === "" ||
		        foodCompanyInput.value === ""
		    ){
		        alert((i + 1) + "번째 폼의 입력값이 비어있습니다. 채워주세요!");
		        addSettingBoxes[i].scrollIntoView({ behavior: "smooth" });
		        break;
		    }
		    
		}
	 		
	}
