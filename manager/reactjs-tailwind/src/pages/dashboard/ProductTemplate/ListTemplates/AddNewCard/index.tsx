import { AddNewCardContainer, Title, Message } from "./styles";
import SVG from "designs/SVG";

interface IAddNewCardProps {
  onClick?: () => void;
}

const AddNewCard: React.FC<IAddNewCardProps> = ({ onClick }) => {
  return (
    <AddNewCardContainer onClick={() => onClick && onClick()}>
      <SVG name="product-template/add" width={50} height={50} />
      <Title>
        Create your first <br />
        product template
      </Title>
      <Message>Add it to your store and publish online</Message>
    </AddNewCardContainer>
  );
};

export default AddNewCard;
