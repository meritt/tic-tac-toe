/**
 * Функция для определения победителя в игре "Крестики-нолики"
 * @param {Array} squares - Массив из 9 элементов, представляющий игровое поле
 * @returns {string|null} - Символ победителя ('X' или 'O') или null, если победителя нет
 */
export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
