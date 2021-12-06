import { IShortcut } from "typings";
import { ItemContainer, Heading, Content, Other, Point } from "./styles";
import SVG from "designs/SVG";

interface IShortcutProps {
  shortcut: IShortcut;
}

const Shortcut: React.FC<IShortcutProps> = ({ shortcut }) => {
  const { icon, name = "", content = "" } = shortcut;
  return (
    <ItemContainer>
      <Content>
        <SVG name={icon?.default || ""} />
        <Other.Container>
          <Other.Title>{name}</Other.Title>
          <Other.Desc>{content}</Other.Desc>
        </Other.Container>
      </Content>
    </ItemContainer>
  );
};

export default Shortcut;
