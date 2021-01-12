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
  const [speed, setSpeed] = useState(200);
  const [snake, setSnake] = useState([
    [0, 0],
    [2, 0],
  ]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      onKeyDown(e);
    });
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [snake]);
  const onKeyDown = (e) => {
    switch (e.keyCode) {
      case 38:
        setDirection("UP");
        break;
      case 40:
        setDirection("DOWN");
        break;
      case 37:
        setDirection("LEFT");
        break;
      case 39:
        setDirection("RIGHT");
        break;
      default:
        return;
    }
  };

  const moveSnake = () => {
    let dots = [...snake];

    console.log(dots);

    let head = dots[dots.length - 1];

    switch (direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        console.log(head);
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
    dots.push(head);
    dots.shift();

    setSnake(dots);
  };

  return (
    <div className="game-area">
      <Snake snakeDots={snake} />
      <Food dot={food} />
    </div>
  );
}

export default App;
