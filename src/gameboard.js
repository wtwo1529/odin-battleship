class Gameboard {
  constructor() {
    this.board = this.generateBoard();
    this.misses = 0;
    this.sunkenShips = 0;
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
    }
    return true;
  }
}
export default Gameboard;
