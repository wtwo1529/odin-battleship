const gameboard = require("./gameboard.js");

test("proper gameboard", () => {
  expect(gameboard.board).toHaveLength(10);
  expect(gameboard.board[0]).toEqual(
    expect.arrayContaining([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  );
  expect(gameboard.board[1]).toEqual(
    expect.arrayContaining([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  );
  expect(gameboard.board[2]).toEqual(
    expect.arrayContaining([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  );
  expect(gameboard.board[3]).toEqual(
    expect.arrayContaining([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  );
  expect(gameboard.board[4]).toEqual(
    expect.arrayContaining([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  );
  expect(gameboard.board[5]).toEqual(
    expect.arrayContaining([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  );
  expect(gameboard.board[6]).toEqual(
    expect.arrayContaining([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  );
  expect(gameboard.board[7]).toEqual(
    expect.arrayContaining([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  );
  expect(gameboard.board[8]).toEqual(
    expect.arrayContaining([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  );
  expect(gameboard.board[9]).toEqual(
    expect.arrayContaining([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  );
});

test("attack", () => {
  gameboard.receiveAttack([1, 1]);
  expect(gameboard.board[1][1]).toBe(1);
});

test("attack", () => {
  gameboard.receiveAttack([4, 1]);
  expect(gameboard.board[1][4]).toBe(1);
});

test("attack", () => {
  gameboard.receiveAttack([4, 1]);
  gameboard.receiveAttack([4, 1]);
  expect(gameboard.board[1][4]).toBe(1);
});
