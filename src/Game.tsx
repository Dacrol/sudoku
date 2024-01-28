import { useContext } from 'react';
import { GameContext } from './contexts/GameContext';

const Game = () => {
  const { board } = useContext(GameContext);
  return (
    <div>
      <pre>{JSON.stringify(board).replaceAll('],[', '],\n[')}</pre>
    </div>
  );
};

export default Game;
