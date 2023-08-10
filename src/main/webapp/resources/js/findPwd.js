$(document).ready(function() {

    $("#checkEmail").on("click" , function(){
        //이메일 주소 가져오기
        let email = $("#user_email").val();

        if(!validateEmail(email)){
            alertMsg = "올바르지 않은 이메일 주소입니다.";
            showAlert(alertMsg);
            return;
        }

        let user_email = {
            user_email: email
        };

        //ajax
        $.ajax({
            url: "emailRandomCode",
            type:"POST",
            data:JSON.stringify(user_email),
            contentType: "application/json",
            dataType:"text",
            success:function(response){
                alertMsg = response;
                showAlert(alertMsg);
            },
            error:function(){
                alertMsg = "인증코드 전송에 실패했습니다.";
                showAlert(alertMsg);
            }
        });
    });

    $("#checkCode").on("click" , function(){
        console.log("여기 1");
        let email = $("#user_email").val();
        let inputCode = $("#certification_number").val();

        if(inputCode === ""){
            alertMsg = "인증 코드를 입력하세요.";
            showAlert(alertMsg);
            return;
        }

        $.ajax({
            url:"checkEmailCode",
            type:"POST",
            data:{
                email: email,
                code: inputCode
            },
            success:function(response){
                if(response){
                    alertMsg = "인증 코드가 일치합니다.";
                    showAlert(alertMsg);
                    //인증 성공 처리 로직은 여기에 입력
                    $("#user_pw").prop("disabled", false);
                    $("#verifyPwd").prop("disabled", false);
                }else{
                    alertMsg = "인증 코드가 일치하지 않습니다.";
                    showAlert(alertMsg);
                }
            },
            error:function(){
                alertMsg = "인증 코드 확인에 실패했습니다.";
                showAlert(alertMsg);
            }

        });
    });
    $("#user_pw, #verifyPwd").on("input", checkPwdMatch);

    $("#submitButton").on("click", function () {
        let email = $("#user_email").val();
        let password = $("#user_pw").val();
        let data = {
            user_email: email,
            user_pw: password,
        };

        if(!pwdInputCheck()){
            return;
        }

        console.log("여기 2");
        $.ajax({
            url: "checkPwd",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            dataType: "text",
            success: function (response) {
                alertMsg = "비밀번호 변경이 완료되었습니다.";
                showAlert(alertMsg);
                location.href = `${contextPath}/frg/login`;
            },
            error: function (jqXHR) {
                console.log(jqXHR);
                if (jqXHR.status === 400) {
                    alertMsg = "비밀번호 변경이 실패했습니다.";
                    showAlert(alertMsg);
                } else {
                    alertMsg = "서버에서 오류가 발생했습니다.";
                    showAlert(alertMsg);
                }
                return;
            },
        });
    });
});

function validateEmail(email){
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

function checkPwdMatch() {
    let user_pw = $("#user_pw").val();
    let verifyPwd = $("#verifyPwd").val().trim();
    let pwdAlert = $("#pwdAlert");
    let submitButton = $("#submitButton");

    if (!user_pw || !verifyPwd) {
        pwdAlert.html("");
        submitButton.prop("disabled", true);
        return;
    }

    if (user_pw !== verifyPwd) {
        pwdAlert.html("불일치");
        pwdAlert.css("color", "red");
        submitButton.prop("disabled", true);
    } else {
        pwdAlert.html("일치");
        pwdAlert.css("color", "#35FF03");
        submitButton.prop("disabled", false);
    }
}

//비밀번호 관련 묶음
function pwdInputCheck(){
    const pwInput = document.querySelector("#user_pw"); //비밀번호
    const pwCheck = document.querySelector("#verifyPwd"); //비밀번호 확인
    const pwdPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; //비밀번호 유효성
    var userPw = $("#user_pw");
    
    if(pwInput.value === ""){
      alertMsg = "비밀번호를 입력해 주세요. 변경을 원하지 않을 시 기존의 비밀번호를 입력해 주세요.";
      showAlert(alertMsg);
      return false;
    }
    if (pwCheck.value === "") { //user_pw 또는 pwCheck가 비어 있으면 알림을 비우고 버튼 비활성화
      alertMsg = "비밀번호 확인을 해주세요.";
      showAlert(alertMsg);
      return false;
    }
    if (pwInput.value !== pwCheck.value) {
      alertMsg = "비밀번호가 일치하지 않습니다.";
      showAlert(alertMsg);
      return false;
    }
    if(!pwdPattern.test(userPw.val())){
      alertMsg = "비밀번호는 최소 8자리 이상이며, 최소 하나의 대소문자, 숫자, 특수문자(@$!%*#?&)를 포함해야 합니다.";
      showAlert(alertMsg);
      return false;
    }
    return true;
}