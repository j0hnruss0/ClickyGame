import React, { Component } from "react";
import NavBar from "./components/NavBar";
import Wrapper from "./components/Wrapper";
import Game from "./components/Game";
import Card from "./components/Card";
import Footer from "./components/Footer"
import characters from "./characters.json";
import "./components/style.css";
import "./images/springfield.jpg"

class App extends Component {
  state = {
    currentRun: 0,
    highScore: 0,
    clicked: [],
    lastMove: null,
    characters
  };

  setBoard = () => {
    let shuffled = [];
    characters.forEach(chars => 
      shuffled.push(chars)
    );
    //console.log(shuffled);
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    };
    
    return shuffled.map(data => (
      <Card
        key={data.id}
        value={data.id}
        name={data.name}
        photo={data.photo}
        pickedChar={this.pickedChar}
      />
    ))
  };

  pickedChar = (id) => {
    const picked = this.state.characters.filter(char => char.id === id);
    console.log(picked[0].id);
    if (!this.state.clicked.includes(picked[0].id) && this.state.highScore > this.state.currentRun && this.state.clicked.length < 23) {
      this.setState(state => {
        return {
          clicked: state.clicked.concat(picked[0].id),
          currentRun: state.currentRun + 1,
          lastMove: "won"
        };
      });
    } else if (!this.state.clicked.includes(picked[0].id) && this.state.highScore <= this.state.currentRun && this.state.clicked.length < 23) {
      this.setState(state => {
        return {
          clicked: state.clicked.concat(picked[0].id),
          currentRun: state.currentRun + 1,
          highScore: state.highScore + 1,
          lastMove: "won"
        };
      });
    } else if (!this.state.clicked.includes(picked[0].id) && this.state.clicked.length === 23) {
      this.setState(state => {
        return {
          clicked: [],
          currentRun: state.currentRun + 1,
          highScore: state.highScore + 1,
          lastMove: "victory"
        };
      });
    } else if (this.state.clicked.includes(picked[0].id)) {
      this.setState(() => {
        return {
          clicked: [],
          currentRun: 0,
          lastMove: "lost"
        };
      });
    }
    console.log(this.state.clicked.length);
    //console.log(this.state.currentRun);
  }

  makeMessage = () => {
    return this.state.lastMove === "won" ? "God job, keep it up!"
      : this.state.lastMove === "lost" ? "Oops, you picked that already. Your best score is " + this.state.highScore + ". Keep clicking to play again!!"
      : this.state.lastMove === "victory" ? "You picked them all, you win!! Keep clicking to play again!!"
      : "Click on characters below, but you can't pick the same character twice!" 
  };

  animateResult = () => {
    const gameBoard = document.querySelector(".game-board");
    if (this.state.lastMove === "won" && !gameBoard.classList.contains("right-guess") && !gameBoard.classList.contains("right-guess-again")) {
      return (
        gameBoard.classList.add("right-guess"),
        gameBoard.classList.remove("wrong-guess"),
        gameBoard.classList.remove("victory-show")
      );
    } else if (this.state.lastMove === "lost") {
      return (
        gameBoard.classList.add("wrong-guess"),
        gameBoard.classList.remove("right-guess"),
        gameBoard.classList.remove("right-guess-again"),
        gameBoard.classList.remove("victory-show")
      );
    } else if (this.state.lastMove === "won" && gameBoard.classList.contains("right-guess") && !gameBoard.classList.contains("right-guess-again")) {
      return (
        gameBoard.classList.remove("right-guess"),
        gameBoard.classList.add("right-guess-again")
      );
    } else if (this.state.lastMove === "won" && gameBoard.classList.contains("right-guess-again") && !gameBoard.classList.contains("right-guess")) {
      return (
        gameBoard.classList.remove("right-guess-again"),
        gameBoard.classList.add("right-guess")
      );
    } else if (this.state.lastMove === "victory") {
      return (
        gameBoard.classList.remove("right-guess"),
        gameBoard.classList.remove("right-guess-again"),
        gameBoard.classList.remove("wrong-guess"),
        gameBoard.classList.add("victory-show")
      );
    } else {
      return;
    }
    
    // return this.state.lastMove === "won" ? gameBoard.classList.remove("wrong-guess")
    //   : this.state.lastMove === "lost" ? gameBoard.classList.add("wrong-guess")
    //   : this.state.lastMove === null ? null
    //   : null
  };

  render() {
    return (
        <div>
          <NavBar
            currentRun={this.state.currentRun}
            highScore={this.state.highScore}
           />
          <Wrapper>
            <Game 
              message={this.makeMessage()} 
              style={this.animateResult()}
            >
              {this.setBoard()}
            </Game>
          </Wrapper>
          <Footer />
        </div>
    );
  };

};

export default App;
