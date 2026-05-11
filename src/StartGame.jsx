import { useState } from 'react';

function StartGame({ onStart }) {
  const [player1, setPlayer1] = useState('Player 1');
  const [player2, setPlayer2] = useState('Player 2');

  const handleStart = () => {
    onStart(player1, player2);
  };

  return (
    <div className="start-game">
      <h1 className="game-title">Infinite Tic Tac Toe</h1>
      <div className="input-container">
        <div className="input-group">
          <label htmlFor="player1">Player 1 Name:</label>
          <input
            id="player1"
            type="text"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            placeholder="Enter Player 1 name"
            className="player-input"
          />
        </div>
        <div className="input-group">
          <label htmlFor="player2">Player 2 Name:</label>
          <input
            id="player2"
            type="text"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            placeholder="Enter Player 2 name"
            className="player-input"
          />
        </div>
      </div>
      <button className="start-btn" onClick={handleStart}>
        Start Game
      </button>
    </div>
  );
}

export default StartGame;
