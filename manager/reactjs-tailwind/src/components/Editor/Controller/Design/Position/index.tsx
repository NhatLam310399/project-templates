import { useSelector } from "react-redux";
import { PositionContainer, Label, ListButtons, Button } from "./styles";
import { BackToMenu } from "layouts/Editor/TabComponents";
import { useActiveObject } from "hooks/useActiveObject";
import Tooltip from "designs/Tooltip";
import SVG from "designs/SVG";
import { useCurrentCanvas } from "hooks/useCurrentCanvas";
import { IRootState } from "typings";

interface IPositionProps {}

type IAlignType =
  | "CENTER_VERTICAL"
  | "CENTER_HORIZON"
  | "LEFT"
  | "RIGHT"
  | "TOP"
  | "BOTTOM";

type IAlignButton = {
  name: string;
  svgName: string;
  type: IAlignType;
};

const alignButtons: IAlignButton[] = [
  {
    name: "Center vertically",
    svgName: "editor/align/center-y",
    type: "CENTER_VERTICAL",
  },
  {
    name: "Center horizontally",
    svgName: "editor/align/center-x",
    type: "CENTER_HORIZON",
  },
  {
    name: "Left",
    svgName: "editor/align/left",
    type: "LEFT",
  },
  {
    name: "Right",
    svgName: "editor/align/right",
    type: "RIGHT",
  },
  {
    name: "Top",
    svgName: "editor/align/top",
    type: "TOP",
  },
  {
    name: "Bottom",
    svgName: "editor/align/bottom",
    type: "BOTTOM",
  },
];

const Position: React.FC<IPositionProps> = props => {
  const activeObj = useActiveObject();
  const { clipPath } = useSelector((state: IRootState) => state.editor);
  const canvas = useCurrentCanvas();

  const handleClick = (type: IAlignType) => {
    const cp: Required<fabric.Rect> = clipPath as any;
    const ao: Required<fabric.Object> = activeObj as any;

    if (!canvas || !cp || !ao) return;

    switch (type) {
      case "LEFT":
        ao.set({
          left: cp.left,
        });
        break;
      case "RIGHT":
        ao.set({
          left: cp.left + cp.width - ao.width * ao.scaleX,
        });
        break;
      case "TOP":
        ao.set({
          top: cp.top,
        });
        break;
      case "BOTTOM":
        ao.set({
          top: cp.top + cp.height - ao.height * ao.scaleY,
        });
        break;
      case "CENTER_VERTICAL":
        ao.set({
          left: cp.left + cp.width / 2 - (ao.width * ao.scaleX) / 2,
        });
        break;
      case "CENTER_HORIZON":
        ao.set({
          top: cp.top + cp.height / 2 - (ao.height * ao.scaleY) / 2,
        });
        break;
    }

    canvas?.renderAll();
  };

  return (
    <PositionContainer>
      <BackToMenu />
      <Label>Align</Label>
      <ListButtons>
        {alignButtons.map(({ name, svgName, type }) => (
          <Tooltip text={name}>
            <Button onClick={() => handleClick(type)}>
              <SVG name={svgName} />
            </Button>
          </Tooltip>
        ))}
      </ListButtons>
    </PositionContainer>
  );
};

export default Position;
