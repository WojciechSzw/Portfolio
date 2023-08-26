const interval = 50; //GAME_TICK//f2 edit all
const elementWidth = 15;
const gameContainerElements = 50;
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
let food = [5, 5, 0];
let score = 0;

const container = document.getElementById("snake-container");
container.style.width = gameContainerElements * elementWidth + "px";
container.style.height = gameContainerElements * elementWidth + "px";

setInterval(main, interval);

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
    //napisz 3 co to za gówno
    if (
      snakeBody[0][0] === snakeBody[x][0] &&
      snakeBody[0][1] === snakeBody[x][1]
    ) {
      resetGame();
    }
  }
  if (
    snakeBody[0][0] > gameContainerElements - 1 ||
    snakeBody[0][0] < 0 ||
    snakeBody[0][1] > gameContainerElements - 1 ||
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
    food[2] = 0; //index czy jedzenie zostało zjedzone i musi na nowo zostać zRNGowane
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
    food[0] = Math.floor(Math.random() * gameContainerElements);
    food[1] = Math.floor(Math.random() * gameContainerElements);
    food[2] = 1;
  }
}

function resetGame() {
  score = 0;
  snakeBody = [...initialSnakeBody];
  direction = [0, 1];
  alert("kolizja");
}
