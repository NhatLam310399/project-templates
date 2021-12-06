import { TextSelectorLayoutContainer, Label, Content } from "./styles";

interface ITextSelectorProps {
  label: string;
}

const TextSelectorLayout: React.FC<ITextSelectorProps> = ({
  label,
  children,
}) => {
  return (
    <TextSelectorLayoutContainer>
      <Label>{label}</Label>
      <Content>{children}</Content>
    </TextSelectorLayoutContainer>
  );
};

export default TextSelectorLayout;
