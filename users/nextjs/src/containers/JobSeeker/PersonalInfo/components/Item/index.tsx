import { Container, Content, Title, SubTitle, Text } from "./styles";

interface IITemProps {
  title: string;
  content: string;
  duration: string;
  description: string;
}

const Item: React.FC<IITemProps> = (props) => {
  const { title, content, duration, description } = props;

  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        <SubTitle>{content}</SubTitle>
        {duration && <Text>{duration}</Text>}
        {description && <Text>{description}</Text>}
      </Content>
    </Container>
  );
};

export default Item;
