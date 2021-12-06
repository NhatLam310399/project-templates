import { useState } from "react";

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };
  const onCloseModal = () => {
    setIsShowing(false);
  };
  return {
    isShowing,
    toggle,
    onCloseModal,
  };
};
