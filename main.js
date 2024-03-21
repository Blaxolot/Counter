import { celebrate, database } from "./special_codes.js";

const left = document.querySelector(".left");
const right = document.querySelector(".right");
const Your_Best_Score = document.querySelector(".Your-Best-Score");
const Global_Best_Score = document.querySelector(".Global-Best-Score");

let leftCounter = 0;
let rightCounter = 0;
let spacePressed = false;

let bestScore = localStorage.getItem("Best Score") || 0;
Your_Best_Score.innerText = bestScore;
const colorMap = {
  200: "green",
  301: "orange",
  404: "red",
  500: "rgb(255, 200, 0)",
};
Your_Best_Score.style.color = colorMap[bestScore] || "white";

// Retrieve the global best score from the database
let globalBestScore;
const globalBestScoreRef = database.ref("globalBestScore");
globalBestScoreRef.on("value", snapshot => {
  const prevGlobalBestScore = globalBestScore;
  globalBestScore = snapshot.val() || 0;
  Global_Best_Score.innerText = globalBestScore;

  // Highlight animation when global best score increases
  if (globalBestScore > prevGlobalBestScore && prevGlobalBestScore > 0) {
    Global_Best_Score.classList.add("highlight");
    setTimeout(() => {
      Global_Best_Score.classList.remove("highlight");
    }, 1000);
  }
});

// Update the global best score in the database if necessary
function updateGlobalBestScore(score) {
  if (score > globalBestScore) {
    globalBestScore = score;
    globalBestScoreRef.set(globalBestScore);
    Global_Best_Score.innerText = globalBestScore;
  }
}

document.addEventListener("click", handleClick);
document.addEventListener("contextmenu", handleClick);
document.addEventListener("keydown", handleSpacePress);
document.addEventListener("keyup", handleSpacePress);

function handleClick(event) {
  event.preventDefault();
  if (event.type === "click") {
    leftCounter++;
    updateCounter(left, leftCounter);
  } else if (event.type === "contextmenu") {
    rightCounter++;
    updateCounter(right, rightCounter);
    right.style.marginLeft = "8px";
  }
}

function handleSpacePress(event) {
  if (event.key === " ") {
    event.preventDefault();
    if (!spacePressed) {
      spacePressed = true;
      leftCounter++;
      updateCounter(left, leftCounter);
    }
  }

  if (event.type === "keyup" && event.key === " ") {
    spacePressed = false;
  }
}

function updateCounter(element, counter) {
  element.innerHTML = counter;
  element.style.fontSize = `${counter * 0.8 + 17}px`;
  if (leftCounter === 1000) {
    left.classList.add("Gradient-animation");
    celebrate();
  }
  if (rightCounter === 1000) {
    right.classList.add("Gradient-animation");
    celebrate();
  } else {
    const color =
      colorMap[counter] ||
      `rgb(${counter + 30},${counter + 30},${counter + 30})`;
    element.style.color = color;
  }

  if (counter >= bestScore) {
    bestScore = counter;
    localStorage.setItem("Best Score", bestScore);
    Your_Best_Score.innerText = bestScore;
    Your_Best_Score.style.color = colorMap[bestScore] || "white";
  }
  if (counter > globalBestScore) {
    updateGlobalBestScore(counter);
  }
}
