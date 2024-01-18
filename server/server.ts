import { generateSudokuBoard } from './generator';

const board = generateSudokuBoard();

const boardString = board.map(row => row.join('')).join('\n');

console.log(boardString);
