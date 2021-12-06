import { useDispatch } from "react-redux";
import { tabButtons } from "..";
import { MenuContainer, Row, MenuItem } from "./styles";
import AllLayers from "./AllLayers";
import { IControllerTabType } from "typings";
import { changeControllerTab } from "redux/actions/editorController";
import SVG from "designs/SVG";

interface IMenuProps {}

const Menu: React.FC<IMenuProps> = () => {
  const dispatch = useDispatch();

  const handleChangeTab = (type: IControllerTabType) => {
    dispatch(changeControllerTab(type));
  };

  return (
    <>
      <MenuContainer>
        <Row>
          {tabButtons.slice(0, 3).map(({ name, type, svgName }) => (
            <MenuItem
              key={type}
              className="w-1/3 "
              onClick={() => handleChangeTab(type)}
            >
              <SVG name={svgName} className="opacity-60" />
              {name}
            </MenuItem>
          ))}
        </Row>
        <Row>
          {tabButtons.slice(3, 5).map(({ name, type, svgName }) => (
            <MenuItem
              key={type}
              className="w-1/2"
              onClick={() => handleChangeTab(type)}
            >
              <SVG name={svgName} className="opacity-60" />
              {name}
            </MenuItem>
          ))}
        </Row>
      </MenuContainer>
      <AllLayers />
    </>
  );
};

export default Menu;
