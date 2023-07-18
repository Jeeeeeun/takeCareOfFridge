/**
 * 
 */
 
 // 식품 리스트를 하나 클릭하면 상세 보기에 내용 띄우기

// 선택해서 들어온 냉장고 이름이 드롭박스에 뜨게끔
let foodLists;
let oneDetail;
let frgNameLists;

window.onload = function () {
	foodLists = JSON.parse(listAll);
	oneDetail = JSON.parse(oneFoodDetail);
	frgNameLists = JSON.parse(frgNameJson);
	
	console.log(frgNameLists);
	
}

var frgNameIdx = 0;

/*for (var i = 0; i < frgNameLists.length; i++) {
	var currFrg = document.getElementById('currentFrg'); // select 요소
	var option = document.createElement('option');
	
	option.textContent = frgNameLists[i];
	console.log(frgNameLists[i]);
	currFrg.appendChild(option);
}*/

// 전체, 냉장, 냉동을 클릭하면 그 냉장고의 보관상태에 맞는 내용만 select문 다시 실행하게

// 식품 등록 버튼을 누르면 innerFoodAdd로 이동
function addBtnClicked() {
	window.location.href = `${window.contextPath}/frg/innerAdd`;
}

// 수정 버튼을 누르면 수정 버튼, 삭제 버튼 숨김 + 수정완료 버튼 숨김 해제
// 수정 버튼을 누르면 input 태그들의 read-only 해제
function updateBtnClicked() {
	const updateBtn = document.querySelector('#upBtn');
	const deleteBtn = document.querySelector('#delBtn');
	const upEndBtn = document.querySelector('#upEndBtn');
	const frgNameSelectBox = document.querySelector('#frg');
	const detailInputBox = document.querySelectorAll('.detailInputBox');
	const frgSelect = document.querySelector('#frg');
	const radioBtns = document.querySelectorAll('input[type="radio"]');

	updateBtn.style.display = "none";
	deleteBtn.style.display = "none";
	upEndBtn.style.display = "flex";
	upEndBtn.style.justifyContent = "center";

	frgNameSelectBox.disabled = false;


	radioBtns.forEach((input) => {
    input.disabled = !input.disabled;
    input.style.backgroundColor = input.disabled ? "#eee" : "inherit";
    input.classList.toggle("disabled");
  });

  detailInputBox.forEach((input) => {
    input.disabled = !input.disabled;
    input.style.backgroundColor = input.disabled ? "#eee" : "inherit";
  });

  // frgSelect 비활성화 및 배경색 처리
  frgSelect.disabled = !frgSelect.disabled;
  frgSelect.style.backgroundColor = frgSelect.disabled ? "#eee" : "inherit";
}



// 수정완료 버튼을 누르면 상세보기 내용, 왼쪽 식품 개요 내용까지 반영

function addDataToTable(data) {
    const tableBody = document.querySelector("#foodTable tbody");
    tableBody.innerHTML = ""; // 기존 데이터 초기화

    data.forEach(item => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const expireDateCell = document.createElement("td");
        const dDayCell = document.createElement("td");

        nameCell.textContent = item.in_name;
        expireDateCell.textContent = item.in_expireDate_custom;
        dDayCell.textContent = item.D_DAY;

        row.appendChild(nameCell);
        row.appendChild(expireDateCell);
        row.appendChild(dDayCell);

        tableBody.appendChild(row);
    });
}