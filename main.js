import { celebrate, database } from "./special_codes.js";

const left = document.querySelector("#left");
const right = document.querySelector("#right");
const Your_Best_Score = document.querySelector("#Your_Best_Score");
const Username_input = document.querySelector("input");

let leftCounter = 0;
let rightCounter = 0;
let spacePressed = false;
let deviceToken = localStorage.getItem("DeviceToken");
let bestScore = localStorage.getItem("Best Score") || 0;

Your_Best_Score.innerText = bestScore;
const colorMap = {
  200: "green",
  301: "orange",
  404: "red",
  500: "rgb(255, 200, 0)",
};
Your_Best_Score.style.color = colorMap[bestScore] || "white";

// Generate random device token if not present
if (!deviceToken) {
  deviceToken = Math.random().toString(36).substring(7);
  localStorage.setItem("DeviceToken", deviceToken);
}
// Set initial value from localStorage and save changes on input
Username_input.value = localStorage.username || "";
Username_input.oninput = () => (localStorage.username = Username_input.value);
// Top 5
const Top5 = database.ref("Top5");
let Top5_list = [];
// Reading nested elements
Top5.on("value", snapshot => {
  snapshot.forEach(childSnapshot => {
    const { playerName, playerScore, deviceToken } = childSnapshot.val();
    const key = childSnapshot.key;
    document.querySelector("#top_" + key).innerHTML =
      key +
      "." +
      "<span class='player_name'>" +
      playerName +
      "</span>" +
      " " +
      "<span class='player_score'>" +
      playerScore +
      "</span>";
    Top5_list[childSnapshot.key - 1] = {
      playerName: playerName,
      playerScore: playerScore,
      deviceToken: deviceToken,
    };
  });
});

// Update Top5 score list in the database if necessary
function updateTop5Score(score, name) {
  let Top5_copy = Top5_list.slice();
  // Check if already in top 5 list
  let alreadyInTop5 = false;
  for (var i = 0; i < Top5_copy.length; i++) {
    if (Top5_copy[i].deviceToken == deviceToken) {
      alreadyInTop5 = true;
      if (Top5_copy[i].playerScore < score) {
        // Add the new score to the Top5_list array
        Top5_copy[i] = {
          playerName: name,
          playerScore: score,
          deviceToken: deviceToken,
        };
        break;
      } else alreadyInTop5 = false;
    }
  }
  if (alreadyInTop5 !== true) {
    // Add the new score to the Top5_list array
    Top5_copy.push({
      playerName: name,
      playerScore: score,
      deviceToken: deviceToken,
    });
  }

  // Sort the array after populating it
  Top5_copy.sort((a, b) => b.playerScore - a.playerScore);
  // Keep only the top 5 scores
  Top5_copy = Top5_copy.slice(0, 5);
  // Update firebase Top5 scores
  Top5_copy.forEach(function (value, index) {
    Top5.child(index + 1).update(value);
  });
}

document.addEventListener("click", handleClick);
document.addEventListener("contextmenu", handleClick);
document.addEventListener("keydown", handleSpacePress);
document.addEventListener("keyup", handleSpacePress);

function handleClick(event) {
  event.preventDefault();
  if (event.type == "click") {
    leftCounter++;
    updateCounter(left, leftCounter);
  } else if (event.type == "contextmenu") {
    rightCounter++;
    updateCounter(right, rightCounter);
    right.style.marginLeft = "8px";
  }
}

function handleSpacePress(event) {
  if (event.key == " ") {
    event.preventDefault();
    if (!spacePressed) {
      spacePressed = true;
      leftCounter++;
      updateCounter(left, leftCounter);
    }
  }

  if (event.type == "keyup" && event.key == " ") {
    spacePressed = false;
  }
}

function updateCounter(element, score) {
  element.innerHTML = score;
  element.style.fontSize = `${score * 0.8 + 17}px`;
  if (leftCounter == 1000) {
    left.classList.add("Gradient_animation");
    celebrate();
  }
  if (rightCounter == 1000) {
    right.classList.add("Gradient_animation");
    celebrate();
  } else {
    const color =
      colorMap[score] || `rgb(${score + 30},${score + 30},${score + 30})`;
    element.style.color = color;
  }

  if (score > bestScore) {
    updateTop5Score(score, Username_input.value);
    bestScore = score;
    localStorage.setItem("Best Score", bestScore);
    Your_Best_Score.innerHTML = bestScore;
    Your_Best_Score.style.color = colorMap[bestScore] || "white";
  }
}
