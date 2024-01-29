import { createContext, useEffect, useState } from 'react';

type Board = Array<Array<number>>;

interface GameContextData {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  isSolved: boolean;
}

const GameContext = createContext<GameContextData>({
  board: [],
  setBoard: () => {},
  isSolved: false,
});

const GameProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [board, setBoard] = useState<Board>([]);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    fetch('/api/board', {
      signal: abortController.signal,
    }).then(async res => {
      const data = await res.json();
      setBoard(data);
    });
    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    fetch('/api/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ board }),
    }).then(async res => {
      const data = await res.json();
      setIsSolved(!!data?.valid);
    });
  }, [board]);

  return (
    <GameContext.Provider value={{ board, setBoard, isSolved }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
