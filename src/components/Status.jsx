import React, { useEffect } from "react";
import "../styles/Status.css";

const Status = ({ status }) => {
  // Определяем, сообщает ли статус о победителе
  const isWinner = status.includes("Победитель");

  // Звуковой эффект при победе
  useEffect(() => {
    if (isWinner) {
      try {
        // Создаем простой звуковой эффект победы
        const audioCtx = new (window.AudioContext ||
          window.webkitAudioContext)();

        // Последовательность нот для фанфар
        const notes = [
          { frequency: 523.25, duration: 100 }, // До
          { frequency: 659.25, duration: 100 }, // Ми
          { frequency: 783.99, duration: 100 }, // Соль
          { frequency: 1046.5, duration: 300 }, // До октавой выше (долго)
        ];

        // Играем ноты последовательно
        let startTime = audioCtx.currentTime;
        notes.forEach((note) => {
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();

          oscillator.type = "sine";
          oscillator.frequency.value = note.frequency;

          gainNode.gain.value = 0.3; // Громкость

          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);

          oscillator.start(startTime);
          oscillator.stop(startTime + note.duration / 1000);

          startTime += note.duration / 1000;
        });
      } catch (error) {
        console.log(
          "Web Audio API не поддерживается или другая ошибка:",
          error,
        );
      }
    }
  }, [isWinner]);

  // Заменяем 'X' и 'O' на span с классами для стилизации
  const styledStatus = status.replace(
    /(X|O)/g,
    (match) =>
      `<span class="${match === "X" ? "x-symbol" : "o-symbol"}">${match}</span>`,
  );

  return (
    <div
      className={`status ${isWinner ? "winner" : ""}`}
      dangerouslySetInnerHTML={{ __html: styledStatus }}
    />
  );
};

export default Status;
