import { useContext } from 'react';
import { GameContext } from './contexts/GameContext';
import styled from 'styled-components';

const Cell = styled.input`
  width: 32px;
  height: 32px;
  border: 1px solid black;
  text-align: center;
`;

const Game = () => {
  const { board, setBoard, isSolved } = useContext(GameContext);
  return (
    <div>
      <div id="game-board">
        {board.map((row, i) => (
          <div key={i}>
            {row.map((cell, j) => (
              <span key={j}>
                <Cell
                  type="number"
                  value={cell === 0 ? undefined : cell}
                  onChange={e => {
                    const newBoard = [...board];
                    newBoard[i][j] = parseInt(e.target.value);
                    setBoard(newBoard);
                  }}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div id="game-status">
        <h2>{isSolved ? 'Solved!' : 'Not solved yet'}</h2>
      </div>
    </div>
  );
};

export default Game;
