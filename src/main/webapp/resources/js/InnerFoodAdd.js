window.onload=function(){

	searchFoodAPI();
	
}

/* searchFoodAPI(); */
function searchFoodAPI() {
  const searchFood = document.querySelector('#searchInput');
  const searchData = searchFood.value;

  $.ajax({
    url: '${pageContext.servletContext.contextPath}/frg/innerAdd/search',
    async: true,
    method: 'post',
    data: { searchKeyword: searchData }, // 데이터를 객체 형태로 전달합니다.
    dataType: 'json',
    success: function(data, textStatus) {
      // 성공적으로 응답을 받았을 때 처리할 로직을 작성합니다.
      alert("식품 조회에 성공했습니다");
    },
    error: function(err) {
      console.log('식품 조회에 실패했습니다. 재시도하세요!');
    }
  });
}


/* changeFormAction(); */


/* addFood(); */


/* addFinish(); */



