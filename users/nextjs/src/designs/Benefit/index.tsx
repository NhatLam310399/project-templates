import { BenefitContainer, Icon, Text } from "./styles";

interface IBenefitProps {
  urlImg?: string;
  text?: string;
}

const Benefit: React.FC<IBenefitProps> = ({ urlImg, text }) => {
  return (
    <BenefitContainer>
      {urlImg?.length > 0 && <Icon src={urlImg} alt={text} />}
      <Text>{text}</Text>
    </BenefitContainer>
  );
};

export default Benefit;
