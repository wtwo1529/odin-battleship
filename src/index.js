import "./styles/style.css";
import "./styles/header.css";
import "./styles/body.css";
import "./styles/board.css";
import Player from "./player";

let renderBoard = (divElement, player) => {
  divElement.innerHTML = "";
  const gameboard = player.gameboard.board;
  for (let i = 0; i < 10; i++) {
    let row = document.createElement("div");
    row.classList.add("grid-row");
    for (let j = 0; j < 10; j++) {
      let coordinate = document.createElement("div");
      coordinate.classList.add("grid-square");
      coordinate.addEventListener("click", (e) => {
        if (player.gameboard.receiveAttack([j, i])) {
          gameboard[i][j] = 1;
        }
        gameboard[i][j] = -1;

        renderBoard(divElement, player);
      });

      let symbol = document.createElement("p");
      symbol.classList.add("board-symbol");
      coordinate.appendChild(symbol);
      if (gameboard[i][j] == -1) {
        symbol.innerText = "X";
      } else if (gameboard[i][j] == 1) {
        symbol.innerText = "O";
      }
      row.appendChild(coordinate);
    }
    divElement.appendChild(row);
  }
};

window.onload = () => {
  const coordinatePlane = document.querySelector(".grid");
  let player1 = new Player();
  renderBoard(coordinatePlane, player1);
};
