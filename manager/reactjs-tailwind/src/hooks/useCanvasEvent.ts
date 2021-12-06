import { useLayoutEffect, useRef } from "react";
import { useCurrentCanvas } from "./useCurrentCanvas";

type IOption = {
  runInFirstRender: boolean;
};

type ICanvasEvent =
  | "mouse:up"
  | "object:modified"
  | "object:moving"
  | "mouse:up"
  | "mouse:down"
  | "mouse:move"
  | "mouse:up:before"
  | "mouse:down:before";

export const useCanvasEvent = (
  event: ICanvasEvent,
  callback: (e: fabric.IEvent | null) => void,
  option?: IOption,
) => {
  const callbackRef = useRef(callback);
  const canvas = useCurrentCanvas();

  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useLayoutEffect(() => {
    if (!canvas) return;

    if (option?.runInFirstRender) callbackRef.current(null);

    const handler = (e: fabric.IEvent) => callbackRef.current(e);
    canvas.on(event, handler);

    return () => {
      canvas.off(event, handler);
    };
  }, [canvas, event]);
};
