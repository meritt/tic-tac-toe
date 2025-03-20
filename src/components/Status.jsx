import React from "react";
import "../styles/Status.css";

const Status = ({ status }) => {
  // Заменяем 'X' и 'O' на span с классами для стилизации
  const styledStatus = status.replace(
    /(X|O)/g,
    (match) =>
      `<span class="${match === "X" ? "x-symbol" : "o-symbol"}">${match}</span>`,
  );

  return (
    <div
      className="status"
      dangerouslySetInnerHTML={{ __html: styledStatus }}
    />
  );
};

export default Status;
