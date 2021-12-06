import { IBenefitBanner } from "@common/typings/Benefit";
import { ItemContainer, ItemContent, ItemTitle, ListWrapper } from "./style";

interface IProps {
  data: IBenefitBanner[];
}

const ListContent: React.FC<IProps> = (props) => {
  const { data } = props;
  return (
    <ListWrapper>
      {data.map((item, index) => {
        return (
          <ItemContainer key={index}>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemContent>{item.content}</ItemContent>
          </ItemContainer>
        );
      })}
    </ListWrapper>
  );
};

export default ListContent;
