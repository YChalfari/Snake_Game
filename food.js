import { getRandomGridPosition } from "./grid.js";
import { isOnSnake, expandSnake } from "./snake.js";
let foodPosition = setRandomPosition();
let EXPANSION_RATE = 5;

export function update() {
  if (isOnSnake(foodPosition)) {
    expandSnake(EXPANSION_RATE);
    foodPosition = setRandomPosition();
  }
}
export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = foodPosition.y;
  foodElement.style.gridColumnStart = foodPosition.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}
function setRandomPosition() {
  let newFoodPosition;
  while (newFoodPosition === undefined || isOnSnake(newFoodPosition)) {
    newFoodPosition = getRandomGridPosition();
  }
  return newFoodPosition;
}
