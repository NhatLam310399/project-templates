import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { ListMethodContainer, Heading, Body, Items } from "./styles";
import { Wrapper } from "designs/Wrapper";
import Button from "designs/Button";
import SVG from "designs/SVG";
import Select from "designs/Select";
import { nextStepBillingWallet } from "redux/actions/billingWallet";

interface IListWalletProps {}

export interface IBillWallet {
  image: string;
  kingifyWallet: string;
  yourBalance: number;
  autoRecharge: string;
}

const ListWallet: React.FC<IListWalletProps> = props => {
  const dispatch = useDispatch();

  const onClickAddMethod = (value: IBillWallet) => {
    dispatch(nextStepBillingWallet());
  };
  return (
    <Wrapper>
      <ListMethodContainer>
        <Heading.Wrapper>
          <Heading.Title>Billing: Kingify Wallet</Heading.Title>
          <Heading.Desc>
            Each Wallet can only be used to pay orders in the same currency (eg.
            you can not pay for an order in EUR from your USD Wallet. Ans it’s
            not possible to transfer money from one Wallet to another.
          </Heading.Desc>
        </Heading.Wrapper>
        <Body>
          {listWallet.map((value, index) => {
            return <Item {...value} onAdd={onClickAddMethod} />;
          })}
          ;
        </Body>
      </ListMethodContainer>
    </Wrapper>
  );
};

const listWallet: IBillWallet[] = [
  {
    image: "billing/wallet2",
    kingifyWallet: "USD",
    yourBalance: 9.16,
    autoRecharge: "Off",
  },
  {
    image: "billing/wallet2",
    kingifyWallet: "EUR",
    yourBalance: 9.16,
    autoRecharge: "Off",
  },
  {
    image: "billing/wallet2",
    kingifyWallet: "JPY",
    yourBalance: 9.16,
    autoRecharge: "Off",
  },
];
export default ListWallet;

interface IBillItem extends IBillWallet {
  onAdd: (value: IBillWallet) => void;
}
const Item: React.FC<IBillItem> = ({ onAdd, ...rest }) => {
  const onHanleClickAdd = (values: IBillWallet) => {
    onAdd(values);
  };
  return (
    <Items.Wrapper>
      <Items.Content>
        <SVG name={rest.image} width={60} height={60} />
        <Items.HeadingWrapper>
          <Items.Title>Kingify Wallet</Items.Title>
          <Items.Desc>{rest.kingifyWallet}</Items.Desc>
        </Items.HeadingWrapper>
        <Items.HeadingWrapper>
          <Items.Title>Your balance</Items.Title>
          <Items.Desc>${rest.yourBalance}</Items.Desc>
        </Items.HeadingWrapper>
        <Items.HeadingWrapper>
          <Items.Title>Auto recharge</Items.Title>
          <Items.Desc>{rest.autoRecharge}</Items.Desc>
        </Items.HeadingWrapper>
      </Items.Content>
      <Items.Content>
        <Button variant="secondary">Windraw</Button>
        <Button variant="primary" onClick={e => onHanleClickAdd(rest)}>
          Add money
        </Button>
      </Items.Content>
    </Items.Wrapper>
  );
};
