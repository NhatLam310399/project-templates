import { AddMethodContainer, Heading, Body } from "./styles";

import Form from "./Form";
interface IAddMethodProps {}

const AddMethod: React.FC<IAddMethodProps> = props => {
  return (
    <AddMethodContainer>
      <Heading.Wrapper>
        <Heading.Title>Billing: Add new billing method</Heading.Title>
      </Heading.Wrapper>
      <Body>
        <Form />
      </Body>
    </AddMethodContainer>
  );
};

export default AddMethod;
