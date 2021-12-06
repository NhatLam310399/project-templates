import { useSelector } from "react-redux";
import { IRootState } from "typings";

export const useCurrentCanvas = () => {
  const { canvas } = useSelector((state: IRootState) => state.editor);
  return canvas;
};
