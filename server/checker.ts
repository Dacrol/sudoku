export const checkRow = (row: number[]) => {
  if (row.length !== 9) {
    throw new Error('Row must have 9 cells');
  }
  // check if row only has unique numbers, disregarding 0
  const filtered = row.filter(num => num !== 0);
  const set = new Set(filtered);
  return set.size === filtered.length;
};

export const checkColumn = (board: number[][], columnIndex: number) => {
  if (board.length !== 9) {
    throw new Error('Board must have 9 rows');
  }
  const column = board.map(row => row[columnIndex]);
  if (column.length !== 9) {
    throw new Error('Column must have 9 cells');
  }
  return checkRow(column);
};

export const checkSquare = (board: number[][], squareIndex: number) => {
  if (board.length !== 9) {
    throw new Error('Board must have 9 rows');
  }
  const square: number[] = [];
  const rowStart = Math.floor(squareIndex / 3) * 3;
  const colStart = (squareIndex % 3) * 3;
  for (let i = rowStart; i < rowStart + 3; i++) {
    for (let j = colStart; j < colStart + 3; j++) {
      square.push(board[i][j]);
    }
  }
  if (square.length !== 9) {
    throw new Error('Square must have 9 cells');
  }
  return checkRow(square);
};

export const checkBoard = (board: number[][]) => {
  return (
    board.every(row => checkRow(row)) &&
    board.every((_, i) => checkColumn(board, i)) &&
    board.every((_, i) => checkSquare(board, i))
  );
};
