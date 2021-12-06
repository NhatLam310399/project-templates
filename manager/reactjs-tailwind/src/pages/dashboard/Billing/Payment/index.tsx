import { PaymentContainer, Title, Body } from "./styles";

import Table from "./Table";
import Empty from "./Empty";
import { Wrapper, Container } from "designs/PageLayout";

interface IPaymentProps {}

const Payment: React.FC<IPaymentProps> = props => {
  return (
    <Wrapper>
      <Container>
        <PaymentContainer>
          <Title>Billing: Payments</Title>
        </PaymentContainer>
        <Body>
          <Table />
          {/* <Empty /> */}
        </Body>
      </Container>
    </Wrapper>
  );
};

export default Payment;
