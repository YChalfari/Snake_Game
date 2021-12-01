import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  isOverlap,
  getSnakeHead,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { isOutsideGrid } from "./grid.js";
const gameBoard = document.getElementById("game-board");
let lastRenderTime = 0;
let isGameOver = false;

function main(currentTime) {
  if (isGameOver) {
    if (confirm("Wanna try again?")) {
      window.location.reload();
    }
    return;
  }
  //what time is now
  window.requestAnimationFrame(main);
  //how much time has elapsed since last loop
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  //ensure enough time has passed according to snake speed

  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  //update the time of last render AFTER the if so it is set to set snake speed
  lastRenderTime = currentTime;

  update();
  draw();
}
//get things started by passing current time to main and invoking
window.requestAnimationFrame(main);

function update() {
  updateFood();
  updateSnake();
  checkDeath();
}
function draw() {
  //remove innerHTML of game board to erase the previous render of snake
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  isGameOver = isOutsideGrid(getSnakeHead()) || isOverlap();
}
