import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToolbarContainer, ListTabs, TabItem, Shadow } from "./styles";
import ColorIcon from "./ColorIcon";
import { useActiveObject } from "hooks/useActiveObject";
import { IControllerTabType, IRootState } from "typings";
import { changeControllerTab } from "redux/actions/editorController";
import {
  TransformIcon,
  CropIcon,
  PositionIcon,
  ShadowIcon,
  OutlineIcon,
  WriteTextIcon,
  FontIcon,
} from "icons/toolbar";
import { useCurrentCanvas } from "hooks/useCurrentCanvas";

interface IToolbarProps {}

type IToolbarItem = {
  name: string;
  tab: IControllerTabType;
  Icon: ReactNode;
};

const tools: {
  [key in IControllerTabType]?: IToolbarItem;
} = {
  COLOR: {
    name: "Color",
    tab: "COLOR",
    Icon: <ColorIcon />,
  },
  TRANSFORM: {
    name: "Transform",
    tab: "TRANSFORM",
    Icon: <TransformIcon />,
  },
  CROP: {
    name: "Crop",
    tab: "CROP",
    Icon: <CropIcon />,
  },
  POSITION: {
    name: "Position",
    tab: "POSITION",
    Icon: <PositionIcon />,
  },
  WRITE_TEXT: {
    name: "Text",
    tab: "WRITE_TEXT",
    Icon: <WriteTextIcon />,
  },
  FONT: {
    name: "Font",
    tab: "FONT",
    Icon: <FontIcon />,
  },
  OUTLINE: {
    name: "Outline",
    tab: "OUTLINE",
    Icon: <OutlineIcon />,
  },
  SHADOW: {
    name: "Shadow",
    tab: "SHADOW",
    Icon: <ShadowIcon />,
  },
};

const vectorToolbar: (IToolbarItem | undefined)[] = [
  tools.COLOR,
  tools.TRANSFORM,
  tools.POSITION,
];

const imageToolbar: (IToolbarItem | undefined)[] = [
  tools.TRANSFORM,
  tools.POSITION,
  tools.CROP,
];

const textToolbar: (IToolbarItem | undefined)[] = [
  tools.WRITE_TEXT,
  tools.COLOR,
  tools.FONT,
  tools.TRANSFORM,
  tools.POSITION,
  tools.OUTLINE,
  tools.SHADOW,
];

const Toolbar: React.FC<IToolbarProps> = props => {
  const dispatch = useDispatch();
  const activeObject = useActiveObject();
  const canvas = useCurrentCanvas();
  const { currentTab } = useSelector(
    (state: IRootState) => state.editorController,
  );
  const [toolbar, setToolbar] = useState<(IToolbarItem | undefined)[]>([]);

  useEffect(() => {
    if (!canvas) return;
    canvas.on("mouse:up", () => {
      const activeObject = canvas.getActiveObject();
      if (!activeObject) {
        setToolbar([]);
        dispatch(changeControllerTab("MENU"));
      }
    });
  }, [canvas]);

  useEffect(() => {
    if (!activeObject) return;

    switch (activeObject.typeObject) {
      case "VECTOR":
        setToolbar(vectorToolbar);
        break;
      case "IMAGE":
        setToolbar(imageToolbar);
        break;
      case "TEXT":
        setToolbar(textToolbar);
        break;
    }
  }, [activeObject]);

  return (
    <ToolbarContainer>
      {
        <ListTabs>
          {toolbar.map(item => {
            if (item?.tab === "COLOR" && activeObject?.isStaticColor)
              return null;
            return (
              <TabItem
                active={currentTab === item?.tab}
                onClick={() => dispatch(changeControllerTab(item?.tab as any))}
              >
                {item?.Icon}
                {item?.name}
              </TabItem>
            );
          })}
        </ListTabs>
      }
      <Shadow />
    </ToolbarContainer>
  );
};

export default Toolbar;
