import { GlanceContainer, Title, Grid, Body, Items } from "./styles";
import SVG from "designs/SVG";

interface IData {
  image: string;
  quantity: number;
  today: number;
}
interface IGlanceProps {}

const Glance: React.FC<IGlanceProps> = props => {
  return (
    <GlanceContainer>
      <Title>At A Glance </Title>
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
    </GlanceContainer>
  );
};

const listData: IData[] = [
  {
    image: "fundraising/shirt",
    quantity: 0,
    today: 0,
  },
  {
    image: "fundraising/setting",
    quantity: 0,
    today: 0,
  },
  {
    image: "fundraising/pig",
    quantity: 0,
    today: 0,
  },
];

export default Glance;

const Item: React.FC<{
  image: string;
  quantity: number;
  today: number;
}> = ({ image, quantity, today }) => {
  return (
    <Items.Wrapper>
      <SVG name={image} width={52} height={52} />
      <div>
        <Items.Quantity>{quantity}</Items.Quantity>
        <Items.Desc>Item Solds</Items.Desc>
        <Items.Desc>
          Today <Items.Number>{today}</Items.Number>
        </Items.Desc>
      </div>
    </Items.Wrapper>
  );
};
