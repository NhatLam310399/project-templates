import { useEffect, useState } from "react";
import { Group } from "fabric/fabric-impl";
import { ColorContainer, Label, ColorName } from "./styles";
import { listDetailColors } from "common/constants/editor";
import ColorSelector from "components/ColorSelector";
import { BackToMenu } from "layouts/Editor/TabComponents";
import { useActiveObject } from "hooks/useActiveObject";
import { useCurrentCanvas } from "hooks/useCurrentCanvas";
import { IColor } from "typings";

interface IColorProps {}

const Color: React.FC<IColorProps> = props => {
  const activeObject = useActiveObject();
  const [colorSelected, setColorSelected] = useState<IColor | undefined>();
  const canvas = useCurrentCanvas();

  useEffect(() => {
    if (!activeObject) {
      setColorSelected(undefined);
      return;
    }

    const currentColor = listDetailColors.find(item => {
      switch (activeObject?.typeObject) {
        case "VECTOR": {
          // Vector is group of objects, so, we have to check each object instead of parent
          for (const object of (activeObject as Group)._objects)
            if (object.fill === item.hex) return true;
          break;
        }
        case "TEXT": {
          return activeObject.fill === item.hex;
        }
      }
      return false;
    });

    console.log({ currentColor });

    setColorSelected(currentColor);
  }, [activeObject]);

  const handleChange = (newColor: IColor) => {
    switch (activeObject?.typeObject) {
      case "VECTOR": {
        // Vector is group of objects, so, we have to check each object instead of parent
        for (const object of (activeObject as Group)._objects)
          object.fill = newColor.hex;
        break;
      }
      case "TEXT": {
        activeObject.fill = newColor.hex;
        break;
      }
    }
    canvas?.renderAll();
    setColorSelected(newColor);
  };

  return (
    <ColorContainer>
      <BackToMenu />
      <Label>Choose colors</Label>
      {colorSelected && (
        <ColorName>
          {colorSelected.name} (HEX: {colorSelected.hex})
        </ColorName>
      )}
      <ColorSelector
        colorSelected={colorSelected}
        colors={listDetailColors}
        getColor={option => String(option?.hex)}
        onChange={handleChange}
      />
    </ColorContainer>
  );
};

export default Color;
