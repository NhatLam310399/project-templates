import { useState } from "react";
import { AddContainer, Heading, Body, Wallet, Inputs } from "./styles";
import Form from "./Form";
import { Wrapper } from "designs/Wrapper";

interface IAddProps {}

const Add: React.FC<IAddProps> = props => {
  const [amount, setAmount] = useState<number>(0);

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    parseFloat(e.target.value) < 0
      ? null
      : setAmount(parseFloat(e.target.value));
  };
  return (
    <Wrapper>
      <AddContainer>
        <Heading.Wrapper>
          <Heading.detail>
            Kingify Wallets {">"}{" "}
            <span className="text-neutral-1">Kingify USD Wallet</span>
          </Heading.detail>
          <Heading.Title>Billing: Kingify USD Wallet</Heading.Title>
        </Heading.Wrapper>
        <Body>
          <Wallet.Wrapper>
            <Wallet.Title>USD Wallet</Wallet.Title>
            <Wallet.Process>Add money</Wallet.Process>
            <Wallet.Desc>Amount</Wallet.Desc>
            <Wallet.Amount>
              <Wallet.Prefix>USD</Wallet.Prefix>
              <Inputs
                type="number"
                placeholder="Add value"
                min={0}
                onChange={onChangeAmount}
                value={amount}
              />
            </Wallet.Amount>
            <Wallet.FormContainer>
              {amount > 0 ? <Form /> : null}
            </Wallet.FormContainer>
          </Wallet.Wrapper>
        </Body>
      </AddContainer>
    </Wrapper>
  );
};

export default Add;
