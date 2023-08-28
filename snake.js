const GAME_TICK = 200;
const GAME_CONTAINER_SIDEWIDTH = 50;
const PIXEL_WIDTH = 15;

let direction = [0, 1];
const initialSnakeBody = [
  [12, 12],
  [12, 11],
  [12, 10],
  [12, 9],
];
let snakeBody = [
  [12, 12],
  [12, 11],
  [12, 10],
  [12, 9],
];
let food = [5, 5, 0]; // [x,y,(0-eaten,1-not)]
let score = 0;

const container = document.getElementById("snake-container");
container.style.width = GAME_CONTAINER_SIDEWIDTH * PIXEL_WIDTH + "px";
container.style.height = GAME_CONTAINER_SIDEWIDTH * PIXEL_WIDTH + "px";

setInterval(main, GAME_TICK);

let isDirectionChosen = false;

function main() {
  document.onkeydown = function (event) {
    console.log(event);
    if (isDirectionChosen) return;
    switch (event.key) {
      case "a":
      case "A":
      case "ArrowLeft":
        if (direction[0] !== 1) {
          direction = [-1, 0];
        }
        break;
      case "w":
      case "W":
      case "ArrowUp":
        if (direction[1] !== -1) {
          direction = [0, 1];
        }
        break;
      case "D":
      case "d":
      case "ArrowRight":
        if (direction[0] !== -1) {
          direction = [1, 0];
        }
        break;
      case "S":
      case "s":
      case "ArrowDown":
        if (direction[1] !== 1) {
          direction = [0, -1];
        }
        break;
      default:
        return;
    }
    isDirectionChosen = true;
  };
  updateBody();
  collision();
  foodFunc();
  eraseOld();
  paint();
  isDirectionChosen = false;
}

function collision() {
  for (let x = 3; x < snakeBody.length; x++) {
    //3 is the first index of snakeBody that can be eaten by the head.
    if (
      snakeBody[0][0] === snakeBody[x][0] &&
      snakeBody[0][1] === snakeBody[x][1]
    ) {
      resetGame();
    }
  }
  if (
    snakeBody[0][0] > GAME_CONTAINER_SIDEWIDTH - 1 ||
    snakeBody[0][0] < 0 ||
    snakeBody[0][1] > GAME_CONTAINER_SIDEWIDTH - 1 ||
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
    snakePart.style.width = PIXEL_WIDTH + "px";
    snakePart.style.height = PIXEL_WIDTH + "px";
    snakePart.style.background = "red";
    snakePart.style.bottom = snakeBody[x][1] * PIXEL_WIDTH + "px";
    snakePart.style.left = snakeBody[x][0] * PIXEL_WIDTH + "px";

    container.appendChild(snakePart);
  }

  const foodPart = document.createElement("div");
  foodPart.id = "foody";
  foodPart.style.position = "absolute";
  foodPart.style.width = PIXEL_WIDTH + "px";
  foodPart.style.height = PIXEL_WIDTH + "px";
  foodPart.style.background = "green";
  foodPart.style.left = food[0] * PIXEL_WIDTH + "px";
  foodPart.style.bottom = food[1] * PIXEL_WIDTH + "px";
  container.appendChild(foodPart);

  document.getElementById("score-display").innerText = "wynik: " + score;
}

function foodFunc() {
  if (food[2] === 0) {
    food[0] = Math.floor(Math.random() * GAME_CONTAINER_SIDEWIDTH);
    food[1] = Math.floor(Math.random() * GAME_CONTAINER_SIDEWIDTH);
    food[2] = 1;
  }
}

function resetGame() {
  score = 0;
  snakeBody = [...initialSnakeBody];
  direction = [0, 1];
  alert("kolizja");
}
