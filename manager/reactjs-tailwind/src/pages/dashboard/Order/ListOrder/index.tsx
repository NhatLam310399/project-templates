import React from "react";

import { OrderContainer, OrderHeading, IconWrapper, IconText } from "./styles";
import ListTable from "./ListTable";
import { Title } from "designs/Title";
import { Wrapper } from "designs/PageLayout";
import SVG from "designs/SVG";

import { useRedirect } from "hooks/useRedirect";

const ListOrder: React.FC = () => {
  const redirect = useRedirect();
  const onClick = () => {
    redirect("/order/import");
  };
  return (
    <Wrapper>
      <OrderContainer>
        <OrderHeading>
          <Title>Orders</Title>
          <IconWrapper onClick={onClick}>
            <SVG name="order/import" />
            <IconText>Import Orders</IconText>
          </IconWrapper>
        </OrderHeading>
        <ListTable />
      </OrderContainer>
    </Wrapper>
  );
};

export default ListOrder;
