var alertMsg,
alertContent,
alertWindow;

/*-----------------------------------------------------------------------------------------------*/
//비밀번호 실시간 검토
function checkPasswordMatch() {
    var pw = document.getElementById('pw');
    var pwCheck = document.getElementById('pwCheck');
    var pwdAlert = document.getElementById('pwdAlert');
  
    if (pw.value === pwCheck.value) {
        pwdAlert.style.color = 'green';
        pwdAlert.innerHTML = '일치';
    } else if(pw.value === "" || pwCheck.value === "") {
        pwdAlert.innerHTML = '';
    } else {
        pwdAlert.style.color = 'red';
        pwdAlert.innerHTML = '불일치';
    }
  }
  window.onload = function () {
    alertContent = document.querySelector("#alertContent");
    alertWindow = document.querySelector("#customAlert");

    //비빌번호 일치 불일치 확인
    document.getElementById('pw').addEventListener("input",checkPasswordMatch);
    document.getElementById('pwCheck').addEventListener("input",checkPasswordMatch);
    getUserInfo();
  }
// 알림창 띄우기
function showAlert(alertMsg) {
    alertContent.textContent = alertMsg;
    alertWindow.classList.remove("hidden");
    alertWindow.classList.add("show");

    setTimeout(function () {
    alertWindow.classList.remove("show");
    alertWindow.classList.add("hidden");
    }, 3000);
}
/*-----------------------------------------------------------------------------------------------*/
// SESS_ID 데려오려는 함수
function getUserId() {
  return fetch(contextPath + "/frg/getUserId").then(function (response) {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error("사용자 ID를 가져올 수 없었습니다.");
    }
  });
}
/*-----------------------------------------------------------------------------------------------*/
//마이페이지 현재 로그인 중인 사용자 정보
function getUserInfo(){
    $.ajax({
        url: `${contextPath}/frg/userInfo`,
        method: "GET",
        dataType: "json",
        success: function(data){
                $('#name').val(data.user_name);
                $('#id').val(data.user_id);
                $('#email').val(data.user_email);
                $('#pw').val(data.user_pw);
        },
        error: function(xhr, status, error) {
            console.error("Error: ", error);
            alertMsg = "사용자 정보를 불러오는데 실패했습니다."; 
            showAlert(alertMsg); // 오류가 발생하면 메시지 표시
        }
    });
}
/*-----------------------------------------------------------------------------------------------*/
//세션 만료 관련 일정 시간 간격으로 세션 상태 확인과 세트
function checkSession(){
    $.ajax({
        url: `${contextPath}/frg/sessionExpire`,
        method: "GET",
        dataType: "json",
        success: function(data){
            if(data.sessionExpired){
                alertMsg = "다시 로그인 해주세요.";
                showAlert(alertMsg);
                window.location.href = `${contextPath}/frg/login`;
            }
        },
        error: function(xhr, status, error){
        	alertMsg = "다시 로그인 해주세요.";
            showAlert(alertMsg);
            window.location.href = `${contextPath}/frg/login`;
            console.error("Error: ", error);
        }
    });
}
//일정 시간 간격으로 세션 상태 확인 (세션 만료 관련 ajax와 세트)
setInterval(checkSession, 1000 * 60 * 60 * 24 + 1000); //24:00:01 마다 세션 검토
/*------------------------------------마이페이지 ready 선언----------------------------------------------*/
$(document).ready(function () {
  let emailChanged = false;
  let isEmailBtn = false;
//  const pwdPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; //비밀번호 유효성
/*------------------------------------// 비밀번호 유효성 검사----------------------------------------------*/
  // 비밀번호 유효성 검사 함수
//  function isValidPassword(password) {
//    return pwdPattern.test(password);
//  }
/*------------------------------------이메일 변경 여부----------------------------------------------*/
  function isEmailChanged(){
    return emailChanged;
  }
  
  document.getElementById("email").addEventListener("input" , function(){
    emailChanged = true;
  });
/*------------------------------------마이페이지 수정 버튼 토글----------------------------------------------*/
  $("#submitButton").on("click", function () {
      var submitButton = $("#submitButton");
      var userData = $(".userData");
      var userPw = $("#pw");
      var userPwCheck = $("#pwCheck");


      if (submitButton.text() === "수정하기") {
        $("#checkEmail").css("display", "flex"); //이메일 중복 확인 버튼 , 수정하기 누르면 생긴다.
          userData.each(function () {
              if (this.id !== "id") {
                  $(this).prop("disabled", false);
              }
          });
          submitButton.text("완료");
          userPw.val("");
          userPwCheck.css("display", "flex");
      } else {
        console.log(emailChanged);
        if(emailChanged && !isEmailBtn){
          alertMsg = "이메일 중복확인을 해주세요.";
          showAlert(alertMsg);
          return;
        }
        if(!pwdInputCheck()){
          return;
        }
        updateUser(); //마이페이지 수정사항 데이터 베이스에 전송
          userData.each(function () {
              $(this).prop("disabled", true);
          });
          
          submitButton.text("수정하기");
      }
  });
  /*-------------------------------------------이메일 중복-----------------------------------------------------*/
  //이메일 중복 버튼 눌렀을때 반응 함수
  function emailCheck(){
    const msgEmailDiv = $("#emailErrorMsg");
    const msgEmailSpan = msgEmailDiv.find("span");

    //이메일 중복확인 관련 JS
    $("#checkEmail").click(function() { //checkId 요소를 클릭하면 다음 함수가 실행
      let email = $("#email").val();

      // 이메일가 입력되지 않았을 경우 에러 메세지 표시
      if (email.length === 0) { 
        msgEmailSpan.text("※ 이메일을 입력해 주세요.");
        msgEmailDiv.show();
        msgEmailDiv.css("color","red");
        msgEmailDiv.removeClass("hidden");

        $("#emailErrorMsg").css("margin-bottom", "23%");

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

            $("#emailErrorMsg").css("margin-bottom", "23%");
            

          } else {
            msgEmailSpan.text("※ 사용 가능한 이메일입니다.");
            msgEmailDiv.show();
            msgEmailDiv.css("color","green");
            msgEmailDiv.removeClass("hidden");

            $("#emailErrorMsg").css("margin-bottom", "23%");

            isEmailBtn = true;//이메일 중복 확인 버튼 여부
          }
        },
      });
    });
  }
  emailCheck();
/*-------------------------------------------비밀번호 수정 관련-----------------------------------------------------*/
  //마이페이지 수정 비밀번호 관련 묶음
  function pwdInputCheck(){
    const pwInput = document.querySelector("#pw"); //비밀번호
    const pwCheck = document.querySelector("#pwCheck"); //비밀번호 확인
    const pwdPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; //비밀번호 유효성
    var userPw = $("#pw");
    
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
  /*------------------------------------------마이페이지 수정 ajax 통신----------------------------------------------------*/
//마이페이지 수정사항 업데이트
  function updateUser(){
    const isChanged = isEmailChanged(); //이메일 변경 여부 확인
      const data = {
                      user_name: $("#name").val(), // 컨트롤러에서 처리할 데이터의 이름과 같게 설정 하기
                      user_email: $("#email").val(),
                      change_email: isChanged,
                      user_pw: $("#pw").val()
                    };
      console.log("여기7");
      $.ajax({
        url: `${contextPath}/frg/updateInfo`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response){
          console.log("여기8");
          if (response) {
          alertMsg = "사용자 정보 업데이트를 성공했습니다.";
          showAlert(alertMsg);
          setTimeout(function() {
            location.reload(); // 2초 뒤에 페이지 새로 고침 실행
          }, 2000); //2초 새로고침 지연 시간
          console.log("여기9");
        }
      },
        error: function (resources, status, error) {
        alertMsg = "오류가 발생했습니다. 업데이트 실패";
        showAlert(alertMsg);
        console.log("여기10");
        console.log(data);
        console.log("JSON 데이터" + JSON.stringify(data));
      },
    });
  }
});
/*-------------------------------------------마이페이지 회원 탈퇴--------------------------------------------------*/
//회원탈퇴
$(document).ready(function() {
    $("#deleteBtn").click(function(){
      console.log("여기1");
      if(confirm("정말로 회원탈퇴를 하시겠습니까?")){
        $.ajax({
          url: `${contextPath}/frg/deleteUser`,
          type: "GET",
          dataType: "json",
          success: function(response){
            console.log("여기 2");
            var msg = response.Msg;
            console.log("response" + response);
            console.log("메세지" + msg);
            alert(msg);
            console.log("여기 3");
            if(msg === "회원 탈퇴 성공"){
                console.log("여기 4");
              location.href = `${contextPath}/frg/index`;
            } else {
                console.log("여기 5");
              location.href = `${contextPath}/frg/myPage`;
            }
          },
          error: function() {
            console.log("여기 6");
            alert("회원탈퇴중 오류가 발생했습니다.");
            location.href = `${contextPath}/frg/index`;
          }
        });
      }
    });
  });