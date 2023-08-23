const interval = 150;
const elementWidth = 10;
const gameContainerElements = 25;
let direction = [0, 1];
let snakeBody = [
  [12, 12],
  [12, 11],
  [12, 10],
];
let food = [5, 5, 0];
let score = 0;

const container = document.getElementById("snake-container");
container.style.width = gameContainerElements * elementWidth + "px";
container.style.height = gameContainerElements * elementWidth + "px";

setInterval(main, interval);

let oneDir = 0;

function main() {
  document.onkeydown = function (event) {
    if (oneDir === 0) {
      switch (event.key) {
        case "ArrowLeft":
          if (direction[0] !== 1) {
            direction = [-1, 0];
          }
          break;
        case "ArrowUp":
          if (direction[1] !== -1) {
            direction = [0, 1];
          }
          break;
        case "ArrowRight":
          if (direction[0] !== -1) {
            direction = [1, 0];
          }
          break;
        case "ArrowDown":
          if (direction[1] !== 1) {
            direction = [0, -1];
          }
          break;
      }
      oneDir = 1;
    }
  };
  updateBody();
  colision();
  foodFunc();
  eraseOld();
  paint();
  oneDir = 0;
}

function colision() {
  for (let x = 2; x < snakeBody.length; x++) {
    if (
      snakeBody[0][0] === snakeBody[x][0] &&
      snakeBody[0][1] === snakeBody[x][1]
    ) {
      resetGame();
    }
  }
  if (
    snakeBody[0][0] > 24 ||
    snakeBody[0][0] < 0 ||
    snakeBody[0][1] > 24 ||
    snakeBody[0][1] < 0
  ) {
    resetGame();
  }
}

function updateBody() {
  snakeBody.unshift([
    snakeBody[0][0] + direction[0],
    snakeBody[0][1] + direction[1],
  ]);
  snakeBody.pop();

  if (snakeBody[0][0] === food[0] && snakeBody[0][1] === food[1]) {
    food[2] = 0;
    snakeBody.unshift([snakeBody[0][0], snakeBody[0][1]]);
    score++;
  }
}

function eraseOld() {
  let child = container.firstElementChild;
  while (child) {
    container.removeChild(child);
    child = container.firstElementChild;
  }
}

function paint() {
  for (let x = 0; x < snakeBody.length; x++) {
    const snakePart = document.createElement("div");

    snakePart.id = "snake" + x;
    snakePart.style.position = "absolute";
    snakePart.style.width = elementWidth + "px";
    snakePart.style.height = elementWidth + "px";
    snakePart.style.background = "red";
    snakePart.style.bottom = snakeBody[x][1] * elementWidth + "px";
    snakePart.style.left = snakeBody[x][0] * elementWidth + "px";

    container.appendChild(snakePart);
  }

  const foodPart = document.createElement("div");
  foodPart.id = "foody";
  foodPart.style.position = "absolute";
  foodPart.style.width = elementWidth + "px";
  foodPart.style.height = elementWidth + "px";
  foodPart.style.background = "green";
  foodPart.style.left = food[0] * elementWidth + "px";
  foodPart.style.bottom = food[1] * elementWidth + "px";
  container.appendChild(foodPart);

  document.getElementById("score-display").innerText = "wynik: " + score;
}

function foodFunc() {
  if (food[2] === 0) {
    food[0] = Math.floor(Math.random() * 25);
    food[1] = Math.floor(Math.random() * 25);
    food[2] = 1;
  }
}

function resetGame() {
  score = 0;
  snakeBody = [
    [12, 12],
    [12, 11],
    [12, 10],
  ];
  direction = [0, 1];
  alert("kolizja");
}
