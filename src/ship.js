class Ship {
  constructor(length) {
    this.length = length;
    this.noOfHits = 0;
    this.sunk = false;
  }
  hit() {
    this.noOfHits++;
  }
  isSunk() {
    if (this.noOfHits == this.length) this.sunk = true;
    return this.sunk;
  }
}

export default Ship;
