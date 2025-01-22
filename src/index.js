import "./styles/style.css";
import "./styles/header.css";
import "./styles/body.css";
import "./styles/board.css";
import GameController from "./gamecontroller";
import Player from "./player";

window.onload = () => {
  const grids = document.querySelectorAll(".grid");
  let game = new GameController(grids, [new Player(), new Player(true)]);
};
