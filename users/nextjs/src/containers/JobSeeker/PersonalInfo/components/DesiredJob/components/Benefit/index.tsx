import { SVG } from "@designs/SVG";
import { ICustomSizeImages } from "@common/typings";
import { Container, Text } from "./styles";

interface IBenefitProps {
  name: string;
  icon?: ICustomSizeImages;
  id?: string;
  onClick?: (id: string) => void;
  enabled?: boolean;
}

const Benefit: React.FC<IBenefitProps> = (props) => {
  const { name, icon, onClick, enabled, id } = props;

  const handleClick = () => {
    !!onClick && onClick(id);
  };

  return (
    <Container onClick={handleClick} enabled={enabled}>
      <SVG src={icon.small} className="w-3.5 h-3.5" />
      <Text>{name}</Text>
    </Container>
  );
};

export default Benefit;
