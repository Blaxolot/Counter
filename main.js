const click = document.querySelector(".click");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const h1 = document.querySelector(".h1");

let leftCounter = 0;
let rightCounter = 0;
let left_color = 30;
let right_color = 30;

click.addEventListener("click", function () {
  left_color = left_color + 1;
  leftCounter = leftCounter + 1;
  left.innerHTML = leftCounter;
  left.style.fontSize = `${leftCounter}px`;
  left.style.color = `rgb(${left_color},${left_color},${left_color})`;
  console.log("Left click:", leftCounter);
  if (leftCounter == 200) {
    left.style.color = "green";
  }
  if (leftCounter == 404) {
    left.style.color = "red";
  }
});
document.addEventListener("contextmenu", event => {
  event.preventDefault();
  rightCounter = rightCounter + 1;
  right_color = right_color + 1;
  right.innerHTML = rightCounter;
  right.style.fontSize = `${rightCounter}px`;
  right.style.color = `rgb(${right_color},${right_color},${right_color})`;

  console.log("Right click:", rightCounter);
  if (rightCounter == 200) { // 200 – OK :)
    right.style.color = "green";
  }
  if (rightCounter == 404) { // 404 – Not found :(
    right.style.color = "red";
  }
});
