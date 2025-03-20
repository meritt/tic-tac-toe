import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Square from "./Square";

describe("Square", () => {
  it("должен корректно отображать X", () => {
    const onClick = vi.fn();
    render(<Square value="X" onClick={onClick} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("X");
    expect(button).toHaveClass("x-symbol");
  });

  it("должен корректно отображать O", () => {
    const onClick = vi.fn();
    render(<Square value="O" onClick={onClick} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("O");
    expect(button).toHaveClass("o-symbol");
  });

  it("должен быть пустым, если значение не передано", () => {
    const onClick = vi.fn();
    render(<Square value={null} onClick={onClick} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("");
  });

  it("должен вызывать onClick при клике", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Square value={null} onClick={onClick} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
