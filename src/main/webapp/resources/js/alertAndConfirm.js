var alertMsg, alertContent, alertWindow,
    confirmMsg, confirmContent, confirmWindow, confirmYesBtn, confirmNoBtn;

document.addEventListener("DOMContentLoaded", () => {
	alertContent = document.querySelector("#alertContent");
	alertWindow = document.querySelector("#customAlert");
	confirmContent = document.querySelector("#confirmContent");
	confirmWindow = document.querySelector("#customConfirm");
	confirmYesBtn = document.querySelector("#confirmYesBtn");
	confirmNoBtn = document.querySelector("#confirmNoBtn");
});

// 알림창 띄우기
function showAlert(alertMsg) {
    alertContent.textContent = alertMsg;
    alertWindow.classList.remove("hidden");
    alertWindow.classList.add("bg-opacity-100");
    
    setTimeout(function () {
        alertWindow.classList.remove("bg-opacity-100");
        alertWindow.classList.add("hidden");
    }, 2500);
}

// 컨펌창 켜기
function showConfirm(confirmMsg, yesClicked, noClicked) {
    confirmContent.textContent = confirmMsg;
    confirmWindow.classList.remove("hidden");
    confirmWindow.classList.add("bg-opacity-100");
    
    confirmYesBtn.onclick = function () {
        // Yes 눌리면 이뤄질 동작들
        if (yesClicked) {
            yesClicked(); // showConfirm 함수가 실행된 곳에서 전달한 yes 버튼 클릭시 실행될 익명의 콜백함수가 여기서 실행된다는 뜻
        }
        // 컨펌창 끄기
        closeConfirm();
    };
    
    confirmNoBtn.onclick = function () {
        // No 눌리면 이뤄질 동작들
        if (noClicked) {
            noClicked(); // showConfirm 함수가 실행된 곳에서 전달한 no 버튼 클릭시 실행될 익명의 콜백함수가 여기서 실행된다는 뜻
        }
        // 컨펌창 끄기
        closeConfirm();
    };
}

// 컨펌창 끄기
function closeConfirm() {
    confirmWindow.classList.remove("bg-opacity-100");
    confirmWindow.classList.add("hidden");
}

function noLog(){
    alert("로그인부터 하세요!");
}

function noFrg() {
    alert("냉장고 생성을 먼저 하세요!");
}