import TopFooter from "./components/TopFooter";
import BottomFooter from "./components/BottomFooter";
import { Container, Wrapper } from "./styles";

const FooterUser: React.FC = () => {
  return (
    <Wrapper>
      <Container className="container">
        <TopFooter />
      </Container>
      <BottomFooter />
    </Wrapper>
  );
};

export default FooterUser;
