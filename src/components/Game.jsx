import React, { useState, useEffect } from "react";
import Board from "./Board";
import Status from "./Status";
import { calculateWinner } from "../utils/gameLogic";
import "../styles/Game.css";

const Game = ({ onWin }) => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [hasActivatedWin, setHasActivatedWin] = useState(false);

  const handleClick = (i) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = [...current.squares];

    // Игнорируем клик, если есть победитель или клетка занята
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";

    setHistory([...currentHistory, { squares }]);
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    setHasActivatedWin(false); // Сбрасываем флаг при перемотке истории
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  // Активируем конфетти при победе
  useEffect(() => {
    if (winner && !hasActivatedWin) {
      onWin && onWin(); // Вызываем функцию активации конфетти из пропсов
      setHasActivatedWin(true); // Устанавливаем флаг, чтобы не активировать конфетти снова
    }
  }, [winner, hasActivatedWin, onWin]);

  const moves = history.map((_, move) => {
    const desc = move ? `Вернуться к ходу №${move}` : "К началу игры";
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className={stepNumber === move ? "active" : ""}
        >
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Победитель: ${winner}`;
  } else if (stepNumber === 9) {
    status = "Ничья!";
  } else {
    status = `Следующий ход: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <Status status={status} />
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
