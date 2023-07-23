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
    success: function(data, textStatus) {
      // 성공적으로 응답을 받았을 때 처리할 로직을 작성합니다.
      if (data.length == 1) {
        alert(data.api_name + "을 성공적으로 조회했습니다. 확인을 눌러주세요.");
      } else if (data.length > 1) {
        alert("총 " + data.length + "개의 동일제품이 검색되었습니다. \n 하단 표에서 원하는 제품을 선택하세요.");
      }


      $.each(data, function(index, food) {
	      var count = index + 1; // 클래스명을 위한 숫자(count) 계산
	      var divClass = "num" + count; // 클래스명 생성
	      var nameClass = "name" + count;

        $("#tbodyTag").append(`
        
            <tr>
              <td><input type="radio" class="${divClass}" name="${nameClass}"/></td>
              <td>${food.api_name}</td>
              <td>${food.api_company}</td>
              <td>${food.api_expiredate}</td>
              <td>${food.api_type}</td>
            </tr>		      
        
        `);
        
        
      // 선택된 divClass를 가진 input 요소에 대한 이벤트 처리
      $('input.' + divClass).on('change', function() {
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
    error: function(data, err) {
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

let frgOptionCounter = 1; // 냉장고 옵션의 카운터 변수
/* createNewSettingBox(); */
function createNewSettingBox() {

	const addSettingBox = document.querySelector(".addSettingBox");
	const settingBoxElement = document.createElement("div");
	settingBoxElement.innerHTML = `
	  <hr class="horizontalLine" style="border-style: dashed">
				<div class="settingBox">
					<!-- 냉장고 목록 -->
					<div class="box1">
						<label>
							<p>냉장고 선택</p>
						    <select name="frgList" id="frgOption${frgOptionCounter}">
						        <option value="">냉장고 선택</option>
						    </select>
						</label>
					</div>
					<!-- 보관 위치 -->
					<div class="box2">
						<p>보관 위치</p>
						<label>
							<input type="radio" name="state" id="foodStateFrozen"/>냉동 
						</label>
						<label>
							<input type="radio" name="state" id="foodStateCool"/>냉장 <br>
						</label>
					</div>
					
					<!-- 식품명 -->
					<div class="box3">
						<label> 
							<p>식품명</p>
							<div class="box3-1">
								 <div class="box3-2">							
									<input type="text" id="foodNameInput" placeholder="식품 이름 입력" autofocus />
							</div>
							 <div class="box3-2">							 
								<input type="checkbox" id="checkCustom" onclick="checkCustomOrNot();" />직접 입력하기
							 </div>							
							</div>
						</label>
					</div>
					
					<!-- 유통/소비기한 -->
					<div class="box4">
						<label> 
							<p>유통/소비기한</p>
							<div class="box4-1">
								<input type="text" id="dueDateAuto" placeholder="유통/소비기한 안내"> 
								<input type="date" id="dueDateCustom" >							
							</div>
						</label> 
					</div>
					
					<!-- 식품유형 -->
					<div class="box5">
						<label> 
							<p>식품유형</p>
							<input type="text" id="foodType" placeholder="식품 유형 안내">
						</label> 
					</div>
					
					<!-- 수량 -->
					<div class="box6">
						<label> 
							<p>수량</p>
							<input type="number" id="foodCount" placeholder="식품 수량 등록">
						</label> 
					</div>
					
					<!-- 제조사명 -->
					<div class="box7">
						<label> 
							<p>제조사명</p>
							<input type="text" id="foodCompany" placeholder="제조사명 안내" >
						</label> 
					</div>
				</div>
	  `;

	addSettingBox.appendChild(settingBoxElement);
	
	const frgOptionId = settingBoxElement.querySelector(`#frgOption${frgOptionCounter}`);
	
	frgOptionId.style.width="300px";
	frgOptionId.style.height= "30px";
	frgOptionId.style.backgroundColor="beige";
	frgOptionId.style.border="0px";
	
    frgNames.forEach(function(name) {
	  if (name !== "") {
	    const option = document.createElement("option");
	    option.value = name;
	    option.textContent = name;
	    frgOptionId.appendChild(option);
	  }
	});

    // 카운터를 증가시켜 다음 요소에 대한 고유한 ID 생성
    frgOptionCounter++; 

};


/* checkCustomOrNot(); */
function checkCustomOrNot(){

	let foodNameInput = document.querySelector("#foodNameInput");
	let checkCustom = document.querySelector("#checkCustom");	
	let dueDateAuto = document.querySelector("#dueDateAuto");
	let foodType = document.querySelector("#foodType");
	let foodCount = document.querySelector("#foodCount");
	let foodCompany = document.querySelector("#foodCompany");
	let searchInput =document.querySelector("#searchInput");
	let searchSubmit = document.querySelector("#searchSubmit");
	
	//직접 입력하기를 누른 경우의 수
	//1. 식품명에 아무것도 안 씀 + 직접입력하기 누름
	if(foodNameInput.value === "" && checkCustom.checked==true){
	
		foodNameInput.disabled=true;
		dueDateAuto.disabled=true;
		foodCompany.disabled=true;
		
		foodNameInput.placeholder="식품명을 검색할 수 없어요";
		dueDateAuto.placeholder="하단에서 유통/소비기한을 입력하세요";
		foodCompany.placeholder="제조사는 입력할 수 없어요";
		foodType.placeholder="식품 유형을 입력하세요";
		
		foodNameInput.style.backgroundColor="lightgray";
		dueDateAuto.style.backgroundColor="lightgray";
		foodCompany.style.backgroundColor="lightgray";
		
	} else if(foodNameInput.value === searchInput.value && checkCustom.checked){
		//2. 식품명에 '검색한 식품명'이 들어가있음 + 직접 입력하기 누름 (변심 또는 실수)
		let customFinalCheck=confirm("직접 입력하기로 변경하시겠습니까?\n변경 후에는 현재 검색한 내역과 등록한 값이 초기화됩니다.");	
		if(customFinalCheck==true){ //변경 확정
			//초기화 해야 하는 것들
			
		}else{ //변경 취소
			checkCustom.checked==false;
		}	
	}

}












/* addFinish(); */

