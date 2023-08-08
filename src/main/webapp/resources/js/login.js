function login() {
    var id = document.getElementById("user_id").value;
    var pw = document.getElementById("user_pw").value;
    
    if (id === "") {
        alert("아이디를 입력하세요.");
        return false;
    }
    
    if (pw === "") {
        alert("비밀번호를 입력하세요.");
        return false;
    }
}

function showMsg(msg){
   if(msg != null && msg !=''){
      alert(msg);
   }
   
}