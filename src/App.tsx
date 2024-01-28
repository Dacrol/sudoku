import './App.css';
import Game from './Game';
import { GameProvider } from './contexts/GameContext';

function App() {
  return (
    <GameProvider>
      <div>
        <h1>Sudoku</h1>
        <Game />
      </div>
    </GameProvider>
  );
}

export default App;
