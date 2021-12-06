import { Group } from "fabric/fabric-impl";
import { useEffect, useState } from "react";
import { ColorBlock } from "./styles";
import { listDetailColors } from "common/constants/editor";
import { useActiveObject } from "hooks/useActiveObject";
import { IColor } from "typings";

const ColorIcon: React.FC<{}> = props => {
  const activeObject = useActiveObject();
  const [colorSelected, setColorSelected] = useState<IColor | undefined>();

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

    setColorSelected(currentColor);
  }, [activeObject]);

  return (
    <ColorBlock
      style={{
        background: String(colorSelected?.hex) || "black",
      }}
    />
  );
};

export default ColorIcon;
