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
  const [direction, setDirection] = useState("UP");
  const [snake, setSnake] = useState([
    [0, 0],
    [2, 0],
  ]);
  const [food, setFood] = useState(getRandomCordiantions());

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      onKeyDown(e);
    });
  }, []);
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

  return (
    <div className="game-area">
      <Snake snakeDots={snake} />
      <Food dot={food} />
    </div>
  );
}

export default App;
