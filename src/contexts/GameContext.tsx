import { createContext, useEffect, useState } from 'react';

type Board = Array<Array<number>>;

interface GameContextData {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
}

const GameContext = createContext<GameContextData>({
  board: [],
  setBoard: () => {},
});

const GameProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [board, setBoard] = useState<Board>([]);

  useEffect(() => {
    fetch('/api/board').then(async res => {
      const data = await res.json();
      setBoard(data);
    });
  }, []);
  return (
    <GameContext.Provider value={{ board, setBoard }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
