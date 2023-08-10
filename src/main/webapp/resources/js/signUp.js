//비밀번호 확인 쪽에 일치 불일치에 관한 값을 비교하고 글씨와 색깔이 바뀐다.
function checkPwdMatch() { //함수 선언, 비밀번호 일치 여부 확인
    let user_pw = document.getElementById('user_pw').value; // user_pw 요소 값을 할당
    let verifyPwd = document.getElementById('verifyPwd').value.trim(); // verifyPwd 요소 값을 할당 (공백제거)
    let pwdAlert = document.getElementById('pwdAlert');//pwdAlert 요소를 할당
    let submitButton = document.getElementById('submitButton');//submitButton 요소를 할당

    if (!user_pw || !verifyPwd) { //user_pw 또는 verifyPwd가 비어 있으면 알림을 비우고 버튼 비활성화
        pwdAlert.innerHTML = "";
        submitButton.disabled = true;
        return;
    }
    //user_pw와 verifyPwd가 일치하지 않으면 알림에 "불일치" 표시, 텍스트 빨간색, 제출 버튼 비활성화
    if (user_pw !== verifyPwd) { 
        pwdAlert.innerHTML = "불일치";
        pwdAlert.style.color = "red";
        submitButton.disabled = true; // 일치하지 않으면 버튼 비활성화
    }else{ // 그렇지 않으면 알림에 일치 표시
        pwdAlert.innerHTML = "일치";
        pwdAlert.style.color = "#35FF03";
        submitButton.disabled = false; //일치하면 버튼 활성화
    }
}

window.onload = function() { // 함수를 사용하여 페이지 로드 후 내용 실행
    //비밀번호 일치를 실시간으로 비교
    //user_pw 요소에 Input 이벤트 리스너를 추가하고 checkPwdMatch 함수 연결
    document.getElementById('user_pw').addEventListener("input",checkPwdMatch);
    //verifyPwd 요소에 Input 이벤트 리스너를 추가하고 checkPwdMatch 함수 연결
    document.getElementById('verifyPwd').addEventListener("input",checkPwdMatch);
};

$(document).ready(function() {
    const msgDiv = $("#idErrorMsg");
    const msgSpan = msgDiv.find("span");
    const msgEmailDiv = $("#emailErrorMsg");
    const msgEmailSpan = msgEmailDiv.find("span");
    const pwdPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    
    let isIdChecked = null;
    let isEmailChecked = null;
	
    //아이디 중복확인 관련 JS
    $("#checkId").click(function() { //checkId 요소를 클릭하면 다음 함수가 실행
        let id = $("#user_id").val();
		
		
		// 아이디가 입력되지 않았을 경우 에러 메세지 표시
        if (id.length === 0) { 
            msgSpan.text("※ 아이디를 입력해주세요.");
            msgDiv.show();
            msgDiv.css("color","red");
            msgDiv.removeClass("hidden");
           
            $("#user_id").css("margin-bottom", "0px");
            
            return;
        }
        //ajax 입력값이 변경되면 서버에 ajax요청 전송
        $.ajax({
            url: "checkId" ,
            type: "GET" ,
            dataType: "json",
            data: {id:id},
            success: function (result){
                if(result){
                    msgSpan.text("※ 이미 사용 중인 아이디입니다.");
                    msgDiv.show();
                    msgDiv.css("color","red");
                    msgDiv.removeClass("hidden");
           
                    $("#user_id").css("margin-bottom", "0px");
                    
                    isIdChecked = false;
                } else {
                    msgSpan.text("※ 사용 가능한  아이디입니다.");
                    msgDiv.show();
                    msgDiv.css("color","#35FF03");
                    msgDiv.removeClass("hidden");

                    $("#user_id").css("margin-bottom", "0px");
                    
                    isIdChecked = true;
                }
            },
        });
    });

    //이메일 중복확인 관련 JS
    $("#checkEmail").click(function() { //checkId 요소를 클릭하면 다음 함수가 실행
        let email = $("#user_email").val();
		
		
		// 이메일가 입력되지 않았을 경우 에러 메세지 표시
        if (email.length === 0) { 
            msgEmailSpan.text("※ 이메일을 입력해 주세요.");
            msgEmailDiv.show();
            msgEmailDiv.css("color","red");
            msgEmailDiv.removeClass("hidden");
           
            $("#user_email").css("margin-bottom", "0px");
            
            return;
        }
        //ajax 입력값이 변경되면 서버에 ajax요청 전송
        $.ajax({
            url: "checkSignUpEmail" ,
            type: "GET" ,
            dataType: "json",
            data: {email:email},
            success: function (result){
                if(result){
                    msgEmailSpan.text("※ 이미 사용 중인 이메일입니다.");
                    msgEmailDiv.show();
                    msgEmailDiv.css("color","red");
                    msgEmailDiv.removeClass("hidden");
           
                    $("#user_email").css("margin-bottom", "0px");
                    
                    isEmailChecked = false;
                } else {
                    msgEmailSpan.text("※ 사용 가능한 이메일입니다.");
                    msgEmailDiv.show();
                    msgEmailDiv.css("color","#35FF03");
                    msgEmailDiv.removeClass("hidden");

                    $("#user_email").css("margin-bottom", "0px");
                    
                    isEmailChecked = true;
                }
            },
        });
    });

    $("#user_id").on("change" , function(){
        isIdChecked = null;
    });

    $("#user_email").on("change" , function(){
        isEmailChecked = null;
    });

    $("#submitButton").click(function(e){
        const pwd = $("#user_pw").val();

        if(isIdChecked === null || isIdChecked !== true){
            e.preventDefault();
            alertMsg = "아이디 중복확인 해주세요.";
            showAlert(alertMsg);
        } else if(!pwdPattern.test(pwd)){
            e.preventDefault();
            alertMsg = "비밀번호는 최소 8자리 이상이며, 최소 하나의 대소문자, 숫자, 특수문자(@$!%*#?&)를 포함해야 합니다.";
            showAlert(alertMsg);
        } else if(isEmailChecked === null || isEmailChecked !== true){
            e.preventDefault();
            alertMsg = "이메일 중복확인 해주세요.";
            showAlert(alertMsg);
        }
    });
});