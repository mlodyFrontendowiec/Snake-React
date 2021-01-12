import React, { useState, useEffect, useLayoutEffect } from "react";
import Food from "./components/Food";
import Snake from "./components/Snake";

const getRandomCordiantions = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1)) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1)) / 2) * 2;
  return [x, y];
};

function App() {
  const [direction, setDirection] = useState("RIGHT");

  const [food, setFood] = useState(getRandomCordiantions());
  const [speed, setSpeed] = useState(100);
  const [snake, setSnake] = useState([
    [0, 0],
    [2, 0],
  ]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      onKeyDown(e);
    });
    checkFood();

    const interval = setInterval(moveSnake, speed);

    return () => {
      clearInterval(interval);
    };
  }, [snake]);
  const onKeyDown = (e) => {
    switch (e.keyCode) {
      case 38:
        if (direction === "DOWN") return;
        else setDirection("UP");
        break;
      case 40:
        if (direction === "UP") return;
        else setDirection("DOWN");
        break;
      case 37:
        if (direction === "RIGHT") return;
        else setDirection("LEFT");
        break;
      case 39:
        if (direction === "LEFT") return;
        else setDirection("RIGHT");
        break;
      default:
        return;
    }
  };

  const moveSnake = () => {
    if (checkIfOutofBorders()) {
      return;
    }
    snakeCollaps();

    let dots = [...snake];

    let head = dots[dots.length - 1];

    const newDirection = direction;

    switch (newDirection) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      default:
        return;
    }
    if (newDirection !== direction) return;
    dots.push(head);
    dots.shift();

    setSnake(dots);
  };

  const checkIfOutofBorders = () => {
    let head = snake[snake.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
      return true;
    }
  };
  const onGameOver = () => {
    alert("GAME OVER Snake length is " + snake.length);
    newGame();
  };
  const newGame = () => {
    setDirection("RIGHT");
    setFood(getRandomCordiantions());
    setSpeed(200);
    setSnake([
      [0, 0],
      [2, 0],
    ]);
  };
  const checkFood = () => {
    if (String(snake[snake.length - 1]) === String(food)) {
      growSnake();
      setFood(getRandomCordiantions());
      setSpeed(speed - 10);
    } else {
      return;
    }
  };
  const growSnake = () => {
    let dots = [...snake];

    let newElement = dots[dots.length - 1];

    switch (direction) {
      case "RIGHT":
        newElement = [newElement[0] + 2, newElement[1]];
        break;
      case "LEFT":
        newElement = [newElement[0] - 2, newElement[1]];
        break;
      case "DOWN":
        newElement = [newElement[0], newElement[1] + 2];
        break;
      case "UP":
        newElement = [newElement[0], newElement[1] - 2];
        break;
      default:
        return;
    }
    dots.push(newElement);

    setSnake(dots);
  };

  const snakeCollaps = () => {
    console.log("sprawdzam");
    let snakeBody = [...snake];
    let head = snakeBody[snakeBody.length - 1];
    snakeBody.pop();
    snakeBody.forEach((dot) => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        onGameOver();
      }
    });
  };

  return (
    <div className="game-area">
      <Snake snakeDots={snake} />
      <Food dot={food} />
    </div>
  );
}

export default App;
