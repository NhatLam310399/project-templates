import { lazy, ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import Menu from "./Menu";
import { DesignContainer } from "./styles";
import { IControllerTabType, IRootState } from "typings";
import ErrorBoundary from "components/ErrorBoundary";

const Upload = lazy(() => import("./Upload"));
const WriteText = lazy(() => import("./WriteText"));
const QuickDesign = lazy(() => import("./QuickDesign"));
const AddClipart = lazy(() => import("./AddClipart"));
const PremiumImages = lazy(() => import("./PremiumImages"));
const Color = lazy(() => import("./Color"));
const Position = lazy(() => import("./Position"));
const Transform = lazy(() => import("./Transform"));
const Font = lazy(() => import("./Font"));
const Outline = lazy(() => import("./Outline"));
const Shadow = lazy(() => import("./Shadow"));

interface IDesignProps {}

type ITab = {
  type: IControllerTabType;
  name: string;
  Component: ReactNode | null;
};

export const tabButtons: (ITab & {
  svgName: string;
})[] = [
  {
    type: "UPLOAD",
    name: "Choose file",
    svgName: "editor/upload",
    Component: <Upload />,
  },
  {
    type: "WRITE_TEXT",
    name: "Add text",
    svgName: "editor/add-text",
    Component: <WriteText />,
  },
  {
    type: "ADD_CLIPART",
    name: "Add clipart",
    svgName: "editor/add-clipart",
    Component: <AddClipart />,
  },
  {
    type: "ADD_QUICK_DESIGN",
    name: "Add quick design",
    svgName: "editor/add-quick-design",
    Component: <QuickDesign />,
  },
  {
    type: "PREMIUM_IMAGES",
    name: "Premium images",
    svgName: "editor/premium-images",
    Component: <PremiumImages />,
  },
];

const tabs: ITab[] = [
  ...tabButtons,
  {
    type: "MENU",
    name: "Menu",
    Component: <Menu />,
  },
  {
    type: "COLOR",
    name: "Color",
    Component: <Color />,
  },
  {
    type: "POSITION",
    name: "Position",
    Component: <Position />,
  },
  {
    type: "TRANSFORM",
    name: "Transform",
    Component: <Transform />,
  },
  {
    type: "WRITE_TEXT",
    name: "Text",
    Component: <WriteText />,
  },
  {
    type: "FONT",
    name: "Font",
    Component: <Font />,
  },
  {
    type: "OUTLINE",
    name: "Outline",
    Component: <Outline />,
  },
  {
    type: "SHADOW",
    name: "Shadow",
    Component: <Shadow />,
  },
];

const Design: React.FC<IDesignProps> = props => {
  const { currentTab } = useSelector(
    (state: IRootState) => state.editorController,
  );

  const Component: ReactNode = useMemo(
    () => tabs.find(({ type }) => currentTab === type)?.Component || <Menu />,
    [currentTab],
  );

  return (
    <DesignContainer>
      <ErrorBoundary>{Component}</ErrorBoundary>
    </DesignContainer>
  );
};

export default Design;
