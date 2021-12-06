import { ColorSelectorContainer, ColorBlock, SubColorBlock } from "./styles";

export type ISize = "md" | "sm";

type IListColorsProps<T> = {
  className?: string;
  colors: T[];
  // This will help us know what is hex or rgb string of each T
  // ex:  return "#000" | "rbg(0, 0, 0)"
  getColor: (option: T | undefined) => string | undefined;
  size?: ISize;
};

const ListColors = <T,>({
  colors,
  getColor,
  className = "",
  size = "md",
}: IListColorsProps<T>) => {
  return (
    <ColorSelectorContainer className={className}>
      {colors?.map(item => {
        const color = getColor(item);
        if (!color) return null;

        const hexes = color.split("/");
        const colorDisplay = hexes[0];

        return (
          <ColorBlock
            size={size}
            key={color}
            style={{ background: colorDisplay }}
          >
            {hexes.length === 2 && (
              <SubColorBlock style={{ background: hexes[1] }} />
            )}
          </ColorBlock>
        );
      })}
    </ColorSelectorContainer>
  );
};

export default ListColors;
