import { useState } from 'react'
import Board from './Board.jsx'
import StartGame from './StartGame.jsx'

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');

  const handleStartGame = (p1, p2) => {
    setPlayer1Name(p1);
    setPlayer2Name(p2);
    setGameStarted(true);
  };

  const handleBackToHome = () => {
    setGameStarted(false);
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <StartGame onStart={handleStartGame} />
      ) : (
        <Board player1={player1Name} player2={player2Name} onHome={handleBackToHome} />
      )}
    </div>
  )
}

export default App