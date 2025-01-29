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
    this.turn = undefined;
    this.winner = null;
    this.started = false;
  }
  search() {
    let attacked = [];
    let ship_x = null;
    let ship_y = null;
    let attackResult = null;
    let rand_x = getRandomInt(0, 9);
    let rand_y = getRandomInt(0, 9);
    this.player.gameboard.receieveAttack([rand_x, rand_y]);
    prev_x = rand_x;
    prev_y = rand_y;
  }
  start() {
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
    this.turn = "player";

    this.computer.removePlayContainer();
    this.player.enableClickEvents();
  }
  checkIfWinner() {
    if (this.player.gameboard.shipsSunk()) {
      this.winner = this.player;
    } else if (this.computer.gameboard.shipsSunk()) {
      this.winner = this.computer;
    }
    return this.winner;
  }
  nextRound() {
    let winner = this.checkIfWinner();

    if (winner) {
      this.displayControllers[this.round % 2].disableClickEvents();
      this.displayControllers[++this.round % 2].disableClickEvents();
    } else {
      if (this.turn == "player") {
        this.player.disableClickEvents();
        this.turn == "computer";
      } else {
        this.computer;

        this.player.enableClickEvents();
        this.turn == "player";
      }
    }
    console.log(this.round);
    return winner;
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
