import {
  OrderContainer,
  Heading,
  Tables,
  Title,
  ActionWrapper,
  Circle,
  DescWrapper,
} from "./styles";

import SVG from "designs/SVG";
interface IOrderProps {}

const Order: React.FC<IOrderProps> = props => {
  const handleOnClick = () => {};
  return (
    <OrderContainer>
      <Heading.Wrapper>
        <Heading.Title>Orders</Heading.Title>
        <Heading.Link>View all order</Heading.Link>
      </Heading.Wrapper>
      <Tables.Wrapper>
        <Tables.Container>
          <Tables.Thead>
            <Tables.Tr>
              <Tables.Th>
                <Title>Active</Title>
              </Tables.Th>
              <Tables.Th>
                <ActionWrapper>
                  <Circle>1</Circle>
                  <Title>Action Required</Title>
                </ActionWrapper>
              </Tables.Th>
              <Tables.Th />
            </Tables.Tr>
          </Tables.Thead>
          <Tables.Tbody>
            <Tables.Tr>
              <Tables.Td>No active order show</Tables.Td>
              <Tables.Td>Failed</Tables.Td>
              <Tables.Td>
                <DescWrapper onClick={handleOnClick}>
                  1
                  <SVG name="dashboard/right" height={10} width={10} />
                </DescWrapper>
              </Tables.Td>
            </Tables.Tr>
          </Tables.Tbody>
        </Tables.Container>
      </Tables.Wrapper>
    </OrderContainer>
  );
};

export default Order;
