import getRandomInt from "./randomInteger";

class Gameboard {
  constructor(computer = false) {
    this.computer = computer;
    this.board = this.generateBoard();
    this.misses = 0;
    this.sunkenShips = 0;
    this.ships = [];
    this.generateShips();
  }
  generateShips() {
    let ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    console.log("hi");
    for (let i = 0; i < ships.length; i++) {
      let VALID_COORDINATES = false;
      let start_x, start_y;
      let SHIP_LENGTH = ships[i];
      outer: while (!VALID_COORDINATES) {
        start_x = getRandomInt(0, 9);
        start_y = getRandomInt(0, 9);
        let horizontal = [start_x - SHIP_LENGTH, start_x + SHIP_LENGTH];
        let vertical = [start_y - SHIP_LENGTH, start_y + SHIP_LENGTH];
        horizontal = horizontal.filter((n) => n > 0 && n < 10);
        vertical = vertical.filter((n) => n > 0 && n < 10);
        if (horizontal) {
          for (let i = 0; i < horizontal.length; i++) {
            let tmp = [
              start_x - 1,
              start_x + 1,
              start_x - SHIP_LENGTH - 1,
              start_x - SHIP_LENGTH + 1,
              start_x + SHIP_LENGTH - 1,
              start_x + SHIP_LENGTH + 1,
            ];
            let tmp2 = [start_y - 1, start_y + 1];
            tmp = tmp.filter((n) => n > 0 && n < 10);
            tmp2 = tmp2.filter((n) => n > 0 && n < 10);

            for (let k = 0; k < tmp.length; k++) {
              if (this.board[start_y][tmp[k]]) continue outer;
            }
            for (let k = 0; k < tmp2.length; k++) {
              if (this.board[tmp2[k]][start_x]) continue outer;
            }
            if (horizontal[i] < start_x) {
              for (let j = horizontal[i]; j <= start_x; j++) {
                this.board[start_y][j] = 1;
              }
            } else {
              for (let j = start_x; j <= horizontal[i]; j++) {
                this.board[start_y][j] = 1;
              }
            }
            VALID_COORDINATES = true;
          }
        } else if (vertical) {
          let tmp = [
            start_y - 1,
            start_y + 1,
            start_y - SHIP_LENGTH - 1,
            start_y - SHIP_LENGTH + 1,
            start_y + SHIP_LENGTH - 1,
            start_y + SHIP_LENGTH + 1,
          ];
          let tmp2 = [start_x - 1, start_x + 1];
          tmp = tmp.filter((n) => n > 0 && n < 10);
          tmp2 = tmp2.filter((n) => n > 0 && n < 10);
          for (let k = 0; k < tmp.length; k++) {
            if (this.board[tmp[k]][start_x]) continue outer;
          }
          for (let k = 0; k < tmp2.length; k++) {
            if (this.board[start_y][tmp2[k]]) continue outer;
          }
          for (let i = 0; i < vertical.length; i++) {
            if (vertical[i] < start_y) {
              for (let j = vertical[i]; i <= start_y; j++) {
                this.board[j][start_x] = 1;
              }
            } else {
              for (let j = start_y; j <= vertical[i]; j++) {
                this.board[j][start_x] = 1;
              }
            }
            VALID_COORDINATES = true;
          }
        }
      }
    }
    console.log(this.ships);
  }
  generateBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push(0);
      }
      board.push(row);
    }
    return board;
  }
  receiveAttack([x, y]) {
    if (this.board[y][x] == 0) {
      this.misses++;
      return false;
    } else if (this.board[y][x] == 1) {
      this.board[y][x] = 2;
      return true;
    }
  }
}
export default Gameboard;
