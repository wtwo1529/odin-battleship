class DisplayController {
  constructor(divElement, player, nextRound) {
    this.divElement = divElement;
    this.player = player;
    this.gameboard = player.gameboard;
    this.coordinates = [];
    this.clicked = {};
    this.nextRound = nextRound;

    this.coordinateClickEvent = this.coordinateClickEvent.bind(this);
    this.disableClickEvents = this.disableClickEvents.bind(this);
    this.enableClickEvents = this.enableClickEvents.bind(this);

    this.renderBoard();
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
    } else if (this.gameboard.board[i][j] == 2) {
      symbol.innerText = "X";
    }
    return coordinate;
  }
  coordinateClickEvent(e) {
    let x = e.currentTarget.dataset.x;
    let y = e.currentTarget.dataset.y;
    if (this.clicked[[x, y]]) return;

    if (this.gameboard.receiveAttack([x, y])) {
      this.gameboard.board[y][x] = 1;
    }
    this.gameboard.board[y][x] = -1;
    const coordinate_index = this.coordinates.indexOf(e.currentTarget);
    this.coordinates = this.coordinates.splice(coordinate_index, 1);
    this.renderBoard();

    this.nextRound();
    this.clicked[[x, y]] = 1;
  }
}

export default DisplayController;
