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
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.2}
    />
  );
};

export default VictoryConfetti;
