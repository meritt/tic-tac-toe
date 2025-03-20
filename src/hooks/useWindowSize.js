import { useState, useEffect } from "react";

export function useWindowSize() {
  // Инициализируем с 0x0, чтобы избежать проблем с SSR
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Функция для обновления размеров окна
    function updateSize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Вызываем сразу при монтировании
    updateSize();

    // Добавляем слушатель события изменения размера окна
    window.addEventListener("resize", updateSize);

    // Очистка при размонтировании
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return windowSize;
}
