import { useEffect, useState } from "react";

export const useRender = () => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [bool, setBool] = useState(true);
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const rerender = () => {
    setBool(!bool);
  };

  return { isFirstRender, setIsFirstRender, rerender };
};
