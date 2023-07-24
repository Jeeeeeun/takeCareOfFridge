let foodLists;
let oneDetail;
let frgNameLists;

window.onload = function () {
    foodLists = JSON.parse(listAll);
    oneDetail = JSON.parse(oneFoodDetail);
    frgNameLists = JSON.parse(frgNameJson);

    console.log(frgNameLists);

    // 냉장고 이름 목록을 드롭박스에 추가
    var currFrg = document.getElementById('frgSelect'); // select 요소

    var optionAll = document.createElement('option');
    optionAll.textContent = "전체";
    currFrg.appendChild(optionAll);

    for (var i = 0; i < frgNameLists.length; i++) {
        var option = document.createElement('option');
        option.textContent = frgNameLists[i];
        console.log(frgNameLists[i]);
        currFrg.appendChild(option);
    }


    // 데이터를 테이블에 추가하는 함수
    function addDataToTable(data) {
        const tableBody = document.querySelector("#foodTable tbody");
        tableBody.innerHTML = ""; // 기존 데이터 초기화

        data.forEach(item => {
            const row = document.createElement("tr");
            const nameCell = document.createElement("td");
            const expireDateCell = document.createElement("td");
            const dDayCell = document.createElement("td");
            const stateCell = document.createElement("td");

            nameCell.textContent = item.in_name;
            expireDateCell.textContent = item.in_expireDate_custom;
            dDayCell.textContent = item.d_DAY;
            stateCell.textContent = item.in_state;

            row.appendChild(nameCell);
            row.appendChild(expireDateCell);
            row.appendChild(dDayCell);
            row.appendChild(stateCell);

            tableBody.appendChild(row);
        });
    }
    
}