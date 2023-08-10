function login() {
    var id = document.getElementById("user_id").value;
    var pw = document.getElementById("user_pw").value;
    
    if (id === "") {
        alertMsg = "아이디를 입력하세요.";
        showAlert(alertMsg);
        return false;
    }
    
    if (pw === "") {
        alertMsg = "비밀번호를 입력하세요.";
        showAlert(alertMsg);
        return false;
    }
}

function showMsg(msg){
	if(msg != null && msg !=''){
		alertMsg = msg;
		showAlert(alertMsg);
	}
}