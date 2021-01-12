import React from "react";

const Snake = ({ snakeDots }) => {
  console.log(snakeDots);
  return (
    <div>
      {snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        };
        console.log(dot);
        return <div className="snake-dot" key={i} style={style}></div>;
      })}
    </div>
  );
};

export default Snake;
