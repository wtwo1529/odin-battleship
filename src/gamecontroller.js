import DisplayController from "./displaycontroller";
import Modal from "./modal";
import Player from "./player";

class GameController {
  constructor(divElements) {
    this.start = this.start.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.checkIfWinner = this.checkIfWinner.bind(this);
    this.playAgain = this.playAgain.bind(this);

    this.grids = divElements["grids"] ? divElements["grids"] : undefined;
    this.playBtn = divElements["playBtn"] ? divElements["playBtn"] : undefined;
    this.randomBtn = divElements["randomBtn"]
      ? divElements["randomBtn"]
      : undefined;
    this.gameResult = divElements["gameResult"]
      ? divElements["gameResult"]
      : undefined;

    this.displayControllers = this.generateDisplayControllers();

    this.gameResultModal = new Modal(this.gameResult, this.playAgain);
    this.player = this.displayControllers[0];
    this.computer = this.displayControllers[1];
    this.round = 0;
    this.winner = this.player.player.playerStatus;
    this.started = false;
  }
  playAgain() {
    this.displayControllers = this.generateDisplayControllers();
    this.player = this.displayControllers[0];
    this.computer = this.displayControllers[1];
    this.round = 0;
    this.winner = undefined;
    this.started = false;
    this.displayControllers[1].revealPlayContainer();
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

    this.computer.enableClickEvents();
  }
  checkIfWinner() {
    let winner;
    if (this.player.gameboard.shipsSunk()) {
      winner = "Computer";
    } else if (this.computer.gameboard.shipsSunk()) {
      winner = "Player";
    }
    return winner;
  }
  nextRound() {
    this.computer.enableClickEvents();
    this.winner = this.checkIfWinner();
    let status = this.winner + " wins!";
    if (this.winner == "Player") {
      this.computer.disableClickEvents();
      this.gameResultModal._show(status);
    } else if (this.winner == "Computer") {
      this.computer.disableClickEvents();
      this.gameResultModal._show(status);
      this.player.renderBoard();
    } else if (!this.winner) {
      this.player.gameboard.play();
    }
    this.player.renderBoard();
    console.log(!this.winner);
    this.logGameInfo();
    return this.winner;
  }
  logGameInfo() {
    console.log(`Round: ${++this.round}`);
    console.log(this.player.gameboard.board);
    console.log(this.computer.gameboard.board);
    console.log(this.round);
  }
  generateDisplayControllers() {
    let tmp = [];
    const players = [new Player(), new Player(true)];
    for (let i = 0; i < this.grids.length; i++) {
      tmp.push(
        new DisplayController(
          this.grids[i],
          this.playBtn,
          this.randomBtn,
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
