import { FundraisingContainer } from "./styles";

import Support from "./Support";
import Glance from "./Glance";
import Campaigns from "./Campaigns";
import { Wrapper, Container } from "designs/PageLayout";
interface IFundraisingProps {}

const Fundraising: React.FC<IFundraisingProps> = props => {
  return (
    <Wrapper>
      <Container>
        <FundraisingContainer>
          <Glance />
          <Support />
          <Campaigns />
        </FundraisingContainer>
      </Container>
    </Wrapper>
  );
};

export default Fundraising;
