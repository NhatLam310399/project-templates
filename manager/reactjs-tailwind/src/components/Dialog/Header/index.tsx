import { HeaderContainer, Title, IconButton } from "./styles";
import SVG from "designs/SVG";

interface IHeaderProps {
  title: string;
  onClose: () => void;
}

const DialogHeader: React.FC<IHeaderProps> = ({ title, onClose }) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <IconButton tooltip="Close" onClick={onClose}>
        {/* <SVG name="dialog/close" /> */}
      </IconButton>
    </HeaderContainer>
  );
};

export default DialogHeader;
