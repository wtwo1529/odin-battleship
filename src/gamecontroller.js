import DisplayController from "./displaycontroller";

class GameController {
  constructor(divElements, playBtn, randomBtn, players) {
    this.start = this.start.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.checkIfWinner = this.checkIfWinner.bind(this);

    this.displayControllers = this.loadDisplayControllers(
      divElements,
      playBtn,
      randomBtn,
      players
    );

    this.player = this.displayControllers[0];
    this.computer = this.displayControllers[1];
    this.round = 0;
    this.winner = null;
    this.started = false;
  }
  start() {
    console.log(`Game Start!`);
    console.log(this.player.gameboard);
    console.log(this.computer.gameboard);
    if (
      !(
        this.player.gameboard.shipsPlaced() &&
        this.computer.gameboard.shipsPlaced()
      )
    ) {
      return false;
    }
    this.started = this.player.startGame();
    this.computer.removePlayContainer();
    this.turn = "player";

    this.computer.enableClickEvents();
  }
  checkIfWinner() {
    if (this.player.gameboard.shipsSunk()) {
      return this.player.player.playerStatus;
    } else if (this.computer.gameboard.shipsSunk()) {
      return this.computer.player.playerStatus;
    }
    return undefined;
  }
  nextRound() {
    this.computer.disableClickEvents();
    this.player.gameboard.play();
    this.player.renderBoard();

    this.computer.enableClickEvents();

    this.winner = this.checkIfWinner();
    if (this.winner) {
      this.computer.disableClickEvents();
      console.log(`Winner: ${this.winner}`);
    }
    this.logGameInfo();
    return this.winner;
  }
  logGameInfo() {
    console.log(`Round: ${this.round++}`);
    console.log(this.player.gameboard.board);
    console.log(this.computer.gameboard.board);
    console.log(this.round);
  }
  loadDisplayControllers(divElements, playBtn, randomBtn, players) {
    let tmp = [];
    for (let i = 0; i < divElements.length; i++) {
      tmp.push(
        new DisplayController(
          divElements[i],
          playBtn,
          randomBtn,
          players[i],
          this.start,
          this.nextRound,
          this.checkIfWinner
        )
      );
    }
    return tmp;
  }
}

export default GameController;
