import "./styles/style.css";
import "./styles/header.css";
import "./styles/body.css";
import "./styles/board.css";
import "./styles/play-btn-container.css";
import "./styles/game-result-modal.css";
import GameController from "./gamecontroller";

window.onload = () => {
  const htmlElements = {
    grids: document.querySelectorAll(".grid"),
    playBtn: document.querySelector(".play-btn"),
    randomBtn: document.querySelector(".randomize-ships-btn"),
    gameResult: document.querySelector(".game-result-modal"),
  };
  const game = new GameController(htmlElements);
};
