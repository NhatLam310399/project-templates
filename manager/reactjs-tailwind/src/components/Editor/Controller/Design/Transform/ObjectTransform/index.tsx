import { useEffect, useState } from "react";
import { TransformItemLayout } from "..";
import { SizeEditorContainer, FlipButtonsContainer } from "./styles";
import { useActiveObject } from "hooks/useActiveObject";
import { useCurrentCanvas } from "hooks/useCurrentCanvas";
import Counter from "components/Counter";
import { getScaleWidthHeightFromObject } from "common/functions";
import IconButton from "designs/IconButton";
import SVG from "designs/SVG";
import Button from "designs/Button";

interface ITextTransformProps {}

const MIN = 0;
const MAX = 1000;
const STEP = 2;

const ObjectTransform: React.FC<ITextTransformProps> = props => {
  const activeObject = useActiveObject();
  const canvas = useCurrentCanvas();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isLockSize, setIsLockSize] = useState(true);

  useEffect(() => {
    if (activeObject) {
      const { width, height } = getScaleWidthHeightFromObject(activeObject);
      setWidth(width);
      setHeight(height);
    }
  }, [activeObject]);

  useEffect(() => {
    if (!canvas) return;
    canvas.on("mouse:up", () => {
      const activeObject = canvas.getActiveObject();
      if (!activeObject) return;

      const { width, height } = getScaleWidthHeightFromObject(activeObject);

      setWidth(width);
      setHeight(height);
    });
    return () => {
      console.log("Destroy!");
    };
  }, [canvas]);

  const handleChangeWidth = (newWidth: number) => {
    console.log(newWidth);
    if (activeObject && canvas) {
      if (activeObject.scaleX !== 1)
        activeObject.set("scaleX", newWidth / (activeObject.width || 1));
      else activeObject.set("width", newWidth);
      setWidth(newWidth);
      if (isLockSize) {
        const newHeight = (newWidth * height) / width;
        handleChangeHeight(newHeight, true);
      }
      canvas.renderAll();
    }
  };

  const handleChangeHeight = (newHeight: number, isFromChangeWidth = false) => {
    if (activeObject && canvas) {
      console.log(activeObject.scaleY);
      if (activeObject.scaleY !== 1)
        activeObject.set("scaleY", newHeight / (activeObject.height || 1));
      else activeObject.set("height", newHeight);

      if (isLockSize && !isFromChangeWidth) {
        const newWidth = (width * newHeight) / height;
        handleChangeWidth(newWidth);
      }

      setHeight(newHeight);
      canvas.renderAll();
    }
  };

  const handleFlipX = () => {
    if (activeObject) {
      activeObject.toggle("flipX");
      canvas?.renderAll();
    }
  };

  const handleFlipY = () => {
    if (activeObject) {
      activeObject.toggle("flipY");
      canvas?.renderAll();
    }
  };

  return (
    <>
      <SizeEditorContainer>
        <TransformItemLayout className="w-full" title="Width">
          <Counter
            className="w-full"
            value={width}
            min={MIN}
            max={MAX}
            step={STEP}
            onChange={handleChangeWidth}
          />
        </TransformItemLayout>
        <IconButton
          tooltip={isLockSize ? "Unlock" : "Lock"}
          className="w-2 h-2 mt-5"
          onClick={() => setIsLockSize(!isLockSize)}
        >
          {isLockSize ? (
            <SVG name="editor/link" />
          ) : (
            <SVG name="editor/unlink" className="opacity-40" />
          )}
        </IconButton>
        <TransformItemLayout className="w-full" title="Height">
          <Counter
            className="w-full"
            value={height}
            min={MIN}
            max={MAX}
            step={STEP}
            onChange={handleChangeHeight}
          />
        </TransformItemLayout>
      </SizeEditorContainer>
      <TransformItemLayout title="Flip" className="w-full">
        <FlipButtonsContainer>
          <Button
            variant="black-secondary"
            icon={<SVG name="editor/flip/flip-x" />}
            className="w-full"
            onClick={handleFlipX}
          >
            Horizontally
          </Button>
          <Button
            variant="black-secondary"
            icon={<SVG name="editor/flip/flip-y" />}
            className="w-full"
            onClick={handleFlipY}
          >
            Vertically
          </Button>
        </FlipButtonsContainer>
      </TransformItemLayout>
    </>
  );
};

export default ObjectTransform;
