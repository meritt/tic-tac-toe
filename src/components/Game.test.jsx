import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "./Game";

describe("Game", () => {
  it("должен отрисовать пустую доску и статус при первом рендере", () => {
    render(<Game onWin={() => {}} />);

    expect(screen.getByText(/Следующий ход: X/i)).toBeInTheDocument();

    const squares = screen
      .getAllByRole("button")
      .filter((button) => button.classList.contains("square"));
    expect(squares).toHaveLength(9);

    // Проверяем, что все клетки пустые
    squares.forEach((square) => {
      expect(square).toHaveTextContent("");
    });
  });

  it("должен корректно обрабатывать нажатия и менять игрока", async () => {
    const user = userEvent.setup();
    render(<Game onWin={() => {}} />);

    const squares = screen
      .getAllByRole("button")
      .filter((button) => button.classList.contains("square"));

    // Первый ход X
    await user.click(squares[0]);
    expect(squares[0]).toHaveTextContent("X");
    expect(screen.getByText(/Следующий ход: O/i)).toBeInTheDocument();

    // Второй ход O
    await user.click(squares[4]);
    expect(squares[4]).toHaveTextContent("O");
    expect(screen.getByText(/Следующий ход: X/i)).toBeInTheDocument();
  });

  it("не должен изменять клетку, если она уже заполнена", async () => {
    const user = userEvent.setup();
    render(<Game onWin={() => {}} />);

    const squares = screen
      .getAllByRole("button")
      .filter((button) => button.classList.contains("square"));

    // Первый ход X в клетку 0
    await user.click(squares[0]);
    expect(squares[0]).toHaveTextContent("X");

    // Попытка хода O в ту же клетку
    await user.click(squares[0]);
    expect(squares[0]).toHaveTextContent("X"); // Содержимое не должно измениться
    expect(screen.getByText(/Следующий ход: O/i)).toBeInTheDocument(); // Ход не должен смениться
  });

  it("должен определять победителя и вызывать onWin", async () => {
    const onWin = vi.fn();
    const user = userEvent.setup();
    render(<Game onWin={onWin} />);

    const squares = screen
      .getAllByRole("button")
      .filter((button) => button.classList.contains("square"));

    // X: верхний левый
    await user.click(squares[0]);
    // O: центр
    await user.click(squares[4]);
    // X: верхний центр
    await user.click(squares[1]);
    // O: нижний центр
    await user.click(squares[7]);
    // X: верхний правый (победа)
    await user.click(squares[2]);

    expect(screen.getByText(/Победитель: X/i)).toBeInTheDocument();
    expect(onWin).toHaveBeenCalledTimes(1);
  });

  it("должен позволять вернуться к предыдущему ходу", async () => {
    const user = userEvent.setup();
    render(<Game onWin={() => {}} />);

    const squares = screen
      .getAllByRole("button")
      .filter((button) => button.classList.contains("square"));

    // Делаем несколько ходов
    await user.click(squares[0]); // X
    await user.click(squares[4]); // O
    await user.click(squares[1]); // X

    // Возвращаемся к первому ходу
    const historyButtons = screen
      .getAllByRole("button")
      .filter((button) => !button.classList.contains("square"));

    await user.click(historyButtons[1]); // "Вернуться к ходу №1"

    // Проверяем, что доска обновилась
    const updatedSquares = screen
      .getAllByRole("button")
      .filter((button) => button.classList.contains("square"));

    expect(updatedSquares[0]).toHaveTextContent("X");
    expect(updatedSquares[1]).toHaveTextContent("");
    expect(updatedSquares[4]).toHaveTextContent("");
    expect(screen.getByText(/Следующий ход: O/i)).toBeInTheDocument();
  });
});
