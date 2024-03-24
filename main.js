import { celebrate, database } from "./special_codes.js";

const left = document.querySelector(".left");
const right = document.querySelector(".right");
const Your_Best_Score = document.querySelector(".Your-Best-Score");
const Username_input = document.querySelector(".Username_input");

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
// Add event listener to input field
Username_input.addEventListener("input", function (event) {
  const inputValue = event.target.value;
  // Save the value to localStorage
  localStorage.setItem("username", inputValue);
});
Username_input.value = localStorage.getItem("username");
// Top 5
var Top5Ref = database.ref("Top5");
let Top5_list = [];
// Reading nested elements
Top5Ref.on("value", snapshot => {
  snapshot.forEach(childSnapshot => {
    var childData = childSnapshot.val();
    document.querySelector(".top_" + childSnapshot.key).innerHTML =
      "<span>" +
      childSnapshot.key +
      "." +
      "</span>" +
      "<span class='playername'>" +
      childData.playerName +
      "</span>" +
      " " +
      "<span class='playerscore'>" +
      childData.playerScore;
    ("</span>");
    Top5_list[childSnapshot.key - 1] = {
      playerName: childData.playerName,
      playerScore: childData.playerScore,
      deviceToken: childData.deviceToken,
    };
  });
});

// Update Top5 score list in the database if necessary
function updateTop5Score(score, name) {
  let Top5_copy = Top5_list.slice();
  //Check if already in top 5 list
  let alreadyInTop5 = false;
  for (var i = 0; i < Top5_copy.length; i++) {
    if (Top5_copy[i].deviceToken === deviceToken) {
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
  Top5_copy.forEach(function (value, index, array) {
    Top5Ref.child(index + 1).update(value);
  });
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
  updateTop5Score(counter, Username_input.value);
  if (counter > bestScore) {
    bestScore = counter;
    localStorage.setItem("Best Score", bestScore);
    Your_Best_Score.innerText = bestScore;
    Your_Best_Score.style.color = colorMap[bestScore] || "white";
  }
}
