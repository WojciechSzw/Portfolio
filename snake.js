"use strict";
let GAME_TICK = 50; // min 1000 max 50
let GAME_CONTAINER_SIDEWIDTH = 30; //min 20 max 50
const PIXEL_WIDTH = 15;
let IS_GAME_PAUSED = true;
let direction = [0, 1];
const initialSnakeBody = [
    [12, 2],
    [12, 1],
    [12, 0],
];
let snakeBody = [...initialSnakeBody];
let food = [0, 0, 0]; // [x,y,(0-eaten,1-not)]
let score = 0;
let gameIntervalId = setInterval(main, GAME_TICK);
const container = document.getElementById("snake-container");
function initMap() {
    if (container !== null) {
        container.style.width = GAME_CONTAINER_SIDEWIDTH * PIXEL_WIDTH + "px";
        container.style.height = GAME_CONTAINER_SIDEWIDTH * PIXEL_WIDTH + "px";
    }
    else {
        console.log("null");
    }
    clearInterval(gameIntervalId);
    gameIntervalId = setInterval(main, GAME_TICK);
}
initMap();
let isDirectionChosen = false;
function main() {
    if (IS_GAME_PAUSED)
        return;
    document.onkeydown = function (event) {
        console.log(event);
        if (isDirectionChosen)
            return;
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
            case " ":
                pauseGame();
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
        if (snakeBody[0][0] === snakeBody[x][0] &&
            snakeBody[0][1] === snakeBody[x][1]) {
            resetGame();
        }
    }
    if (snakeBody[0][0] > GAME_CONTAINER_SIDEWIDTH - 1 ||
        snakeBody[0][0] < 0 ||
        snakeBody[0][1] > GAME_CONTAINER_SIDEWIDTH - 1 ||
        snakeBody[0][1] < 0) {
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
    if (container !== null) {
        let child = container.firstElementChild;
        while (child) {
            container.removeChild(child);
            child = container.firstElementChild;
        }
    }
    else {
        console.log("null");
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
        if (container !== null) {
            container.appendChild(snakePart);
        }
        else {
            console.log("null");
        }
    }
    const foodPart = document.createElement("div");
    foodPart.id = "foody";
    foodPart.style.position = "absolute";
    foodPart.style.width = PIXEL_WIDTH + "px";
    foodPart.style.height = PIXEL_WIDTH + "px";
    foodPart.style.background = "green";
    foodPart.style.left = food[0] * PIXEL_WIDTH + "px";
    foodPart.style.bottom = food[1] * PIXEL_WIDTH + "px";
    if (container !== null) {
        container.appendChild(foodPart);
    }
    else {
        console.log("null");
    }
    document.getElementById("score-display").innerHTML = "score<br>" + score;
}
function foodFunc() {
    //if food was eaten (==0)
    if (food[2] === 0) {
        foodRandom();
        for (let x = 0; x < snakeBody.length; x++) {
            if (snakeBody[x][0] === food[0] && snakeBody[x][1] === food[1]) {
                foodRandom();
                x = -1;
            }
        }
        food[2] = 1;
    }
    function foodRandom() {
        food[0] = Math.floor(Math.random() * GAME_CONTAINER_SIDEWIDTH);
        food[1] = Math.floor(Math.random() * GAME_CONTAINER_SIDEWIDTH);
    }
}
function pauseGame() {
    const pauseBtn = document.querySelector(".game-box__control-panel__pause-icon");
    if (IS_GAME_PAUSED === true) {
        IS_GAME_PAUSED = false;
        pauseBtn?.classList.remove("fa-play");
        pauseBtn?.classList.add("fa-pause");
    }
    else {
        IS_GAME_PAUSED = true;
        pauseBtn?.classList.remove("fa-pause");
        pauseBtn?.classList.add("fa-play");
    }
}
function openSettings() {
    const horizontalStrap = document.querySelector(".horizontal-strap");
    const blur = document.querySelector(".blur");
    horizontalStrap?.classList.toggle("hide");
    blur?.classList.toggle("hide");
    const inputSpeed = document.querySelector(".horizontal-strap__grid-box__input-speed");
    const inputWidth = document.querySelector(".horizontal-strap__grid-box__input-width");
    if (inputSpeed === null)
        return;
    inputSpeed.value = GAME_TICK + "";
    if (inputWidth === null)
        return;
    inputWidth.value = GAME_CONTAINER_SIDEWIDTH + "";
}
function changeSettings() {
    const inputSpeed = document.querySelector(".horizontal-strap__grid-box__input-speed");
    const inputWidth = document.querySelector(".horizontal-strap__grid-box__input-width");
    const newSpeed = +inputSpeed?.value;
    const newWidth = +inputWidth?.value;
    if (newSpeed === undefined || newWidth === undefined)
        return;
    //speeed
    if (newSpeed > 1000) {
        GAME_TICK = 1000;
    }
    else if (newSpeed < 50) {
        GAME_TICK = 50;
    }
    else {
        GAME_TICK = newSpeed;
        console.log(newSpeed + " " + newWidth);
    }
    //sidewidth
    if (newWidth > 50) {
        GAME_CONTAINER_SIDEWIDTH = 50;
    }
    else if (newWidth < 20) {
        GAME_CONTAINER_SIDEWIDTH = 20;
    }
    else {
        GAME_CONTAINER_SIDEWIDTH = newWidth;
    }
    initMap();
    openSettings();
    resetGame();
}
function resetGame() {
    score = 0;
    snakeBody = [...initialSnakeBody];
    direction = [0, 1];
    food[2] = 0;
    if (IS_GAME_PAUSED)
        pauseGame();
}
