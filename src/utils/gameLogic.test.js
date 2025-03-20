import { describe, it, expect } from "vitest";
import { calculateWinner } from "./gameLogic";

describe("calculateWinner", () => {
  it("должен вернуть null для пустого поля", () => {
    const squares = Array(9).fill(null);
    expect(calculateWinner(squares)).toBeNull();
  });

  it("должен вернуть null для незаконченной игры", () => {
    const squares = ["X", null, "O", "X", "O", null, null, null, null];
    expect(calculateWinner(squares)).toBeNull();
  });

  it("должен определить победителя при горизонтальной линии X", () => {
    const squares = ["X", "X", "X", "O", "O", null, null, null, null];
    expect(calculateWinner(squares)).toBe("X");
  });

  it("должен определить победителя при горизонтальной линии O", () => {
    const squares = ["X", "X", null, "O", "O", "O", "X", null, null];
    expect(calculateWinner(squares)).toBe("O");
  });

  it("должен определить победителя при вертикальной линии X", () => {
    const squares = ["X", "O", null, "X", "O", null, "X", null, null];
    expect(calculateWinner(squares)).toBe("X");
  });

  it("должен определить победителя при вертикальной линии O", () => {
    const squares = ["X", "O", null, null, "O", "X", "X", "O", null];
    expect(calculateWinner(squares)).toBe("O");
  });

  it("должен определить победителя при диагональной линии X (слева направо)", () => {
    const squares = ["X", "O", null, "O", "X", null, null, "O", "X"];
    expect(calculateWinner(squares)).toBe("X");
  });

  it("должен определить победителя при диагональной линии O (справа налево)", () => {
    const squares = [null, "X", "O", "X", "O", null, "O", null, "X"];
    expect(calculateWinner(squares)).toBe("O");
  });
});
