import Ship from "./ship";

class DisplayController {
  constructor(divElement, playBtn, randomBtn, player, startGame, nextRound) {
    this.divElement = divElement;
    this.playBtn = playBtn;
    this.player = player;
    this.gameboard = player.gameboard;
    this.coordinates = [];
    this.clicked = {};
    this.nextRound = nextRound;
    this.started = false;

    this.bindStartBtn(playBtn, startGame);
    this.bindRandomBtn(randomBtn, this.player.gameboard.generateShips);

    this.coordinateClickEvent = this.coordinateClickEvent.bind(this);
    this.disableClickEvents = this.disableClickEvents.bind(this);
    this.enableClickEvents = this.enableClickEvents.bind(this);

    this.renderBoard();
  }
  startGame() {
    if (!this.started) {
      this.started = true;
      return true;
    }
  }
  removePlayContainer() {
    const playContainer = document.querySelector(".play-btn-container");
    playContainer.style.opacity = 0;
    playContainer.style.pointerEvents = "none";
  }
  disableClickEvents() {
    this.coordinates.forEach((coordinate) => {
      coordinate.removeEventListener("click", this.coordinateClickEvent);
    });
  }
  enableClickEvents() {
    this.coordinates.forEach((coordinate) => {
      coordinate.addEventListener("click", this.coordinateClickEvent);
    });
  }
  bindRandomBtn(randomBtn, cb) {
    if (this.player.computer) return false;
    randomBtn.addEventListener("click", (e) => {
      if (!this.started) {
        cb();
        this.renderBoard();
        console.log(this.player.gameboard);
      }
    });
  }
  bindStartBtn(startBtn, cb) {
    startBtn.addEventListener("click", cb);
  }
  renderBoard() {
    this.divElement.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      let row = document.createElement("div");
      row.classList.add("grid-row");
      for (let j = 0; j < 10; j++) {
        let coordinate = this.createCoordinate(i, j);
        row.appendChild(coordinate);
      }
      this.divElement.appendChild(row);
    }
  }
  createCoordinate(i, j) {
    let coordinate = document.createElement("div");
    this.coordinates.push(coordinate);
    coordinate.classList.add("grid-square");
    coordinate.dataset.y = i;
    coordinate.dataset.x = j;

    let symbol = document.createElement("p");
    symbol.classList.add("board-symbol");
    coordinate.appendChild(symbol);
    if (this.gameboard.board[i][j] == -1) {
      symbol.innerText = "O";
    } else if (this.gameboard.board[i][j] == 1) {
      symbol.innerText = "X";
    } else if (
      !this.player.computer &&
      this.gameboard.board[i][j] instanceof Ship
    ) {
      symbol.innerText = "S";
    }
    return coordinate;
  }
  coordinateClickEvent(e) {
    let x = parseInt(e.currentTarget.dataset.x);
    let y = parseInt(e.currentTarget.dataset.y);
    if (this.clicked[[x, y]]) return;
    let status = this.gameboard.receiveAttack([x, y]);
    if (status) {
      this.gameboard.board[y][x] = status;
    }
    const coordinate_index = this.coordinates.indexOf(e.currentTarget);
    this.coordinates = this.coordinates.splice(coordinate_index, 1);
    this.renderBoard();
    this.nextRound();
    this.clicked[[x, y]] = 1;
    this.player.moves++;
  }
}

export default DisplayController;
