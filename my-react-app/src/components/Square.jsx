import React from "react";
import "../styles/Square.css";

const Square = ({ value, onClick }) => {
  return (
    <button
      className={`square ${value === "X" ? "x-symbol" : value === "O" ? "o-symbol" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
