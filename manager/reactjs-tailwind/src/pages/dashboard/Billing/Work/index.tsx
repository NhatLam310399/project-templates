import {
  WorkContainer,
  Title,
  VideoWrapper,
  Itemss,
  ListWrapper,
  Orther,
} from "./styles";
import { Wrapper, Container } from "designs/PageLayout";
import SVG from "designs/SVG";
interface IItem {
  icon: string;
  title: string;
  desc: string;
}
interface IWorkProps {}

const Work: React.FC<IWorkProps> = props => {
  return (
    <Wrapper>
      <Container>
        <WorkContainer>
          <Title>Billing: How does billing work?</Title>
          <VideoWrapper>
            <div className="border-solid border-2 border-neutral-3 shadow-lg">
              <iframe
                className="laptop:w-46 laptop:h-26 w-full h-full"
                src={"//www.youtube.com/embed/_3n12dh00go"}
                frameBorder={1}
              />
            </div>
          </VideoWrapper>
          <ListWrapper>
            {listItem.map((value, index) => {
              return <Item {...value} key={index} />;
            })}
          </ListWrapper>
          <Orther.Wrapper>
            <Orther.Title>Billing: How does billing work?</Orther.Title>
            <Orther.Desc>
              Want to learn more about how billing works at Kingnify? Read our
              full FAQs
            </Orther.Desc>
            <Orther.Link>Go to FAQ</Orther.Link>
          </Orther.Wrapper>
        </WorkContainer>
      </Container>
    </Wrapper>
  );
};

const listItem: IItem[] = [
  {
    icon: "billing/method",
    title: "Billing methods",
    desc: "Set a billing methods for your entire account. You can also set a billing method for each individual store.",
  },
  {
    icon: "billing/info",
    title: "Legal Info",
    desc: "Set a billing methods for your entire account. You can also set a billing method for each individual store.",
  },
  {
    icon: "billing/discount",
    title: "Discounts",
    desc: "Set a billing methods for your entire account. You can also set a billing method for each individual store.",
  },
  {
    icon: "billing/history",
    title: "Payment History",
    desc: "Set a billing methods for your entire account. You can also set a billing method for each individual store.",
  },
  {
    icon: "billing/wallet",
    title: "Kingify Wallet",
    desc: "Set a billing methods for your entire account. You can also set a billing method for each individual store.",
  },
  {
    icon: "billing/curreny",
    title: "Curreny",
    desc: "Set a billing methods for your entire account. You can also set a billing method for each individual store.",
  },
];
export default Work;

export const Item: React.FC<IItem> = ({ icon, title, desc }) => {
  return (
    <div className="p-1 laptop:w-1/3 phone:w-1/2 w-full desktop:w-1/4">
      <Itemss.Wrapper>
        <Itemss.Heading>
          <SVG name={icon} />
          <Itemss.Title>{title}</Itemss.Title>
        </Itemss.Heading>
        <Itemss.Desc>{desc}</Itemss.Desc>
        <Itemss.Link>Add billing method</Itemss.Link>
      </Itemss.Wrapper>
    </div>
  );
};
