class Ship {
  constructor(length, health) {
    this.length = length;
    this.health = health;
    this.sunk = false;
  }
  hit() {
    this.health--;
  }
  isSunk() {
    if (this.health == 0) this.sunk = true;
  }
}

export default Ship;
