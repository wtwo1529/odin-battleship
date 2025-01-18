import gameboard from "./gameboard";

class Player {
  constructor(computer) {
    this.computer = computer;
    this.gameboard = new gameboard();
  }
}

export default Player;
