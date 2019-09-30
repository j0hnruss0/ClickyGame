import React from "react";
import "./style.css";

function NavBar(props) {
  return (
      <ul className="nav navbar mb-4">
          <li className="nav-item">
              <h3 className="app-name"><strong>Simpsons Clicky Game</strong></h3>
          </li>
          <li className="nav-item score-card mr-4">
              <p>Score: {props.currentRun} || Hi-Score: {props.highScore}</p>
          </li>
      </ul>
  );
}

export default NavBar;
