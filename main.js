import { celebrate } from "./special_codes.js";
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const Your_Best_Score = document.querySelector(".Your-Best-Score");

let leftCounter = 0;
let rightCounter = 0;
let spacePressed = false; // Flag to track space key press

let bestScore = localStorage.getItem("Best Score");
Your_Best_Score.innerHTML = bestScore || "";
const colorMap = {
  200: "green",
  301: "orange",
  404: "red",
  500: "rgb(255, 200, 0)",
};
Your_Best_Score.style.color = colorMap[bestScore] || "white";

// Event listener for mouse clicks and space key press
document.addEventListener("click", handleClick);
document.addEventListener("contextmenu", handleClick);
document.addEventListener("keydown", handleSpacePress);
document.addEventListener("keyup", handleSpacePress); // Add keyup event listener

function handleClick(event) {
  event.preventDefault(); // Prevent default behavior

  if (event.type === "click") {
    leftCounter++;
    updateCounter(left, leftCounter);
  } else if (event.type === "contextmenu") {
    rightCounter++;
    updateCounter(right, rightCounter);
  }
}

function handleSpacePress(event) {
  if (event.key === " ") {
    event.preventDefault(); // Prevent default space key behavior
    if (!spacePressed) {
      // Check if space key is not already pressed
      spacePressed = true;
      leftCounter++;
      updateCounter(left, leftCounter);
    }
  }

  if (event.type === "keyup" && event.key === " ") {
    spacePressed = false; // Reset the spacePressed flag when space key is released
  }
}

function updateCounter(element, counter) {
  // Update counter UI
  element.innerHTML = counter;
  element.style.fontSize = `${counter + 17}px`;

  // Update counter color based on its value
  if (counter === 1000) {
    celebrate();
    left.classList.add("Gradient-animation")
  } else {
    const color =
      colorMap[counter] ||
      `rgb(${counter + 30},${counter + 30},${counter + 30})`;
    element.style.color = color;
  }

  // Update best score if necessary
  if (counter >= bestScore) {
    bestScore = counter;
    localStorage.setItem("Best Score", bestScore);
    Your_Best_Score.innerText = bestScore;
    Your_Best_Score.style.color = colorMap[bestScore] || "white";
  }
}
