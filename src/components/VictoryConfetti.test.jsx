import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import VictoryConfetti from "./VictoryConfetti";

// Мокаем react-confetti, чтобы избежать сложностей с канвасом в тестах
vi.mock("react-confetti", () => ({
  default: vi
    .fn()
    .mockImplementation(() => <div data-testid="mock-confetti" />),
}));

// Мокаем хук useWindowSize
vi.mock("../hooks/useWindowSize", () => ({
  useWindowSize: vi.fn().mockReturnValue({ width: 1024, height: 768 }),
}));

describe("VictoryConfetti", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("не должен отображаться, когда isActive: false", () => {
    const { queryByTestId } = render(<VictoryConfetti isActive={false} />);
    expect(queryByTestId("mock-confetti")).not.toBeInTheDocument();
  });

  it("должен отображаться, когда isActive: true", () => {
    const { queryByTestId } = render(<VictoryConfetti isActive={true} />);
    expect(queryByTestId("mock-confetti")).toBeInTheDocument();
  });

  it("должен скрываться через 5 секунд", () => {
    const { queryByTestId } = render(<VictoryConfetti isActive={true} />);
    expect(queryByTestId("mock-confetti")).toBeInTheDocument();

    // Перематываем таймер на 5 секунд вперед
    vi.advanceTimersByTime(5000);

    expect(queryByTestId("mock-confetti")).not.toBeInTheDocument();
  });

  it("должен сбрасывать таймер при размонтировании", () => {
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
    const { unmount } = render(<VictoryConfetti isActive={true} />);

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
