// 페이지 로딩되자마자, DOM 객체 캐치
window.onload = function () {
   alertContent = document.querySelector("#alertContent");
   alertWindow = document.querySelector("#customAlert");


   
}


document.addEventListener('DOMContentLoaded', function () {
      // HTML이 모두 렌더링된 후 실행되어야 할 스크립트를 여기에 작성
      // 이 이벤트 핸들러는 DOMContentLoaded 이벤트가 발생했을 때 실행됩니다.
      // 냉장고 목록 select 가져오기
      let frgOptionList = document.querySelectorAll(`select[name^="frg_name-"]`);
      console.log(frgOptionList);

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

            //검색창에 아무것도 입력하지 않은 상태에서 검색하기를 눌렀을 때의 일
            const searchInput = document.querySelector("#searchInput");
            if (searchInput.value === "") {
               alertMsg = "식품명을 입력하지 않았습니다. 식품명을 검색하세요 ^^";
               showAlert(alertMsg);
               return;
            }

            if (data.length == 1) {
               alertMsg = data.length + "개의 식품을 성공적으로 조회했습니다.";
               showAlert(alertMsg);
            } else if (data.length > 1) {
               alertMsg = "총 " + data.length + "개의 동일제품이 검색되었습니다. \n 하단 표에서 원하는 제품을 선택하세요.";
               showAlert(alertMsg);
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
           
             `   );


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
                     function findEmptyAddSettingForm(addSettingBoxForm) {
                        for (let i = 0; i < addSettingBoxForm.length; i++) {
                           if (addSettingBoxForm[i].querySelector(`input[id^="foodNameInput-"]`).value === "") {
                              console.log("here");
                              chosenFormToSetValues = addSettingBoxForm[i];
                              console.log("chosenFormToSetValues : " + chosenFormToSetValues);
                              break;
                           }
                        }
                        return chosenFormToSetValues;
                     }

                     chosenFormToSetValues = findEmptyAddSettingForm(addSettingBoxForm);

                     if (chosenFormToSetValues) {
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
               alertMsg = "검색하신 " + data + "는(은) 없는 제품입니다. 직접 입력하여 등록하세요";
               showAlert(alertMsg);
            } else {
               alertMsg = '알 수 없는 이유로 식품 조회에 실패했습니다. 재시도하세요.';
               showAlert(alertMsg);
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
   let formCount = 1;
   /* createNewSettingBox(); */
function createNewSettingBox() {

      /*
      1. +를 눌렀을 때, form이 비어있는지 아닌지 확인 후 
      - 비어있으면 폼 추가가 안되게 막기, alert띄워서 "비어있으니까 폼 추가 안돼"라고 하기
      - 안비어있으면 폼 추가 허락해주기
      */

      const settingBoxes = document.querySelectorAll(`div[id^="addSettingBoxForm-"]`);
      function blockToAddSettingBox(settingBoxes) {
         for (let i = 0; i < settingBoxes.length; i++) {
            const emptyInputs = [];
            const inputIds = ['frgOption-', 'foodNameInput-', 'dueDate-', 'foodType-', 'foodCount-', 'foodCompany-'];

            let missingFields = '';

            for (let j = 0; j < inputIds.length; j++) {
               const input = settingBoxes[i].querySelector(`input[id^="${inputIds[j]}"], select[id^="${inputIds[j]}"]`);
               if (input.value === '') {
                  emptyInputs.push(input);
                  console.log("input.parentElement", input.parentElement);
                  missingFields += input.parentElement.textContent.trim() + ' ';
                  input.style.backgroundColor = '#f4623a6e';
                  input.addEventListener('input', function () {
                     input.style.backgroundColor = '';
                  });
               }
            }

            if (emptyInputs.length > 0) {
               alertMsg = '다음 항목이 누락되었습니다:\n' + missingFields;
               showAlert(alertMsg);

               // 첫 번째 비어 있는 input에 자동 포커스 설정
               emptyInputs[0].focus();

               // createNewSettingBox()가 실행되는 것을 막기 위해 false를 반환
               return false;
            }
         }
         return true;
      }

      function setBackgroundColorBasedOnCheckedStatus(input) {
         if (input.checked) {
            input.style.backgroundColor = "#f4623a6e";
         } else {
            input.style.backgroundColor = "";
         }
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
            <input type="checkbox" name="formToRemove-${formNumber}" id="selectedForm-${formNumber}" onclick="selectedForms();">폼 선택하기
         </div>
         <div class="addSettingBoxForm-boxes">
            <div class="addSettingBoxForm-boxes-arrange">
               <!-- 냉장고 목록 -->
               <div class="box1">
                  <label for="frgOption-${formNumber}">
                     냉장고 선택
                  </label>
                  <select name="frg_name-${formNumber}" id="frgOption-${frgOptionCounter}">
                     <option value="">냉장고를 선택하세요</option>
                  </select>
               </div>
               <!-- 보관 위치 -->
               <div class="box2">
                  <label for="foodStateFrozen foodStateCool"> 
                     보관상태
                  </label>
                  <div class="box2-1">
                     <input type="radio" name="in_state-${formNumber}" id="foodStateFrozen-${formNumber}"  value="frozen" checked/>냉동
                     <input type="radio" name="in_state-${formNumber}" id="foodStateCool-${formNumber}" value="cool" />냉장
                  </div> 
               </div>
               <!-- 식품명 -->
               <div class="box3">
                  <label for="foodNameInput-${formNumber}">
                     식품명
                  </label>
                  <div class="box3-1">
                     <div class="box3-2">
                        <input type="text" name="in_name-${formNumber}" id="foodNameInput-${formNumber}"
                           placeholder="검색 결과가 입력됩니다." disabled />
                     </div>
                     <div class="box3-3">
                        <input type="checkbox" 
                           id="checkCustomInput-${formNumber}" onclick="checkCustomOrNot();">직접입력하기
                     </div>
                  </div>
               </div>
               <!-- 유통/소비기한 -->
               <div class="box4">
                  <label for="dueDate-${formNumber}">
                     유통/소비기한
                  </label>
                   <input type="date" name="in_expireDate-${formNumber}" id="dueDate-${formNumber}" value="">
               </div>
               <!-- 식품유형 -->
               <div class="box5">
                  <label for="foodType-${formNumber}">
                     식품유형 
                  </label>
                  <input type="text" name="in_type-${formNumber}" id="foodType-${formNumber}" placeholder="검색 결과가 입력됩니다." disabled>
               </div>
               <!-- 수량 -->
               <div class="box6">
                  <label for="foodCount-${formNumber}">
                     수량 
                  </label>
                     <input type="number" name="in_count-${formNumber}" id="foodCount-${formNumber}" min="1" placeholder="식품 수량 등록">
               </div>
               <!-- 제조사명 -->
               <div class="box7">
                  <label for="foodCompany-${formNumber}">
                     제조사명 
                  </label>
                  <input type="text" name="in_company-${formNumber}" id="foodCompany-${formNumber}" placeholder="검색 결과가 입력됩니다." disabled>
               </div>
            </div>
         </div>
     `;

      addSettingBox.appendChild(settingBoxNewElement);

      //모든 addSettingBoxForm
      const settingBoxElements = document.querySelectorAll(`div[id^="addSettingBoxForm-"]`);
      const addSettingBoxFormBoxes = document.querySelectorAll(".addSettingBoxForm-boxes");
      const addSettingBoxFormBoxesArrange = document.querySelectorAll(".addSettingBoxForm-boxes-arrange");
      const selectedFormsToRemove = document.querySelectorAll(".selectedFormToRemove");
      const selectedFormInputs = document.querySelectorAll(`input[id^="selectedForm-"]`);
      const Alllabels = document.querySelectorAll("label");
      const frgOptionId = document.querySelectorAll(`select[id^="frgOption-"]`);
      const foodStateFrozen = document.querySelectorAll(`input[id^="foodStateFrozen-"]`);
      const foodStateCool = document.querySelectorAll(`input[id^="foodStateCool-"]`);
      const foodNameInput = document.querySelectorAll(`input[id^="foodNameInput-"]`);
      const dueDate = document.querySelectorAll(`input[id^="dueDate"]`);
      const foodType = document.querySelectorAll(`input[id^="foodType"]`);
      const foodCount = document.querySelectorAll(`input[id^="foodCount"]`);
      const foodCompany = document.querySelectorAll(`input[id^="foodCompany"]`);
      const box1 = document.querySelectorAll(".box1");
      const box2 = document.querySelectorAll(".box2");
      const box2and1 = document.querySelectorAll(".box2-1");
      const box3 = document.querySelectorAll(".box3");
      const box4 = document.querySelectorAll(".box4");
      const box5 = document.querySelectorAll(".box5");
      const box6 = document.querySelectorAll(".box6");
      const box7 = document.querySelectorAll(".box7");


      for (let i = 0; i < settingBoxElements.length; i++) {
         settingBoxElements[i].style.position = "relative";
         settingBoxElements[i].style.width = "100%";
         settingBoxElements[i].style.height = "100%";
         settingBoxElements[i].style.backgroundColor = "#ffffff6e";
         settingBoxElements[i].style.borderRadius = "12px";

         selectedFormsToRemove[i].style.position = "relative";
         selectedFormsToRemove[i].style.width = "96%";
         selectedFormsToRemove[i].style.height = "10%";
         selectedFormsToRemove[i].style.display = "flex";
         selectedFormsToRemove[i].style.alignItems = "center";
         selectedFormsToRemove[i].style.left = "2%";

         console.log("addSettingBoxFormBoxes", addSettingBoxFormBoxes);
         addSettingBoxFormBoxes[i].style.position = "relative";
         addSettingBoxFormBoxes[i].style.width = "96%";
         addSettingBoxFormBoxes[i].style.height = "88%";
         addSettingBoxFormBoxes[i].style.margin = "0 auto";

         selectedFormInputs[i].style.margin = "5% 3%";
         selectedFormInputs[i].style.WebkitAppearance = "none";
         selectedFormInputs[i].style.border = "3px solid #fff";
         selectedFormInputs[i].style.width = "1.25rem";
         selectedFormInputs[i].style.height = "1.25rem";

         for (let i = 0; i < selectedFormInputs.length; i++) {
            setBackgroundColorBasedOnCheckedStatus(selectedFormInputs[i]);

            selectedFormInputs[i].addEventListener("change", function () {
               setBackgroundColorBasedOnCheckedStatus(selectedFormInputs[i]);
            });
         }

         addSettingBoxFormBoxesArrange[i].style.position = "relative";
         addSettingBoxFormBoxesArrange[i].style.width = "100%";
         addSettingBoxFormBoxesArrange[i].style.height = "95%";
         addSettingBoxFormBoxesArrange[i].style.margin = "0 auto";
         addSettingBoxFormBoxesArrange[i].style.top = "7%";

		 selectedFormInputs[i].style.margin="5% 3%";
		 selectedFormInputs[i].style.appearance= "none";
		 selectedFormInputs[i].style.border= "3px solid white";
		 selectedFormInputs[i].style.width= "1.25rem";
		 selectedFormInputs[i].style.height= "1.25rem";
		 
		 if(selectedFormInputs[i].checked){
		 	 selectedFormInputs[i].style.backgroundColor= "#f4623a6e";
		 }
		
         Alllabels[i].style.width = "50%";
         Alllabels[i].style.marginLeft = "4%";

         frgOptionId[i].style.width = "100%";
         frgOptionId[i].style.height = "57%";
         frgOptionId[i].style.backgroundColor = "white";
         frgOptionId[i].style.border = "0px";
         frgOptionId[i].style.borderRadius = "20px";

         foodNameInput[i].style.width = "100%";
         foodNameInput[i].style.height = "57%";
         foodNameInput[i].style.backgroundColor = "white";
         foodNameInput[i].style.border = "0px";
         foodNameInput[i].style.borderRadius = "20px";

         dueDate[i].style.width = "100%";
         dueDate[i].style.height = "57%";
         dueDate[i].style.backgroundColor = "white";
         dueDate[i].style.border = "0px";
         dueDate[i].style.borderRadius = "20px";

         foodType[i].style.width = "100%";
         foodType[i].style.height = "57%";
         foodType[i].style.backgroundColor = "white";
         foodType[i].style.border = "0px";
         foodType[i].style.borderRadius = "20px";

         foodCount[i].style.width = "100%";
         foodCount[i].style.height = "57%";
         foodCount[i].style.backgroundColor = "white";
         foodCount[i].style.border = "0px";
         foodCount[i].style.borderRadius = "20px";

         foodCompany[i].style.width = "100%";
         foodCompany[i].style.height = "57%";
         foodCompany[i].style.backgroundColor = "white";
         foodCompany[i].style.border = "0px";
         foodCompany[i].style.borderRadius = "20px";

         box1[i].style.position = "relative";
         box1[i].style.width = "100%";
         box1[i].style.position = "100%";

         box2[i].style.position = "relative";
         box2[i].style.width = "100%";
         box2[i].style.position = "100%";

         box2and1[i].style.position = "relative";
         box2and1[i].style.width = "100%";
         box2and1[i].style.display = "flex";
         box2and1[i].style.alignItems = "center";

         box3[i].style.position = "relative";
         box3[i].style.width = "100%";
         box3[i].style.position = "100%";

         box4[i].style.position = "relative";
         box4[i].style.width = "100%";
         box4[i].style.position = "100%";

         box5[i].style.position = "relative";
         box5[i].style.width = "100%";
         box5[i].style.position = "100%";

         box6[i].style.position = "relative";
         box6[i].style.width = "100%";
         box6[i].style.position = "100%";

         box7[i].style.position = "relative";
         box7[i].style.width = "100%";
         box7[i].style.position = "100%";

         }

         const lastIndex = frgOptionId.length - 1;
         frgNames.forEach(function (name) {
            if (name !== "") {
               const option = document.createElement("option");
               option.value = name;
               option.textContent = name;
               frgOptionId[lastIndex].appendChild(option);
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

         formCount++; // 위치를 조정해서 버그를 수정 해당 카운트가 진행되고 해당 innerText를 그 수에 맞춰서 변경 || 08 / 05 버그 수정
         document.getElementById("totalFormsCount").innerText = formCount;

         // 카운터를 증가시켜 다음 요소에 대한 고유한 ID 생성
         frgOptionCounter++;
         settingBoxNumber++;
         frgStateCounter++;
      //   formCount++; 여기가 기존 위치 || 08 / 05 버그 수정


      };

      
      function getAddSettingBoxForm(selectedForm) {
         //selectedForm의 가장 가까운 부모인 addSettingBoxForm을 찾음
         const addSettingBoxForm = selectedForm.closest(`div[id^='addSettingBoxForm-']`);
         //찾은 걸 return으로 내보냄
         return addSettingBoxForm;
      }

      /*selectedForms();*/
      function selectedForms() {

         // 폼 선택 div 전부 가져오기
         const selectedFormElements = document.querySelectorAll(`input[id^="selectedForm-"]`);
         console.log(selectedFormElements + "***");
         // 생성돼있는 모든 addSettingBoxForm div가져오기
         const selectedAddSettingBoxForms = document.querySelectorAll(`div[id^="addSettingBoxForm-"]`);
         // 생성돼있는 모든 addSettingBoxForm div를 감싸고 있는 div가져오기
         const parentAddSettingBoxWrapper = document.querySelector(".addSettingBox-Wrapper");
         // 선택된 addSettingBoxForm을 담을 배열 그릇 준비
         let selectedAllAddSettingBoxForms = [];

         //console.log("selectedFormElements",selectedFormElements[0]);

         for (let i = 0; i < selectedFormElements.length; i++) {
            if (selectedFormElements.length >= 1 && selectedAddSettingBoxForms[i] && selectedAddSettingBoxForms[i].parentNode === parentAddSettingBoxWrapper) {
               // 폼 선택 div를 하나씩 조회
               let selectedForm = selectedFormElements[i];
               //console.log("selectedForm",selectedForm);
               // 선택된 폼 div의 부모인 addSettingBoxForm를 찾음
               let addSettingBoxForm = getAddSettingBoxForm(selectedForm);
               // console.log("addSettingBoxForm",addSettingBoxForm);

               if (selectedForm.checked) {
                  selectedAllAddSettingBoxForms.push(addSettingBoxForm);
                  addSettingBoxForm.style.backgroundColor = "#f8f9faad";
               } else if (!selectedForm.checked) {
                  addSettingBoxForm.style.backgroundColor = "#ffffff6e";
               }

            } else if (selectedFormElements.length >= 1 && selectedAddSettingBoxForms[i] && selectedAddSettingBoxForms[i].parentNode !== parentAddSettingBoxWrapper) {
               // addSettingBoxForm은 존재하는데, 그의 부모 노드가 .addSettingBox-Wrapper가 아니면 console로 찍어줘
               console.log("addSettingBoxForm의 부모 노드가 아닙니다");
            }
         }

         //배열 그릇에 담은 addSettingBoxesForms를 내보내줘
         return selectedAllAddSettingBoxForms;
      }



      function removeChosenSettingBox() {
         const parentAddSettingBoxWrapper = document.querySelector(".addSettingBox-Wrapper");
         const settingBoxesChosenToRemove = selectedForms();
         const selectedFormElements = document.querySelectorAll(`input[id^="selectedForm-"]:checked`);
         const selectedFormElementsCountToRemove = selectedFormElements.length;

         if (selectedFormElementsCountToRemove === 0) {
            alertMsg = "삭제할 폼을 선택하지 않았습니다. 폼을 선택해주세요";
            showAlert(alertMsg);
            return;
         }

         let isAllRemoved = selectedFormElementsCountToRemove === parentAddSettingBoxWrapper.childElementCount;
         alertMsg = "선택하신 폼을 삭제하겠습니다.";

         for (let i = 0; i < selectedFormElementsCountToRemove; i++) {
            const formToRemove = settingBoxesChosenToRemove[i];
            parentAddSettingBoxWrapper.removeChild(formToRemove);
            formCount--; //formCount를 초기화 해주는 작업이 없어서 작동을 안한것으로 판단 || 08 / 05 버그 수정
         }

         if (isAllRemoved) {
            alertMessage = "모든 폼을 삭제하고 새로운 빈 폼을 추가하겠습니다.";
            // 새로운 빈 폼을 추가하는 로직을 호출하세요. 예를 들면, addNewForm(); 함수를 호출합니다.
            createNewSettingBox();
            //formCount 원래 없었음 || 08 / 05 버그 수정
            formCount = 1; //formCount || 해당 form이 전부 삭제하고 새로운 빈 form을 추가할때 같이 초기화 || 08 / 05 버그 수정
         }

         showAlert(alertMsg);

         if (document.getElementById("totalFormsCount")) {
            document.getElementById("totalFormsCount").innerText = formCount;
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
            const changeBackground = isCustomChecked ? "#fff4d4" : "white";

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
         let addSettingBoxesDataList = [];
         let frgOptionInput, frgStateInput, foodNameInput, dueDateInput, foodTypeInput, foodCountInput, foodCompanyInput;

         for (let i = 0; i < addSettingBoxes.length; i++) {
            frgOptionInput = addSettingBoxes[i].querySelector(`select[name^="frg_name-"]`);
            frgStateInput = addSettingBoxes[i].querySelector(`input[name^="in_state-"]:checked`);
            foodNameInput = addSettingBoxes[i].querySelector(`input[name^="in_name-"]`);
            dueDateInput = addSettingBoxes[i].querySelector(`input[name^="in_expireDate-"]`);
            foodTypeInput = addSettingBoxes[i].querySelector(`input[name^="in_type-"]`);
            foodCountInput = addSettingBoxes[i].querySelector(`input[name^="in_count-"]`);
            foodCompanyInput = addSettingBoxes[i].querySelector(`input[name^="in_company-"]`);

            if ( //폼이 비어있지 않으면 데이터를 서버로 보내기
               frgOptionInput.value !== "" &&
               frgStateInput &&
               foodNameInput.value !== "" &&
               dueDateInput.value !== "" &&
               foodTypeInput.value !== "" &&
               foodCountInput.value !== "" &&
               foodCompanyInput.value !== ""
            ) {

               alertMsg = formCount + "개의 식품정보를 등록하겠습니다.";
               showAlert(alertMsg);

               let frgOption = frgOptionInput.value;
               let frgState = frgStateInput.value;
               let foodName = foodNameInput.value;
               let dueDate = dueDateInput.value;
               let foodType = foodTypeInput.value;
               let foodCount = parseInt(foodCountInput.value);
               let foodCompany = foodCompanyInput.value;
               let preparedDueDate = new Date(dueDate);

               // 데이터를 서버로 전송하기 위해 객체로 만들기
               let addSettingBoxesData = {
                  frg_name: frgOption,
                  in_state: frgState,
                  in_name: foodName,
                  in_expireDate: preparedDueDate,
                  in_type: foodType,
                  in_count: foodCount,
                  in_company: foodCompany
               }
               
               addSettingBoxesDataList.push(addSettingBoxesData);

            } else if(
               frgOptionInput.value == "" ||
               frgStateInput &&
               foodNameInput.value == "" ||
               dueDateInput.value == "" ||
               foodTypeInput.value == "" ||
               foodCountInput.value == "" ||
               foodCompanyInput.value == ""
            ){
               alertMsg = "비어있는 폼을 기입해주세요.";
               showAlert(alertMsg);
               return ;
            }
         }
         
         $.ajax({
               type: "POST",
               url: `${contextPath}/frg/innerAdd/submit`,
               contentType: "application/json",
               data: JSON.stringify(addSettingBoxesDataList),
               dataType: "json",
               success: function (response) {
                  if (response.success) {
                     alertMsg = formCount + "개의 식품을 성공적으로 등록했습니다. 식품 조회 페이지로 이동합니다.";
                     showAlert(alertMsg);
				     setTimeout(function() {
                     	window.location.href = `${contextPath}/frg/innerCtrl?frgName=${frgOptionInput.value}`;
					 }, 2500);
                  } else {
                     alertMsg = "등록 실패 : " + response.message;
                     showAlert(alertMsg);
                  }
               },
               error: function (err) {
                  alertMsg = "등록 실패: 서버 내부 오류가 발생했습니다.";
                  showAlert(alertMsg);
               }
            });
      }
   

