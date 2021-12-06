import { EmptyContainer, Content, Title, Desc } from "./styles";
import Image from "designs/Image";
import ImageSrc from "assets/images/billing/empty.png";
import Button from "designs/Button";
interface IEmptyProps {}

const Empty: React.FC<IEmptyProps> = props => {
  return (
    <EmptyContainer>
      <Content>
        <Title>No payment has been made yet</Title>
        <Desc>
          All your transactions will appear here when you place an order.
        </Desc>
        <Button className="h-5">Order now</Button>
      </Content>
      <Image src={ImageSrc} className="w-32 h-27" />
    </EmptyContainer>
  );
};

export default Empty;
