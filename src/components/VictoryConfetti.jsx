import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "../hooks/useWindowSize";

const VictoryConfetti = ({ isActive }) => {
  const { width, height } = useWindowSize();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      // Убираем конфетти через 5 секунд
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000, // Высокий z-index для размещения поверх всего
        pointerEvents: "none", // Чтобы конфетти не мешало нажатиям
      }}
    >
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        gravity={0.2}
      />
    </div>
  );
};

export default VictoryConfetti;
