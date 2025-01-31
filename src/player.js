import gameboard from "./gameboard";

class Player {
  constructor(computer = false) {
    this.computer = computer;
    this.playerStatus = this.checkPlayerStatus();
    this.player = this.gameboard = new gameboard();
    this.moves = [];
  }
  checkPlayerStatus() {
    if (this.computer) {
      return "Computer";
    }
    return "Player";
  }
}

export default Player;
