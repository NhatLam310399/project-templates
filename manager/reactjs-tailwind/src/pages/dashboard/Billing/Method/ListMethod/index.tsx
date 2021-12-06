import { useDispatch } from "react-redux";
import { ListMethodContainer, Heading, Body } from "./styles";

import Empty from "./Empty";
import Store from "./Store";
import BillMethod from "./BillMethod";
import Button from "designs/Button";
import { Wrapper } from "designs/Wrapper";

import { nextStepBillingMethod } from "redux/actions/billingMethod";

interface IListMethodProps {}

const ListMethod: React.FC<IListMethodProps> = props => {
  const dispatch = useDispatch();

  const onClickAddMethod = () => {
    dispatch(nextStepBillingMethod());
  };
  return (
    <ListMethodContainer>
      <Heading.Wrapper>
        <Heading.Title>Billing: Billing methods</Heading.Title>
        <Button onClick={onClickAddMethod}>Add billing method</Button>{" "}
        {/* enable bill Method*/}
      </Heading.Wrapper>
      <Body>
        {/* <Empty /> */}
        <BillMethod /> {/*BillMethod or Empty*/}
        <Store />
      </Body>
    </ListMethodContainer>
  );
};

export default ListMethod;
