import { useDispatch } from "react-redux";
import { MainContainer, Heading, Body, Items } from "./styles";
import ListStore from "./ListStore";
import { Wrapper, Container } from "designs/PageLayout";
import Button from "designs/Button";
import SVG from "designs/SVG";
import { nextStepStore } from "redux/actions/store";

interface IMainProps {}

interface IData {
  step: number;
  title: string;
  listMethod?: string[];
  image?: string;
  button: string;
}
const Main: React.FC<IMainProps> = props => {
  const dispatch = useDispatch();
  const onHandle = (value: IData) => {
    dispatch(nextStepStore(value.step, null));
  };
  return (
    <Wrapper>
      <Container>
        <MainContainer>
          <ListStore />
          <Heading.Wrapper>
            {/* <Heading.Title>
            Connect to your online store or create one to begin adding products
          </Heading.Title>   // List store
          <Heading.Desc>Pick a platform for your store</Heading.Desc> */}
            <Heading.Detail>
              To create a new store, choose your method
            </Heading.Detail>
          </Heading.Wrapper>
          <Body>
            {listData.map((values, index) => {
              return <Item {...values} onClick={onHandle} key={index} />;
            })}
          </Body>
        </MainContainer>
      </Container>
    </Wrapper>
  );
};

const listData: IData[] = [
  {
    step: 2,
    title: "Choose your store’s platform",
    listMethod: [
      "store/esty",
      "store/ebay",
      "store/wix",
      "store/mage",
      "store/amazone",
      "store/w",
      "store/woo",
    ],
    button: "Choose Platform",
  },
  {
    step: 3,
    title: "Use Shipstation to connect to",
    listMethod: [
      "store/esty",
      "store/ebay",
      "store/wix",
      "store/mage",
      "store/amazone",
      "store/w",
      "store/woo",
    ],
    button: "Choose ShipStation",
  },
  {
    step: 4,
    title: "Manual order platform/API",
    image: "store/setting",
    button: "Create",
  },
];

export default Main;

interface ITemProps extends IData {
  onClick?: (value: IData) => void;
}
export const Item: React.FC<ITemProps> = ({ onClick, ...rest }) => {
  const onHanleClick = (rest: IData) => {
    onClick && onClick(rest);
  };
  return (
    <div className="desktop:w-1/3 w-full cursor-pointer p-1">
      <Items.Wrapper>
        <Items.Title>{rest.title}</Items.Title>
        <Items.Content>
          {rest.listMethod && rest.listMethod.length > 0 ? (
            rest.listMethod.map((value, index) => {
              return <SVG name={value} key={index} />;
            })
          ) : rest.image ? (
            <SVG name={rest.image} width={120} height={120} />
          ) : null}
        </Items.Content>
        <Button onClick={e => onHanleClick(rest)} size="lg">
          {rest.button}
        </Button>
      </Items.Wrapper>
    </div>
  );
};
