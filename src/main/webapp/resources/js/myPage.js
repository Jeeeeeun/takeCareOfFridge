window.onload = function () {
  updateFrg(currentIndex);
};

var currentIndex = 0;

function updateFrg(i) {
  var frgName = document.getElementsByClassName("frg_name");
  var frgShape = document.getElementsByClassName("frg_shape");
  var frgAstate = document.getElementById("myFrgAstate");
  var frgBstate = document.getElementById("myFrgBstate");
  var aFrozenBtn = document.getElementById("frgAfrozenBtn");
  var aCoolBtn = document.getElementById("frgAcoolBtn");
  var bFrozenBtn = document.getElementById("frgBfrozenBtn");
  var bCoolBtn = document.getElementById("frgBcoolBtn");

  frgName[0].textContent = frgListJson[i].frg_name;
  frgName[1].value = frgListJson[i].frg_name;

  switch (frgListJson[i].frg_shape) {
    case "H":
      frgShape[0].src = window.contextPath + "/resources/img/hFrgLabel.svg";
      frgShape[0].style.height = "80%";
      frgShape[0].style.width = "auto";
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
      frgShape[0].src = window.contextPath + "/resources/img/vFrgLabel.svg";
      frgShape[0].style.height = "80%";
      frgShape[0].style.width = "auto";
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
      frgShape[0].src = window.contextPath + "/resources/img/sFrgLabel.svg";
      frgShape[0].style.height = "80%";
      frgShape[0].style.width = "auto";
      frgAstate.style.position = "relative";
      frgAstate.style.top = "-540%";
      frgAstate.style.left = "85%";
      frgAstate.style.fontWeight = "bold";
      break;
  }

  // A 상태에 대한 코드
  switch (frgListJson[i].frg_Astate) {
    case "cool":
      aFrozenBtn.selected = "true";
      aCoolBtn.selected = "false";
      frgAfrozenBtn.classList.add("frgSelected");
      frgAcoolBtn.classList.remove("frgSelected");
      break;
    case "frozen":
      aFrozenBtn.selected = "false";
      aCoolBtn.selected = "true";
      frgAfrozenBtn.classList.remove("frgSelected");
      frgAcoolBtn.classList.add("frgSelected");
      break;
  }

  // B 상태에 대한 코드
  switch (frgListJson[i].frg_Bstate) {
    case "frozen":
      bFrozenBtn.selected = "true";
      bCoolBtn.selected = "false";
      frgBfrozenBtn.classList.add("frgSelected");
      frgBcoolBtn.classList.remove("frgSelected");
      break;
    case "cool":
      bFrozenBtn.selected = "false";
      bCoolBtn.selected = "true";
      frgBfrozenBtn.classList.remove("frgSelected");
      frgBcoolBtn.classList.add("frgSelected");
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
