$(document).ready(function(){

    //1. 냉장고 목록 option태그 조작
    //select를 html에서 가져옴
    let frgListSelect = document.querySelectorAll('select[name="frgList"]');
    
    $.ajax({
        URL:'$pageContext.servletContext.contextPath}/frg/innerAdd',
        method: 'GET',
        success: function(response){
            //frg_name을 server에서 데려옴
            let frgNames = JSON.parse(response);
            console.log(frgNames);
            //option태그를 frg_name의 개수만큼 생성함
            for(let i=0; i<frgNames.length; i++){
                var option = document.createElement("option");
                //frg_name을 option배열의 value에 차례대로 넣음
                option[i].value=frgNames[i];
                //잘 들어갔는지 console에서 확인함
                console.log(option[i].value=frgNames[i]);
                //완성된 option태그를 select안에 넣음
                frgListSelect.appenChild(option[i]);
            }
        },
        error: function(err){
            console.log("냉장고 이름 목록 가져오기 실패");
        }

    })

    //식품명 search해서 submit했을 때 foodAPI를 조회하도록 조작
    iterateFoodAPI();
    //input - checkbox를 눌렀을 때 form.action이 innerAdd/Custom으로 이동하게끔 조작
    changeFormAction();
    //+버튼을 누르면 form형식이 하단에 추가 생성되도록 조작
    addNewForm();
});


//식품명 search해서 submit했을 때 foodAPI를 조회하도록 조작
function iterateFoodAPI(){

}

 //input - checkbox를 눌렀을 때 form.action이 innerAdd/Custom으로 이동하게끔 조작
 function changeFormAction(){

     //form.action이 custom으로 바뀌면 숨겨져야 할 태그 (유통소비기한, 제조사명) 조작

 }

 //+버튼을 누르면 form형식이 하단에 추가 생성되도록 조작
 function addNewForm(){

 }