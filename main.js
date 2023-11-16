const click = document.querySelector(".click");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const h1 = document.querySelector(".h1");

let leftCounter = 0;
let rightCounter = 0;

click.addEventListener("click", function () {
  leftCounter = leftCounter + 1;
  left.innerHTML = leftCounter;
  left.style.fontSize = `${leftCounter}px`;
  console.log("Left click:", leftCounter);
});
document.addEventListener("contextmenu", event => {
  event.preventDefault();
  rightCounter = rightCounter + 1;
  right.innerHTML = rightCounter;
  right.style.fontSize = `${rightCounter}px`;

  console.log("Right click:", rightCounter);
});
