
//searchFoodAPI();

/* searchFoodAPI(); */
function searchFoodAPI() {
  const searchFood = document.querySelector('#searchInput');
  const searchData = searchFood.value;
  let data = { searchApi: searchData };

  $.ajax({
    url: contextPath+'/frg/innerAdd/search',
    async: true,
    method: 'post',
    data: data, // 데이터를 객체 형태로 전달합니다.
    dataType: 'json',
    success: function(data, textStatus) {
      // 성공적으로 응답을 받았을 때 처리할 로직을 작성합니다.
      if(data.length == 1){
      	alert(data.api_name+"을 성공적으로 조회했습니다. 확인을 눌러주세요.");
      }else if(data.length > 1) {      
	  	alert("총 "+data.length+"개의 동일제품이 검색되었습니다. 하단 표에서 원하는 제품을 선택하세요.");
      }
      
      $("#foodApiOutPut").html(""); // 기존 데이터 초기화
		  $.each(data, function(index, item) {
		    $("#foodApiOutPut").append(`
		      <tr>
		        <td>${item.api_name}</td>
		        <td>${item.api_company}</td>
		        <td>${item.api_expiredate}</td>
		        <td>${item.api_type}</td>
		      </tr>
		    `);
 	  });
 	  
 	  

    },
    error: function(data, err) {
    
    if(data.length == 0){
    	alert("검색하신 "+data+"는(은) 없는 제품입니다. 직접 입력하여 등록하세요");
    }else {
      console.log('알 수 없는 이유로 식품 조회에 실패했습니다. 재시도하세요.');    
      console.log(data);
      console.log(err);
    }
    }
  });
}


/* changeFormAction(); */


/* addFood(); */


/* addFinish(); */



