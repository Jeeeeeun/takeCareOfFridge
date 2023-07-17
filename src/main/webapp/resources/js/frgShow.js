window.onload = function () {
    updateFrg(currentIndex);
};
  
  var currentIndex = 0;
  
  function updateFrg(i) {
    var frgName = document.getElementById("frg_name");
    var frgShapeImg = document.getElementById("frg_shape");
    var frgAstate = document.getElementById("frg_Astate");
    var frgBstate = document.getElementById("frg_Bstate");
  
    frgName.textContent = frgLists[i].frg_name;
  
    switch (frgLists[i].frg_shape) {
        case "H":
            frgShapeImg.src = window.contextPath + "/img/hFrg.svg";
            frgAstate.style.position = "relative";
            frgAstate.style.top = "-500%";
            frgAstate.style.left = "82%";
            frgAstate.style.fontWeight = "bold";
            frgBstate.style.position = "relative";
            frgBstate.style.top = "-305%";
            frgBstate.style.left = "82%";
            frgBstate.style.fontWeight = "bold";
            break;
         case "V":
            frgShapeImg.src = window.contextPath + "/img/vFrg.svg";
            frgAstate.style.position = "relative";
            frgAstate.style.top = "-500%";
            frgAstate.style.left = "34%";
            frgAstate.style.fontWeight = "bold";
            frgBstate.style.position = "relative";
            frgBstate.style.top = "-540%";
            frgBstate.style.left = "85%";
            frgBstate.style.fontWeight = "bold";
            break;
         case "S":
            frgShapeImg.src = window.contextPath + "/img/sFrg.svg";
            frgAstate.style.position = "relative";
            frgAstate.style.top = "-540%";
            frgAstate.style.left = "85%";
            frgAstate.style.fontWeight = "bold";
            break;
    }
  
    // A 상태에 대한 코드
    switch (frgLists[i].frg_Astate) {
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
    switch (frgLists[i].frg_Bstate) {
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
    if (currentIndex < frgLists.length - 1) {
      currentIndex++;
      updateFrg(currentIndex);
    }
  }
  