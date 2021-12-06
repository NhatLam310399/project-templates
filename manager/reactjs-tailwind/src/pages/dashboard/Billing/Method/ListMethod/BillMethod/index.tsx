import React from "react";

import Table from "./Table";
import { BillMethodContainer, Items } from "./styles";
import SVG from "designs/SVG";

export interface IBillMethod {
  image: string;
  account: {
    stk: string;
    expire: string;
  };
  currency: string;
  address: string;
  done: boolean;
}

interface IBillMethodProps {}

const BillMethod: React.FC<IBillMethodProps> = props => {
  const onDelete = (value: IBillMethod) => {
    console.log(value);
  };
  const renderElement = (listMethod: IBillMethod[]) => {
    let result: JSX.Element[] = [];
    result = listMethod.map((value, index) => {
      return <Item {...value} onDelete={onDelete} />;
    });
    return result;
  };
  return (
    <BillMethodContainer>
      <Table
        title="Primary account billing method"
        desc="This is the primary billing methods for your Kingify account. It’ll be the default we use to charge you for the fututre transaction."
        render={renderElement}
        value={listPrimaryMethod}
      />
      <Table
        title="All other billing methods"
        desc="There are all of the billing methods you have added."
        render={renderElement}
        value={listOrtherMethod}
      />
    </BillMethodContainer>
  );
};

const listPrimaryMethod: IBillMethod[] = [
  {
    image: "billing/visa",
    account: {
      stk: "411111********1111",
      expire: "11/2022",
    },
    currency: "Multicurrency",
    address: "4140 Parker Rd. Allentown, New Mexico 31134",
    done: false,
  },
];

const listOrtherMethod: IBillMethod[] = [
  {
    image: "billing/visa",
    account: {
      stk: "411111********1111",
      expire: "11/2022",
    },
    currency: "Multicurrency",
    address: "4140 Parker Rd. Allentown, New Mexico 31134",
    done: true,
  },
  {
    image: "billing/paypal",
    account: {
      stk: "411111********1111",
      expire: "11/2022",
    },
    currency: "Multicurrency",
    address: "4140 Parker Rd. Allentown, New Mexico 31134",
    done: true,
  },
  {
    image: "billing/master",
    account: {
      stk: "411111********1111",
      expire: "11/2022",
    },
    currency: "Multicurrency",
    address: "4140 Parker Rd. Allentown, New Mexico 31134",
    done: true,
  },
];
export default BillMethod;

interface IBillItem extends IBillMethod {
  onDelete: (value: IBillMethod) => void;
}
const Item: React.FC<IBillItem> = ({ onDelete, ...rest }) => {
  const onHanleClickDelete = (values: IBillMethod) => {
    onDelete(values);
  };
  return (
    <Items.Wrapper>
      <Items.Content>
        <SVG name={rest.image} width={60} height={60} />
        <Items.HeadingWrapper>
          <Items.Title>{rest.account.stk}</Items.Title>
          <Items.Desc>Expires {rest.account.expire}</Items.Desc>
        </Items.HeadingWrapper>
        <Items.HeadingWrapper>
          <Items.Title>Currency</Items.Title>
          <Items.Desc>{rest.currency}</Items.Desc>
        </Items.HeadingWrapper>
      </Items.Content>
      <Items.Content>
        <Items.HeadingWrapper>
          <Items.Title>Billing address</Items.Title>
          <Items.Desc>{rest.address}</Items.Desc>
        </Items.HeadingWrapper>
      </Items.Content>
      <Items.Content>
        {rest.done ? (
          <SVG name="billing/done" className="cursor-pointer" />
        ) : null}
        <div onClick={e => onHanleClickDelete(rest)}>
          <SVG name="billing/remove" className="cursor-pointer" />
        </div>
      </Items.Content>
    </Items.Wrapper>
  );
};
