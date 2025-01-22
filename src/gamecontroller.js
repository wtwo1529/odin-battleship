import DisplayController from "./displaycontroller";

class GameController {
  constructor(divElements, players) {
    this.nextRound = this.nextRound.bind(this);
    this.displayControllers = this.loadDisplayControllers(divElements, players);
    this.round = 0;
    this.winner = null;
    this.start();
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
