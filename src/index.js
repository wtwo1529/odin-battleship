import "./styles/style.css";
import "./styles/header.css";
import "./styles/body.css";
import "./styles/board.css";
import "./styles/play-btn-container.css";
import GameController from "./gamecontroller";
import Player from "./player";

window.onload = () => {
  const grids = document.querySelectorAll(".grid");
  const playBtn = document.querySelector(".play-btn");
  const randomBtn = document.querySelector(".randomize-ships-btn");
  const game = new GameController(grids, playBtn, randomBtn, [
    new Player(),
    new Player(true),
  ]);
};
