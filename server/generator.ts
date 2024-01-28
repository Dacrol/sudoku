import { checkBoard, checkColumn, checkRow, checkSquare } from './checker';

const baseBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const findFirstEmptyCell = (board: number[][]) => {
  for (let i = 0; i < 9; i++) {
    const row = board[i];
    for (let j = 0; j < 9; j++) {
      if (row[j] === 0) {
        return [i, j];
      }
    }
  }
  return null;
};

export const backtrackSolver = (board: number[][] = baseBoard) => {
  const firstEmptyCell = findFirstEmptyCell(board);
  if (!firstEmptyCell) {
    return board;
  }
  const [row, col] = firstEmptyCell;
  // Random offset between 0 and 9 to shuffle numbers
  const offset = Math.floor(Math.random() * 9);
  for (let num = 1; num <= 9; num++) {
    let offsetNum = num + offset;
    if (offsetNum > 9) {
      offsetNum -= 9;
    }
    board[row][col] = offsetNum;
    if (checkBoard(board) && backtrackSolver(board)) {
      return backtrackSolver(board); // Proceeds to next cell
    }
    board[row][col] = 0; // Resets cell for next attempt
  }
  return null;
};

export const generateChallenge = (difficulty: 'easy' | 'medium' | 'hard') => {
  const difficultyMap = {
    easy: 10,
    medium: 20,
    hard: 30,
  };
  const challenge = backtrackSolver();
  let cellsToClear = difficultyMap[difficulty];
  while (cellsToClear > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (challenge[row][col] !== 0) {
      challenge[row][col] = 0;
      cellsToClear--;
    }
  }
  return challenge;
};

console.table(generateChallenge('easy'));
