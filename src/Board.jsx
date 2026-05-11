import { useState } from 'react';
import Square from './Square.jsx';
import MyButtons from './MyButtons.jsx';

const initialSquares = Array(3).fill().map(() => Array(3).fill(null));

function Board({ player1, player2, onHome }) {
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);
  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [winnerAwarded, setWinnerAwarded] = useState(false);

  function handleClick(i, j) {
    if (squares[i][j] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.map(row => [...row]);
    nextSquares[i][j] = xIsNext ? 'X' : 'O';
    const move = {i, j};
    let newXMoves = [...xMoves];
    let newOMoves = [...oMoves];
    if (xIsNext) {
      newXMoves.push(move);
      if (newXMoves.length > 3 && !calculateWinner(nextSquares)) {
        const oldest = newXMoves.shift();
        nextSquares[oldest.i][oldest.j] = null;
      }
      setXMoves(newXMoves);
    } else {
      newOMoves.push(move);
      if (newOMoves.length > 3 && !calculateWinner(nextSquares)) {
        const oldest = newOMoves.shift();
        nextSquares[oldest.i][oldest.j] = null;
      }
      setOMoves(newOMoves);
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(initialSquares);
    setXMoves([]);
    setOMoves([]);
    setXIsNext(true);
    setWinnerAwarded(false);
  }

  const winner = calculateWinner(squares);
  
  if (winner && !winnerAwarded) {
    if (winner === 'X') {
      setPlayer1Wins(player1Wins + 1);
    } else {
      setPlayer2Wins(player2Wins + 1);
    }
    setWinnerAwarded(true);
  }
  
  let statusElement;
  if (winner) {
    const winnerName = winner === 'X' ? player1 : player2;
    statusElement = <span className="winner-display">{winnerName} Won!</span>;
  } else {
    const currentPlayer = xIsNext ? player1 : player2;
    const playerColor = xIsNext ? 'player-x' : 'player-o';
    statusElement = <span className={`turn-display ${playerColor}`}>{currentPlayer}'s Turn</span>;
  }

  return (
    <>
      <h1 className="game-title">Infinite Tic Tac Toe</h1>
      <div className="status">
        {statusElement}
      </div>
      <div className="game-container">
        <div className="board">
          {squares.map((row, i) => (
            <div key={i} className="board-row">
              {row.map((cell, j) => (
                <Square key={j} value={cell} onSquareClick={() => handleClick(i, j)} />
              ))}
            </div>
          ))}
        </div>
        <div className="sidebar">
          <div className="scoreboard">
            <h2 className="scoreboard-title">Scoreboard</h2>
            <table className="score-table">
              <tbody>
                <tr>
                  <td className="player-col">{player1}</td>
                  <td className="score-col">{player1Wins}</td>
                </tr>
                <tr>
                  <td className="player-col">{player2}</td>
                  <td className="score-col">{player2Wins}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <MyButtons onReset={resetGame} onHome={onHome} />
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const size = squares.length;
  // check rows
  for (let i = 0; i < size; i++) {
    for (let j = 0; j <= size - 3; j++) {
      if (squares[i][j] && squares[i][j] === squares[i][j+1] && squares[i][j] === squares[i][j+2]) {
        return squares[i][j];
      }
    }
  }
  // check cols
  for (let j = 0; j < size; j++) {
    for (let i = 0; i <= size - 3; i++) {
      if (squares[i][j] && squares[i][j] === squares[i+1][j] && squares[i][j] === squares[i+2][j]) {
        return squares[i][j];
      }
    }
  }
  // check diags
  for (let i = 0; i <= size - 3; i++) {
    for (let j = 0; j <= size - 3; j++) {
      if (squares[i][j] && squares[i][j] === squares[i+1][j+1] && squares[i][j] === squares[i+2][j+2]) {
        return squares[i][j];
      }
    }
  }
  for (let i = 0; i <= size - 3; i++) {
    for (let j = 2; j < size; j++) {
      if (squares[i][j] && squares[i][j] === squares[i+1][j-1] && squares[i][j] === squares[i+2][j-2]) {
        return squares[i][j];
      }
    }
  }
  return null;
}

export default Board;