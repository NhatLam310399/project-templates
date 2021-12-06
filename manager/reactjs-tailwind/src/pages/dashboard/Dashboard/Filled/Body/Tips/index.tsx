import { TipsContainer, ItemTips, Title } from "./styles";
import SVG from "designs/SVG";
interface ITipsProps {}

const Tips: React.FC<ITipsProps> = props => {
  return (
    <TipsContainer>
      {listTips.map((value, index) => {
        return (
          <ItemTips>
            <Title>{value}</Title>
            <SVG name="dashboard/arrowright" />
          </ItemTips>
        );
      })}
    </TipsContainer>
  );
};

const listTips: string[] = [
  "5 Most Common Mistakes Kingify Customers Make",
  "10 Things You Don’t Know Kingify Mockup Could Do",
  "Everything You Need to Know to Prepare The Perfect...",
  "Top 10 Trending Product in 2021",
  "Top 10 Selling Product in 2020",
];
export default Tips;
