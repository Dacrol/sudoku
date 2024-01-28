import { useState } from 'react';
import './App.css';
import Game from './Game';
import { GameProvider } from './contexts/GameContext';

function App() {
  return (
    <GameProvider>
      <div>
        <Game />
      </div>
    </GameProvider>
  );
}

export default App;
