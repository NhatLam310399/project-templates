import { useEffect, useState } from "react";
import { OutlineContainer, Label, ColorName } from "./styles";
import { listDetailColors } from "common/constants/editor";
import ColorSelector from "components/ColorSelector";
import TransformSlider from "components/TransformSlider";
import { useActiveObject } from "hooks/useActiveObject";
import { useCurrentCanvas } from "hooks/useCurrentCanvas";
import { BackToMenu } from "layouts/Editor/TabComponents";
import { IColor } from "typings";

interface IOutlineProps {}

const Outline: React.FC<IOutlineProps> = props => {
  const [colorSelected, setColorSelected] = useState<IColor>();
  const [weight, setWeight] = useState<number>(0);
  const activeObject = useActiveObject();
  const canvas = useCurrentCanvas();

  useEffect(() => {
    if (activeObject && canvas) {
      const { strokeWidth, stroke } = activeObject;
      if (strokeWidth) {
        setWeight(strokeWidth || 1);
        setColorSelected(listDetailColors.find(item => item.hex === stroke));
      }
    }
  }, [activeObject]);

  const handleChange = (color: IColor) => {
    if (activeObject) {
      activeObject.stroke = color.hex;
      setColorSelected(color);
      canvas?.renderAll();
    }
  };

  const handleChangeWeight = (val: number) => {
    if (activeObject) {
      activeObject.strokeWidth = val;
      setWeight(val);
      canvas?.renderAll();
    }
  };

  const handleRemoveOutline = () => {
    if (!activeObject) return;
    activeObject.stroke = undefined;
    activeObject.strokeWidth = 1;
    canvas?.renderAll();
    setColorSelected(undefined);
    setWeight(1);
  };

  return (
    <OutlineContainer>
      <BackToMenu />
      <OutlineItemLayout title="Outline color">
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
          onChange={handleChange}
          onSelectNone={handleRemoveOutline}
        />
      </OutlineItemLayout>
      {colorSelected && (
        <>
          <OutlineItemLayout title="Weight">
            <TransformSlider
              value={weight}
              min={0}
              max={5}
              onChange={handleChangeWeight}
              step={0.05}
            />
          </OutlineItemLayout>
        </>
      )}
    </OutlineContainer>
  );
};

export default Outline;

export const OutlineItemLayout: React.FC<{
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
