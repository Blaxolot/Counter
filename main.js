const left = document.querySelector(".left");
const right = document.querySelector(".right");
const h1 = document.querySelector(".h1");
const Your_Best_Score = document.querySelector(".Your-Best-Score");
var span = document.querySelector("span");
Your_Best_Score.innerHTML = localStorage.getItem("Best Score");
if (localStorage.getItem("Best Score") == null) {
  Your_Best_Score.innerHTML = "";
}
if (Your_Best_Score.innerHTML == "200") {
  Your_Best_Score.style.color = "green";
}
if (Your_Best_Score.innerHTML == "301") {
  Your_Best_Score.style.color = "orange";
}
if (Your_Best_Score.innerHTML == "404") {
  Your_Best_Score.style.color = "red";
}
if (Your_Best_Score.innerHTML == "500") {
  Your_Best_Score.style.color = "rgb(255, 200, 0)";
}

let leftCounter = 0;
let rightCounter = 0;
let left_color = 30;
let right_color = 30;
let left_fontSize = 17;
let right_fontSize = 17;
let bigger_number = 0;

document.addEventListener("click", function () {
  left_color += 1;
  leftCounter += 1;
  left.innerHTML = leftCounter;
  left.style.fontSize = `${(left_fontSize += 1)}px`;
  left.style.color = `rgb(${left_color},${left_color},${left_color})`;
  console.log("Left click:", leftCounter);
  if (leftCounter == 200) {
    left.style.color = "green";
  }
  if (leftCounter == 301) {
    left.style.color = "orange";
  }
  if (leftCounter == 404) {
    left.style.color = "red";
  }
  if (leftCounter == 500) {
    left.style.color = "rgb(255, 200, 0)";
  }
  if (leftCounter == 1000) {
    celebrate();
  }

  if (leftCounter < localStorage.getItem("Best Score")) {
  } else if (
    leftCounter > localStorage.getItem("Best Score") ||
    rightCounter < leftCounter
  ) {
    bigger_number = leftCounter;
    localStorage.setItem("Best Score", bigger_number);
    Your_Best_Score.innerText = localStorage.getItem("Best Score");
  }
  if (localStorage.getItem("Best Score") == 200) {
    Your_Best_Score.style.color = "green";
  } else if (localStorage.getItem("Best Score") == 301) {
    Your_Best_Score.style.color = "orange";
  } else if (localStorage.getItem("Best Score") == 404) {
    Your_Best_Score.style.color = "red";
  } else if (localStorage.getItem("Best Score") == 500) {
    Your_Best_Score.style.color = "rgb(255, 200, 0)";
  } else {
    Your_Best_Score.style.color = "white";
  }
});

document.addEventListener("contextmenu", event => {
  event.preventDefault();
  rightCounter += 1;
  right_color += 1;
  right.innerHTML = rightCounter;
  right.style.fontSize = `${(right_fontSize += 1)}px`;
  right.style.color = `rgb(${right_color},${right_color},${right_color})`;

  console.log("Right click:", rightCounter);
  if (rightCounter == 200) {
    right.style.color = "green";
  }
  if (rightCounter == 301) {
    right.style.color = "orange";
  }
  if (rightCounter == 404) {
    right.style.color = "red";
  }
  if (rightCounter == 500) {
    right.style.color = "rgb(255, 200, 0)";
  }
  if (rightCounter == 1000) {
    celebrate();
  }

  if (rightCounter < localStorage.getItem("Best Score")) {
  } else if (
    rightCounter > localStorage.getItem("Best Score") ||
    rightCounter > leftCounter
  ) {
    bigger_number = rightCounter;
    localStorage.setItem("Best Score", bigger_number);
    Your_Best_Score.innerText = localStorage.getItem("Best Score");
  }
  if (localStorage.getItem("Best Score") == 200) {
    Your_Best_Score.style.color = "green";
  } else if (localStorage.getItem("Best Score") == 301) {
    Your_Best_Score.style.color = "orange";
  } else if (localStorage.getItem("Best Score") == 404) {
    Your_Best_Score.style.color = "red";
  } else if (localStorage.getItem("Best Score") == 500) {
    Your_Best_Score.style.color = "rgb(255, 200, 0)";
  } else {
    Your_Best_Score.style.color = "white";
  }
});

function celebrate() {
  var defaults = {
    spread: 360,
    ticks: 150,
    gravity: 0,
    decay: 0.94,
    startVelocity: 35,
    particleCount: 50,
  };

  function shoot() {
    confetti({
      ...defaults,
      scalar: 1.2,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      scalar: 0.75,
      shapes: ["circle"],
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}
