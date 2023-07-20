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
		  document.getElementById('searchInput').value = apiName;
		  document.getElementById('searchInput').disabled = true;
			
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


/* checkCustomOrNot(); */
function checkCustomOrNot() {
  // input 태그 가져오기
  // "식품명 검색" input
  let searchInput = document.querySelector("#searchInput");
  // "식품명 검색하기" btn
  let searchSubmit = document.querySelector("#searchSubmit");
  // "직접 입력하기" search 버튼
  let registerFood = document.querySelector("#registerFood");
  // "유통/소비기한" input (auto)
  let dueDateAuto = document.querySelector("#dueDateAuto");
  // "유통/소비기한" input (custom)
  let dueDateCustom = document.querySelector("#dueDateCustom");
  // "식품 유형" input
  let foodType = document.querySelector("#foodType");
  // "제조사명" input
  let foodCompany = document.querySelector("#foodCompany");
  // "table" 
  let table=document.getElementById("showTable");

  // "직접 입력하기"를 체크하면 아래 코드를 실행해줘.
  if (registerFood.checked == true) {
    // 1. input tag 관리
    //searchInput, dueDateAuto, foodType, foodCompany의 value를 초기화 해야 함
    searchInput.value='';
    dueDateAuto.value='';
    foodType.value='';
    foodCompany.value='';  
    // searchInput의 type을 text로 변경
    searchInput.type = "text";
    // searchInput에 autofocus를 매겨줘.
    searchInput.autofocus = true;
    // searchSubmit 버튼을 없애줘.
    searchSubmit.style.display = "none";
    // dueDateAuto을 없애줘.
    dueDateAuto.style.display = "none";
    // dueDateCustom을 나타나게 해줘.
    dueDateCustom.style.display = "block";
    // foodType의 readonly를 해제
    foodType.readOnly = false;
    // foodType의 placeholder를 '식품유형을 입력하세요'로 변경
    foodType.placeholder = "식품유형을 입력하세요";
    // foodCompany 없애줘.
    foodCompany.style.display = "none";
    //2. table이 생성되어있다면 table 숨기기
    table.style.display="none";
    
  } else {
    // searchInput의 type을 search로 변경
    searchInput.type = "search";
    // searchInput에 autofocus를 매겨줘.
    searchInput.autofocus = true;
    // searchSubmit 버튼 다시 생기게 해줘.
    searchSubmit.style.display = "inline-block";
    // dueDateAuto을 다시 생기게 해줘.
    dueDateAuto.style.display = "block";
    // foodType의 readonly를 다시 만들어줘.
    foodType.readOnly = true;
    // foodType의 placeholder를 '식품 검색이 완료되면, 식품 유형이 보일거에요'로 변경
    foodType.placeholder = "식품 검색이 완료되면, 식품 유형이 보일거에요";
    // foodCompany 다시 만들어줘.
    foodCompany.style.display = "block";
  }
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
							<p>냉장고 선택하기</p>
						    <select name="frgList" id="frgOption">
						        <option value="">냉장고를 선택하세요</option>
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
									<input type="search" id="searchInput" autofocus />
									<button type="button" id="searchSubmit" onclick="searchFoodAPI();">검색하기</button>
								</div>
								 <div class="box3-2">							 
									<input type="checkbox" id="registerFood" onclick="checkCustomOrNot();" />직접 입력하기
								 </div>							
							</div>
						</label>
					</div>
					
					<!-- 유통/소비기한 -->
					<div class="box4">
						<label> 
							<p>유통/소비기한</p>
							<div class="box4-1">
								<input type="text" id="dueDateAuto" placeholder="유통/소비기한"> <br> 
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
	
	const frgOption = settingBoxElement.querySelector("#frgOption");
	
    frgNames.forEach((name) => {
    	if (name !== "") {
	        const option = document.createElement("option");
	        option.value = name;
	        option.textContent = name;
	        document.getElementById(`frgOption${frgOptionCounter}`).appendChild(option);
        }
    });
    
     frgOptionCounter++; // 카운터를 증가시켜 다음 요소에 대한 고유한 ID를 생성합니다.
}

/* addFinish(); */

