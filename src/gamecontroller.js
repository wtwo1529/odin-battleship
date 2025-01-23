import DisplayController from "./displaycontroller";

class GameController {
  constructor(divElements, players) {
    this.nextRound = this.nextRound.bind(this);
    this.displayControllers = this.loadDisplayControllers(divElements, players);
    this.player = this.displayControllers[0];
    this.computer = this.displayControllers[1];
    this.round = 0;
    this.winner = null;
    this.start();
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
    this.displayControllers[0].enableClickEvents();
  }
  nextRound() {
    if (this.winner) {
      return;
    }
    this.displayControllers[this.round % 2].disableClickEvents();
    this.displayControllers[++this.round % 2].enableClickEvents();
    console.log(this.round);
  }
  loadDisplayControllers(divElements, players) {
    let tmp = [];
    for (let i = 0; i < divElements.length; i++) {
      tmp.push(
        new DisplayController(divElements[i], players[i], this.nextRound)
      );
    }
    return tmp;
  }
}

export default GameController;
