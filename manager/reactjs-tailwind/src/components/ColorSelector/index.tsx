import { ColorSelectorContainer, ColorBlock, SubColorBlock } from "./styles";
import { copyObject } from "common/functions";
import NoneColorIcon from "icons/NoneColor";
import TickIcon from "icons/Tick";

type IColorSelectorProps<T> = {
  className?: string;
  colors: T[];
  // This will help us know what is hex or rgb string of each T
  // ex:  return "#000" | "rbg(0, 0, 0)"
  getColor: (option: T | undefined) => string;
  // If we click to { hex: "NONE"}
  onSelectNone?: () => void;
} & (
  | {
      isMultiSelect: true;
      listColorSelected: T[];
      readonly colorSelected?: undefined;
      onChange?: (colors: T[]) => void;
    }
  | {
      isMultiSelect?: false;
      readonly listColorSelected?: undefined;
      colorSelected: T | undefined;
      onChange?: (color: T) => void;
    }
);

const ColorSelector = <T,>({
  colors,
  colorSelected,
  listColorSelected = [],
  isMultiSelect,
  onChange,
  getColor,
  onSelectNone,
  className = "",
}: IColorSelectorProps<T>) => {
  const wrapperOnChange = (option: T, selected: boolean) => {
    if (getColor(option) === "NONE") {
      return onSelectNone?.();
    }

    if (isMultiSelect) {
      let list = copyObject(listColorSelected);

      // If selected, now remove it
      if (selected)
        list = list.filter(item => getColor(option) !== getColor(item));
      else list.push(option);

      onChange?.(list as any);
    } else {
      onChange?.(option as any);
    }
  };
  return (
    <ColorSelectorContainer className={className}>
      {colors.map(item => {
        const color = getColor(item);
        const hexes = color.split("/");
        const colorDisplay = hexes[0];

        const isSelected =
          color === getColor(colorSelected) ||
          !!listColorSelected.find(item => getColor(item) === color);

        return (
          <ColorBlock
            onClick={() => wrapperOnChange(item, isSelected)}
            key={color}
            style={{ background: colorDisplay }}
          >
            {hexes.length === 2 && (
              <SubColorBlock style={{ background: hexes[1] }} />
            )}
            {isSelected && <TickIcon className="z-10" />}
            {color === "NONE" && <NoneColorIcon />}
          </ColorBlock>
        );
      })}
    </ColorSelectorContainer>
  );
};

export default ColorSelector;
