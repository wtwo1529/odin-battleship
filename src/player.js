import gameboard from "./gameboard";

class Player {
  constructor(computer = false) {
    this.computer = computer;
    this.gameboard = new gameboard();
    this.moves = 0;
    this.ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  }
}

export default Player;
