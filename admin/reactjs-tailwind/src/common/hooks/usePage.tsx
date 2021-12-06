import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";

export const usePage = (
  initialPage = 1,
): [number, (newPage: number) => void] => {
  const history = useHistory();
  const [state, setState] = useState(Number(initialPage));
  useEffect(() => {
    setState(Number(initialPage));
  }, [initialPage]);
  const setPage = useCallback((newPage: number) => {
    setState(newPage);
    history.push(`${history.location.pathname}?page=${newPage}`);
  }, []);
  return [state, setPage];
};
