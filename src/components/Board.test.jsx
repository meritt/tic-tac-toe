import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Board from "./Board";

describe("Board", () => {
  it("должен отрисовать 9 клеток", () => {
    const squares = Array(9).fill(null);
    const onClick = vi.fn();

    render(<Board squares={squares} onClick={onClick} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(9);
  });

  it("должен отображать значения X и O в клетках", () => {
    const squares = ["X", null, "O", null, "X", null, "O", null, null];
    const onClick = vi.fn();

    render(<Board squares={squares} onClick={onClick} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveTextContent("X");
    expect(buttons[2]).toHaveTextContent("O");
    expect(buttons[4]).toHaveTextContent("X");
    expect(buttons[6]).toHaveTextContent("O");
  });

  it("должен вызывать onClick с индексом клетки при клике", async () => {
    const squares = Array(9).fill(null);
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Board squares={squares} onClick={onClick} />);

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[4]); // Клик на центральную клетку

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(4);
  });
});
