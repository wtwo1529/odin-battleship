import getRandomInt from "./randomInteger";
import Ship from "./ship";

class Gameboard {
  constructor(computer = false) {
    this.computer = computer;
    this.board = this.generateBoard();
    this.misses = 0;
    this.sunkenShips = [];
    this.ships = [];
    this.takenpositions = {};
    this.generateShips();

    this.generateShips = this.generateShips.bind(this);
  }
  shipsPlaced() {
    return this.ships.length == 10 ? true : false;
  }
  shipsSunk() {
    return this.sunkenShips.length == 10 ? true : false;
  }
  generateShips() {
    this.board = this.generateBoard();
    this.ships = [];
    let reservedGrid = this.generateBoard();
    let ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    for (let i = 0; i < ships.length; i++) {
      let placed = false;
      let ship = new Ship(ships[i]);
      let SHIP_LENGTH = ship.length;
      while (!placed) {
        const isVertical = Math.random() < 0.5;
        const start_x = getRandomInt(0, 9);
        const start_y = getRandomInt(0, 9);
        const end_x = isVertical ? start_x : start_x + SHIP_LENGTH - 1;
        const end_y = isVertical ? start_y + SHIP_LENGTH - 1 : start_y;
        if (end_x >= 10 || end_y >= 10) continue;

        let overlap = false;
        for (let j = 0; j < SHIP_LENGTH; j++) {
          const x = isVertical ? start_x : start_x + j;
          const y = isVertical ? start_y + j : start_y;
          if (reservedGrid[y][x]) {
            overlap = true;
            break;
          }
        }
        if (overlap) continue;
        for (let j = 0; j < SHIP_LENGTH; j++) {
          const x = isVertical ? start_x : start_x + j;
          const y = isVertical ? start_y + j : start_y;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              let adjx = x + dx;
              let adjy = y + dy;
              if (adjx >= 0 && adjx <= 9 && adjy >= 0 && adjy <= 9) {
                reservedGrid[adjy][adjx] = 1;
              }
            }
          }
          this.board[y][x] = ship;
        }
        this.ships.push([
          start_x,
          start_y,
          end_x,
          end_y,
          SHIP_LENGTH,
          isVertical,
        ]);
        placed = true;
      }
    }
  }
  generateBoard() {
    return Array(10)
      .fill()
      .map(() => Array(10).fill(0));
  }
  receiveAttack([x, y]) {
    let coordinate = this.board[y][x];
    if (coordinate instanceof Ship) {
      coordinate.hit();
      console.log(coordinate.noOfHits);
      if (coordinate.isSunk()) {
        this.sunkenShips.push(coordinate);
        console.log(`Sunk: ${coordinate.sunk}`);
      }
      console.log("hit");
      return true;
    }
    this.misses++;
    console.log("miss");
    return false;
  }
}
export default Gameboard;
