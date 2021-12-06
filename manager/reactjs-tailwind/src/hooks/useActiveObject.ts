import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCurrentCanvas } from "./useCurrentCanvas";
import { IRootState } from "typings";

export const useActiveObject = () => {
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);
  const canvas = useCurrentCanvas();
  const { currentActiveObjectId } = useSelector(
    (state: IRootState) => state.editor,
  );
  useEffect(() => {
    setActiveObject(canvas?.getActiveObject() || null);
  }, [currentActiveObjectId]);

  return activeObject;
};
