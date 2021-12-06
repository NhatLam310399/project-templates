import { EmptyContainer, Heading, ImageContainer, Orther } from "./styles";
import Image from "designs/Image";
import ImageSrc from "assets/images/billing/wallet-empty.png";
import Button from "designs/Button";

interface IEmptyProps {}

const Empty: React.FC<IEmptyProps> = props => {
  return (
    <EmptyContainer>
      <Heading.Wrapper>
        <Heading.Title>Primary account billing method</Heading.Title>
        <Heading.Desc>
          This is your Kingify account's preferred billing method. It'll be the
          default for future transactions.
        </Heading.Desc>
      </Heading.Wrapper>
      <ImageContainer>
        <Image src={ImageSrc} />
      </ImageContainer>
      <Orther.Wrapper>
        <Orther.Desc>No billing methods have been added</Orther.Desc>
        <Button>Add billing method</Button>
      </Orther.Wrapper>
    </EmptyContainer>
  );
};

export default Empty;
