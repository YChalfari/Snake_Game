import { getInputDirection } from "./input.js";
export const SNAKE_SPEED = 5;

let newSegments = 0;
//set snakeBody position to center at the start
const snakeBody = [{ x: 11, y: 11 }];

//update snakes position
export function update() {
  addSegments();
  const inputDirection = getInputDirection();
  //i will give us 2nd to last el of the snake
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}

export function expandSnake(amount) {
  newSegments += amount;
  console.log(amount, newSegments);
}
export function getSnakeHead() {
  return snakeBody[0];
}
export function isOnSnake(position, ignoreHead = false) {
  return snakeBody.some((segment, index) => {
    if (index === 0 && ignoreHead) return false;
    return isPositionEqual(segment, position);
  });
}

export function isOverlap() {
  return isOnSnake(snakeBody[0], true);
}

function isPositionEqual(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}
