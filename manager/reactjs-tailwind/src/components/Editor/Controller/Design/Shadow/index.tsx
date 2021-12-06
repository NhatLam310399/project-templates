import { useEffect, useState } from "react";
import { fabric } from "fabric";
import { OutlineContainer, Label, ColorName } from "./styles";
import { listDetailColors } from "common/constants/editor";
import ColorSelector from "components/ColorSelector";
import TransformSlider from "components/TransformSlider";
import { useActiveObject } from "hooks/useActiveObject";
import { useCurrentCanvas } from "hooks/useCurrentCanvas";
import { BackToMenu } from "layouts/Editor/TabComponents";
import { IColor } from "typings";

interface IShadowProps {}

const MIN_OFFSET = -10;
const MAX_OFFSET = 10;
const STEP_OFFSET = 0.1;

const OFFSET_X_DEFAULT = 3;
const OFFSET_Y_DEFAULT = -3;

const Shadow: React.FC<IShadowProps> = props => {
  const [colorSelected, setColorSelected] = useState<IColor>();
  const [offsetX, setOffsetX] = useState<number>(OFFSET_X_DEFAULT);
  const [offsetY, setOffsetY] = useState<number>(OFFSET_Y_DEFAULT);
  const activeObject = useActiveObject();
  const canvas = useCurrentCanvas();

  useEffect(() => {
    if (activeObject && canvas) {
      const shadow: fabric.Shadow | undefined = activeObject.shadow as any;
      if (shadow) {
        setOffsetX(Number(shadow.offsetX));
        setOffsetY(Number(shadow.offsetY));
        setColorSelected(
          listDetailColors.find(item => item.hex === shadow.color),
        );
      }
    }
  }, [activeObject]);

  const handleChangeColor = (color: IColor) => {
    if (activeObject) {
      if (!activeObject.shadow) {
        const offsetX = OFFSET_X_DEFAULT;
        const offsetY = OFFSET_Y_DEFAULT;
        activeObject.shadow = new fabric.Shadow({
          offsetX,
          offsetY,
          affectStroke: true,
        });
        setOffsetX(offsetX);
        setOffsetY(offsetY);
      }
      (activeObject.shadow as fabric.Shadow).color = color.hex;

      setColorSelected(color);
      canvas?.renderAll();
    }
  };

  const handleChangeOffsetX = (val: number) => {
    if (activeObject) {
      (activeObject.shadow as fabric.Shadow).offsetX = val;
      setOffsetX(val);
      canvas?.renderAll();
    }
  };

  const handleChangeOffsetY = (val: number) => {
    if (activeObject) {
      (activeObject.shadow as fabric.Shadow).offsetY = val;
      setOffsetY(val);
      canvas?.renderAll();
    }
  };

  const handleRemoveOutline = () => {
    if (!activeObject) return;
    activeObject.shadow = undefined;
    canvas?.renderAll();
    setColorSelected(undefined);
    setOffsetX(OFFSET_X_DEFAULT);
    setOffsetY(OFFSET_Y_DEFAULT);
  };

  return (
    <OutlineContainer>
      <BackToMenu />
      <ShadowItemLayout title="Shadow color">
        {colorSelected && (
          <ColorName>
            {colorSelected.name} (HEX: {colorSelected.hex})
          </ColorName>
        )}
        <ColorSelector
          colorSelected={colorSelected}
          colors={[
            {
              name: "None",
              hex: "NONE",
            },
            ...listDetailColors,
          ]}
          getColor={option => String(option?.hex)}
          onChange={handleChangeColor}
          onSelectNone={handleRemoveOutline}
        />
      </ShadowItemLayout>
      {colorSelected && (
        <>
          <ShadowItemLayout title="Offset X">
            <TransformSlider
              value={offsetX}
              min={MIN_OFFSET}
              max={MAX_OFFSET}
              step={STEP_OFFSET}
              onChange={handleChangeOffsetX}
            />
          </ShadowItemLayout>
          <ShadowItemLayout title="Offset Y">
            <TransformSlider
              value={offsetY}
              min={MIN_OFFSET}
              max={MAX_OFFSET}
              step={STEP_OFFSET}
              onChange={handleChangeOffsetY}
            />
          </ShadowItemLayout>
        </>
      )}
    </OutlineContainer>
  );
};

export default Shadow;

export const ShadowItemLayout: React.FC<{
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
