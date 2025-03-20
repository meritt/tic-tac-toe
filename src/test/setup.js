import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

// Расширяем Vitest matchers для работы с DOM
expect.extend(matchers);

// Очищаем после каждого теста
afterEach(() => {
  cleanup();
});
