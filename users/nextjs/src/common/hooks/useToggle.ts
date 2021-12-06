import { useState } from "react";

export const useToggle = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const onClickToggle = () => {
    setToggle((toggle) => {
      return !toggle;
    });
  };
  return { toggle, onClickToggle };
};
