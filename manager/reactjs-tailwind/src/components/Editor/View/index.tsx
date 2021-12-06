import { KeyboardEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fabric } from "fabric";
import { ViewContainer, CanvasContainer, Canvas } from "./styles";
import TopBar from "./TopBar";
import Toolbar from "./Toolbar";
import PreviewThumbs from "./PreviewThumbs";
import ErrorBoundary from "components/ErrorBoundary";
import { IRootState } from "typings";
import {
  initCanvas,
  removeObjectHasId,
  setCurrentActiveObjectID,
} from "redux/actions/editor";

interface IViewProps {}

const View: React.FC<IViewProps> = props => {
  const dispatch = useDispatch();
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const { canvas } = useSelector((state: IRootState) => state.editor);

  useEffect(() => {
    const width = canvasContainerRef?.current?.offsetWidth;
    const height = canvasContainerRef?.current?.offsetHeight;
    dispatch(
      initCanvas(
        new fabric.Canvas("canvas-editor", {
          width,
          height,
          backgroundColor: "rgba(0,0,0,0)",
          preserveObjectStacking: true,
          controlsAboveOverlay: true,
        }),
      ),
    );
  }, []);

  useEffect(() => {
    if (canvas) {
      const showMouseLocation = (e: fabric.IEvent) => {
        const size = canvas.getWidth();
        const pointer = canvas.getPointer(e.e);
        console.log({ x: pointer.x / size, y: pointer.y / size }); // Log to console
      };

      const updateActiveObjectID = (e: fabric.IEvent) => {
        const activeObjectId = e.target?.id || null;
        dispatch(setCurrentActiveObjectID(activeObjectId));
      };

      const handleShowBorderClipPath = () => {
        const activeObjects = canvas.getActiveObjects();
        const borderClipPath = canvas
          .getObjects()
          .find(obj => obj.typeObject === "CLIP_PATH_BORDER");
        if (!borderClipPath) return;

        if (activeObjects.length > 0) {
          borderClipPath.set("stroke", "#49ffff");
          canvas.renderAll();
        } else {
          borderClipPath.set("stroke", "transparent");
          canvas.renderAll();
        }
      };

      canvas.on("mouse:down", e => {
        // showMouseLocation(e);
        updateActiveObjectID(e);
        handleShowBorderClipPath();
      });

      // canvas.on("mouse:up", e => {});

      document.onkeydown = function (e) {
        // If we focus to TextArea or Input, do nothing
        if (document.activeElement?.tagName !== "BODY") return;

        const activeObject: Required<fabric.Object> =
          canvas.getActiveObject() as any;
        if (!activeObject) return;
        e.preventDefault();
        e.stopPropagation();

        switch (e.key) {
          case "Backspace":
            dispatch(removeObjectHasId(activeObject.id));
            break;
          case "Delete":
            dispatch(removeObjectHasId(activeObject.id));
            break;
          case "ArrowRight":
            activeObject.left += 2;
            canvas.renderAll();
            break;
          case "ArrowLeft":
            activeObject.left -= 2;
            canvas.renderAll();
            break;
          case "ArrowUp":
            activeObject.top -= 2;
            canvas.renderAll();
            break;
          case "ArrowDown":
            activeObject.top += 2;
            canvas.renderAll();
            break;
        }
      };
    }
  }, [canvas]);

  return (
    <ViewContainer>
      <ErrorBoundary>
        <TopBar />
      </ErrorBoundary>
      <ErrorBoundary>
        <Toolbar />
      </ErrorBoundary>
      <CanvasContainer ref={canvasContainerRef} id="canvas-container">
        <Canvas id="canvas-editor" />
      </CanvasContainer>
      <ErrorBoundary>
        <PreviewThumbs />
      </ErrorBoundary>
    </ViewContainer>
  );
};

export default View;
