var currentIndex = 0;
var frgName, frgNameContent, frgShapeImg, frgState, frgAstate, frgBstate;

window.onload = function () {
    frgName = document.getElementById("frg_name");
    frgShapeImg = document.getElementById("frg_shape");
	frgState = document.getElementById("frg_state");
    frgAstate = document.getElementById("frg_Astate");
    frgBstate = document.getElementById("frg_Bstate");
    
    frgShapeImg.onload = function() {
    	frgState.style.width = frgShapeImg.offsetWidth + "px";
    	frgState.style.height = frgShapeImg.offsetHeight + "px";
    	frgState.style.padding = "1%";
    }
    updateFrg(currentIndex);
};
  
  function updateFrg(i) {
  
    frgName.textContent = frgListJson[i].frg_name;
  
    switch (frgListJson[i].frg_shape) {
        case "H":
            frgShapeImg.src = contextPath + "/resources/img/hFrg.svg";
            frgState.style.flexDirection = "column";
            frgAstate.style.width = "100%";
            frgAstate.style.height = "50%";
            frgAstate.style.textAlign = "right";
            frgAstate.style.paddingRight = "4%";
            frgBstate.style.width = "100%";
            frgBstate.style.height = "50%";
            frgBstate.style.textAlign = "right";
            frgBstate.style.paddingRight = "4%";

            break;
         case "V":
            frgShapeImg.src = contextPath + "/resources/img/vFrg.svg";
            frgState.style.flexDirection = "row";
            frgAstate.style.width = "50%";
            frgAstate.style.textAlign = "right";
            frgAstate.style.paddingRight = "4%";
            frgBstate.style.width = "50%";
            frgBstate.style.textAlign = "right";
            break;
         case "S":
            frgShapeImg.src = contextPath + "/resources/img/sFrg.svg";
            frgState.style.flexDirection = "row";
            frgAstate.style.width = "100%";
            frgAstate.style.height = "100%";
            frgAstate.style.textAlign = "right";
            frgAstate.style.paddingRight = "4%";
            frgBstate.style.display = "none";
            break;
    }
  
    // A 상태에 대한 코드
    switch (frgListJson[i].frg_Astate) {
      case "cool":
        frgAstate.textContent = "냉장";
        frgAstate.style.color = "white";
        break;
      case "frozen":
        frgAstate.textContent = "냉동";
        frgAstate.style.color = "white";
        break;
    }
  
    // B 상태에 대한 코드
    switch (frgListJson[i].frg_Bstate) {
      case "cool":
        frgBstate.textContent = "냉장";
        frgBstate.style.color = "white";
        break;
      case "frozen":
        frgBstate.textContent = "냉동";
        frgBstate.style.color = "white";
        break;
    }
  }
  
  function prevFrg() {
    if (currentIndex > 0) {
      currentIndex--;
      updateFrg(currentIndex);
    }
  }
  
  function nextFrg() {
    if (currentIndex < frgListJson.length - 1) {
      currentIndex++;
      updateFrg(currentIndex);
    }
  }
  
  function goIntoFrg(url) {
		frgNameContent = frgName.textContent;

		window.location.href = url + '?frgName=' + frgNameContent;
  }
  
  function generateNewFrg() {
  	window.location.href = contextPath + "/frg/frgAdd_form";
  }