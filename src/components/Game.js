import React from "react";
import "./style.css";


function Game(props) {
  return (
    <div className="game-board row" onClick={props.style}>
      <div className="col-10 offset-1 alert-box">
          <p className="text-center text-message"><strong>{props.message}</strong></p>
      </div>
      {props.children}
    </div>
  )
};

export default Game;