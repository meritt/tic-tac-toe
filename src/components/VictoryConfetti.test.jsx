import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import VictoryConfetti from "./VictoryConfetti";

// Мокаем хук useWindowSize
vi.mock("../hooks/useWindowSize", () => ({
  useWindowSize: () => ({ width: 1024, height: 768 }),
}));

// Мокаем react-confetti
vi.mock("react-confetti", () => ({
  default: vi
    .fn()
    .mockImplementation(() => <div data-testid="mock-confetti" />),
}));

describe("VictoryConfetti", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
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
