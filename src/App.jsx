import React, { useState, useEffect } from "react";
import Game from "./components/Game";
import VictoryConfetti from "./components/VictoryConfetti";
import "./styles/global.css";

function App() {
  const [showConfetti, setShowConfetti] = useState(false);

  // Функция для активации конфетти, которую мы передадим в Game
  const activateConfetti = () => {
    setShowConfetti(true);
    // Автоматически отключаем через 5 секунд
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  return (
    <>
      {/* Конфетти вне контейнера для полноэкранного отображения */}
      <VictoryConfetti isActive={showConfetti} />

      <div className="app-container">
        <h1>Крестики-нолики</h1>
        <Game onWin={activateConfetti} />
      </div>
    </>
  );
}

export default App;
