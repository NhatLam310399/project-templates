import { useState } from "react";
import { useEventListener } from "./useEventListener";

export const useResponsive = () => {
  const [screen, setScreen] = useState({
    downPhone: false, // <= 600
    downLaptop: false, // <= 1024
    downDesktop: false, //  <= 1270
  });

  useEventListener(
    "resize",
    () => {
      const widthScr = window.innerWidth;

      if (widthScr < 600 && !screen.downPhone) {
        return setScreen({
          downPhone: true, // <= 600
          downLaptop: true, // <= 1024
          downDesktop: true, //  <= 1270
        });
      }
      if (widthScr < 1024 && !screen.downLaptop) {
        return setScreen({
          downPhone: false, // <= 600
          downLaptop: true, // <= 1024
          downDesktop: true, //  <= 1270
        });
      }
      if (widthScr < 1270 && !screen.downDesktop) {
        return setScreen({
          downPhone: false, // <= 600
          downLaptop: false, // <= 1024
          downDesktop: true, //  <= 1270
        });
      }
      if (widthScr > 1270 && screen.downDesktop) {
        return setScreen({
          downPhone: false, // <= 600
          downLaptop: false, // <= 1024
          downDesktop: false, //  <= 1270
        });
      }
    },
    {
      runInFirstRender: true,
    },
  );

  return screen;
};
