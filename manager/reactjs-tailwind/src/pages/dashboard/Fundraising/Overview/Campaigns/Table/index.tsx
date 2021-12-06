import { TableContainer, Heading, Status, Body, Grid, Items } from "./styles";
import SVG from "designs/SVG";
import SearchBox from "components/SearchBoxHelp";
import Img from "assets/images/fundraising/product.png";
import Button from "designs/Button";

interface IData {
  image: string;
  sold: number;
  name: string;
  raise: number;
  day: number;
}
interface ITableProps {}

const Table: React.FC<ITableProps> = props => {
  return (
    <TableContainer>
      <div className="w-1440[px]">
        <Heading.Wrapper>
          <Heading.Content>
            <Heading.Title>View</Heading.Title>
            <Heading.IconWrappre>
              <SVG name="fundraising/grid" width={32} height={32} />
              <SVG name="fundraising/list" width={32} height={32} />
            </Heading.IconWrappre>
          </Heading.Content>
          <Heading.Content>
            <Heading.Title>Status</Heading.Title>
            <Heading.IconWrappre>
              <Status.Wrapper>
                <Status.Title>All</Status.Title>
                <Status.Number active={true}>1</Status.Number>
              </Status.Wrapper>
              <Status.Wrapper>
                <Status.Title>Craft</Status.Title>
                <Status.Number>1</Status.Number>
              </Status.Wrapper>
              <Status.Wrapper>
                <Status.Title>Live</Status.Title>
                <Status.Number>1</Status.Number>
              </Status.Wrapper>
              <Status.Wrapper>
                <Status.Title>Close</Status.Title>
                <Status.Number>1</Status.Number>
              </Status.Wrapper>
            </Heading.IconWrappre>
          </Heading.Content>
          <SearchBox />
        </Heading.Wrapper>
      </div>
      <Body>
        <Grid.Row>
          {listData.map((value, index) => {
            return (
              <Grid.Col key={index}>
                <Item {...value} />
              </Grid.Col>
            );
          })}
        </Grid.Row>
      </Body>
    </TableContainer>
  );
};

const listData: IData[] = [
  {
    image: Img,
    sold: 0,
    name: "Unnamed Campaign",
    day: 0,
    raise: 0,
  },
  {
    image: Img,
    sold: 0,
    name: "Unnamed Campaign",
    day: 0,
    raise: 0,
  },
  {
    image: Img,
    sold: 0,
    name: "Unnamed Campaign",
    day: 0,
    raise: 0,
  },
];

export default Table;

const Item: React.FC<{
  image: string;
  name: string;
  sold: number;
  raise: number;
  day: number;
  onDelete?: (value: any) => void;
  onComplete?: (value: any) => void;
}> = ({ image, name, sold, raise, day, onDelete, onComplete }) => {
  const onClickDelete = () => {};
  const onClckComplete = () => {};
  return (
    <Items.Wrapper>
      <img src={image} className="w-full " />
      <div className="p-2">
        <Items.Name>{name}</Items.Name>
        <Items.Content>
          <Items.Box>
            <Items.Number>{sold}</Items.Number>
            <Items.Desc>Sold</Items.Desc>
          </Items.Box>
          <Items.Box>
            <Items.Number>{raise}</Items.Number>
            <Items.Desc>raise</Items.Desc>
          </Items.Box>
          <Items.Box>
            <Items.Number>{day}</Items.Number>
            <Items.Desc>Day lefts</Items.Desc>
          </Items.Box>
        </Items.Content>
        <div className="pt-2 flex justify-end gap-1">
          <Button variant="secondary" onClick={onClickDelete}>
            Delete
          </Button>
          <Button onClick={onClckComplete}>Compelete</Button>
        </div>
      </div>
      <Items.Draft>Draft</Items.Draft>
    </Items.Wrapper>
  );
};
