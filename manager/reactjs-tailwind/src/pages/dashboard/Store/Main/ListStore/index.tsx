import { useDispatch } from "react-redux";
import { StoreContainer, Items, Title, Body } from "./styles";
import SVG from "designs/SVG";
import Button from "designs/Button";
import { nextStepStore } from "redux/actions/store";

interface IStoreProps {}
interface IData {
  image: string;
  name: string;
  status: number; // 0 limited , 1 active , 2 Erorr,
}
const Store: React.FC<IStoreProps> = props => {
  const dispatch = useDispatch();
  const onClickView = (value: IData) => {
    dispatch(nextStepStore(3, value));
  };
  const onClickAdd = () => {};
  const onCompare = () => {};
  return (
    <StoreContainer>
      <Title>Stores</Title>
      <Body>
        {listData.map((value, index) => {
          return (
            <Item
              {...value}
              key={index}
              onViewStore={onClickView}
              onAdd={onClickAdd}
            />
          );
        })}
        <Items.Wrapper className="cursor-pointer" onClick={onCompare}>
          <Items.Content>
            <SVG name="store/plus" className="w-3 h-3" />
            <div className="flex flex-col gap-1">
              <p className="font-medium text-lg text-neutral-1">
                Want to increase your sales with Prinful?
              </p>
              <p className="font-normal text-xl text-neutral-1">
                Reach more customers by selling on an additional platform today!
              </p>
            </div>
          </Items.Content>
          <Items.ContentButton>
            <Button>Compare platform</Button>
          </Items.ContentButton>
        </Items.Wrapper>
      </Body>
    </StoreContainer>
  );
};

const listData: IData[] = [
  {
    image: "store/amazone",
    name: "Kingify",
    status: 0,
  },
  {
    image: "store/amazone",
    name: "Kingify",
    status: 0,
  },
  {
    image: "store/amazone",
    name: "NGUYEN's Store",
    status: 1,
  },
  {
    image: "store/woo",
    name: "PODE Shop",
    status: 2,
  },
];
export default Store;

interface ITemProps extends IData {
  onAdd?: () => void;
  onViewStore: (value: IData) => void;
}
export const Item: React.FC<ITemProps> = ({ onAdd, onViewStore, ...rest }) => {
  const onClickAdd = () => {
    onAdd && onAdd();
  };
  const onClickViewStore = (value: IData) => {
    onViewStore && onViewStore(value);
  };
  return (
    <Items.Wrapper>
      <Items.Content>
        <SVG name={rest.image} className="h-5 w-5" />
        <Items.Title>{rest.name}</Items.Title>
        <Items.Status status={rest.status}>
          {rest.status === 0 ? "Limited" : ""}
          {rest.status === 1 ? "Active" : ""}
          {rest.status === 2 ? "Error" : ""}
        </Items.Status>
      </Items.Content>
      <Items.ContentButton>
        <Button
          variant="secondary"
          onClick={onClickAdd}
          disabled={rest.status === 1 ? false : true}
        >
          <div className="flex items-center gap-1">
            <SVG name="store/add" />
            Add product
          </div>
        </Button>
        <Button onClick={e => onClickViewStore(rest)}>View store</Button>
      </Items.ContentButton>
    </Items.Wrapper>
  );
};
