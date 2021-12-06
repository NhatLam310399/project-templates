import { IArticle } from "typings";
import { ContentContainer, Title, Body } from "./styles";

interface IContentProps {
  currentArticle: IArticle;
}

const Content: React.FC<IContentProps> = ({ currentArticle }) => {
  return (
    <ContentContainer>
      <Title>{currentArticle.title}</Title>
      <Body>{currentArticle.content}</Body>
    </ContentContainer>
  );
};

export default Content;
