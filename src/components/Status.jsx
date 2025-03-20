import React from "react";
import "../styles/Status.css";

const Status = ({ status }) => {
  // Определяем, сообщает ли статус о победителе
  const isWinner = status.includes("Победитель");

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
