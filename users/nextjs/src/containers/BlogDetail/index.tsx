import Content from "./components/Content";
import PostSide from "./components/PostSide";
import {
  BlogDetailContainer,
  Container,
  ContentWrapper,
  PostSideWrapper,
} from "./styles";

interface IBlogDetail {}

const BlogDetail: React.FC<IBlogDetail> = (props) => {
  return (
    <BlogDetailContainer className="wrapper">
      <Container className="container">
        <ContentWrapper>
          <Content />
        </ContentWrapper>
        <PostSideWrapper>
          <PostSide />
        </PostSideWrapper>
      </Container>
    </BlogDetailContainer>
  );
};

export default BlogDetail;
