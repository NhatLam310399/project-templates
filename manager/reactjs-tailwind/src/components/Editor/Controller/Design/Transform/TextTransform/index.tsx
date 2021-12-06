/**
 * @NOTE: fabricJS is not currently support
 */

import { useEffect, useState } from "react";
import { TransformItemLayout } from "..";
import { useActiveObject } from "hooks/useActiveObject";
import { useCurrentCanvas } from "hooks/useCurrentCanvas";
import TransformSlider from "components/TransformSlider";

interface ITextTransformProps {}

const MIN = -360;
const MAX = 360;

const TextTransform: React.FC<ITextTransformProps> = props => {
  const activeObject = useActiveObject();
  const canvas = useCurrentCanvas();
  const [diameter, setDiameter] = useState(0);

  useEffect(() => {
    if (activeObject) {
    }
  }, [activeObject]);

  useEffect(() => {
    if (!canvas) return;
    canvas.on("mouse:up", () => {
      const activeObject = canvas.getActiveObject();
      if (!activeObject) return;
      // console.log(activeObject.);
      // const angle = getAngleInRange(activeObject.angle);
      // const angle = activeObject.
      // setDiameter(angle);
    });
    return () => {
      console.log("Destroy!");
    };
  }, [canvas]);

  const handleChangeArc = (newValue: number) => {
    if (activeObject && canvas) {
      setDiameter(newValue);

      canvas.renderAll();
    }
  };

  return (
    <>
      <TransformItemLayout title="Arc">
        <TransformSlider
          className="w-full"
          value={diameter}
          min={MIN}
          max={MAX}
          step={1}
          onChange={handleChangeArc}
        />
      </TransformItemLayout>
    </>
  );
};

export default TextTransform;
