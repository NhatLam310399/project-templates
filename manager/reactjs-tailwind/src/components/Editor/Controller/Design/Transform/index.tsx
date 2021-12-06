import { useEffect, useState } from "react";
import { TransformContainer, Label } from "./styles";
import TextTransform from "./TextTransform";
import ObjectTransform from "./ObjectTransform";
import { BackToMenu } from "layouts/Editor/TabComponents";
import { useActiveObject } from "hooks/useActiveObject";
import { useCurrentCanvas } from "hooks/useCurrentCanvas";
import TransformSlider from "components/TransformSlider";

interface ITransformProps {}

const MIN_ROTATE = -180;
const MAX_ROTATE = 180;

const getAngleInRange = (angle: number | undefined = 0) => {
  angle = Math.floor(angle);
  if (angle > MAX_ROTATE) angle = angle - 360;
  return angle;
};

const Transform: React.FC<ITransformProps> = props => {
  const activeObject = useActiveObject();
  const canvas = useCurrentCanvas();
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    if (activeObject) {
      const angle = getAngleInRange(activeObject.angle);
      setRotate(angle);
    }
  }, [activeObject]);

  useEffect(() => {
    if (!canvas) return;
    canvas.on("mouse:up", () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        const angle = getAngleInRange(activeObject.angle);
        setRotate(angle);
      }
    });
  }, [canvas]);

  const handleRotate = (newValue: number) => {
    if (activeObject && canvas) {
      setRotate(newValue);
      activeObject.rotate(newValue);
      canvas.renderAll();
    }
  };

  return (
    <TransformContainer>
      <BackToMenu />
      <TransformItemLayout title="Rotate">
        <TransformSlider
          className="w-full"
          value={rotate}
          min={MIN_ROTATE}
          max={MAX_ROTATE}
          step={1}
          onChange={handleRotate}
        />
      </TransformItemLayout>
      {activeObject?.typeObject === "TEXT" ? (
        <TextTransform />
      ) : (
        <ObjectTransform />
      )}
    </TransformContainer>
  );
};

export default Transform;

export const TransformItemLayout: React.FC<{
  title: string;
  className?: string;
}> = ({ title, className = "", children }) => {
  return (
    <div className={className}>
      <Label>{title}</Label>
      {children}
    </div>
  );
};
