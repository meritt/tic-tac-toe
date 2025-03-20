import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Status from "./Status";

describe("Status", () => {
  it("должен корректно отображать следующий ход", () => {
    const { container } = render(<Status status="Следующий ход: X" />);
    expect(container.firstChild).toHaveClass("status");
    expect(container.firstChild).not.toHaveClass("winner");
    expect(container.innerHTML).toContain("Следующий ход:");
    expect(container.innerHTML).toContain('<span class="x-symbol">X</span>');
  });

  it("должен корректно отображать победителя X", () => {
    const { container } = render(<Status status="Победитель: X" />);
    expect(container.firstChild).toHaveClass("status");
    expect(container.firstChild).toHaveClass("winner");
    expect(container.innerHTML).toContain("Победитель:");
    expect(container.innerHTML).toContain('<span class="x-symbol">X</span>');
  });

  it("должен корректно отображать победителя O", () => {
    const { container } = render(<Status status="Победитель: O" />);
    expect(container.firstChild).toHaveClass("status");
    expect(container.firstChild).toHaveClass("winner");
    expect(container.innerHTML).toContain("Победитель:");
    expect(container.innerHTML).toContain('<span class="o-symbol">O</span>');
  });

  it("должен корректно отображать ничью", () => {
    const { container } = render(<Status status="Ничья!" />);
    expect(container.firstChild).toHaveClass("status");
    expect(container.firstChild).not.toHaveClass("winner");
    expect(container.innerHTML).toContain("Ничья!");
  });
});
