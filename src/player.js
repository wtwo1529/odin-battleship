import gameboard from "./gameboard";

class Player {
  constructor(computer = false) {
    this.computer = computer;
    this.gameboard = new gameboard();
    this.moves = 0;
  }
}

export default Player;
