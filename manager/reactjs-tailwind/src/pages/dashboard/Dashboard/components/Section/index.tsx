import { SSection } from "./styles";

const Section: React.FC<{ title: string; subTitle?: string }> = ({
  title,
  subTitle,
  children,
}) => {
  return (
    <SSection.Container>
      <SSection.Title>{title}</SSection.Title>
      {subTitle && <SSection.SubTitle>{subTitle}</SSection.SubTitle>}
      <SSection.Content>{children}</SSection.Content>
    </SSection.Container>
  );
};

export default Section;
