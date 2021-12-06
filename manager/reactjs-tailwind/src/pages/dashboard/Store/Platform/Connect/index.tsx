import { string } from "yup/lib/locale";
import { ConnectContainer, Heading, Body, Items } from "./styles";
import { Wrapper, Container } from "designs/PageLayout";
import SVG from "designs/SVG";
import Button from "designs/Button";
interface IConnectProps {
  setStep: (value: number) => void;
}

interface IData {
  title: string;
  image: string;
  desc: string;
  detail: string;
}

const Connect: React.FC<IConnectProps> = ({ setStep }) => {
  const onHanleClick = (value: IData) => {
    setStep(2);
  };
  return (
    <Wrapper>
      <Container>
        <ConnectContainer>
          <Heading.Wrapper>
            <Heading.Title>
              <span className="text-primary-1">Stores </span>/ Connect to an
              eommerce platform
            </Heading.Title>
          </Heading.Wrapper>
          <Body>
            {listData.map((value, index) => {
              return <Item {...value} key={index} onClick={onHanleClick} />;
            })}
          </Body>
        </ConnectContainer>
        ;
      </Container>
    </Wrapper>
  );
};

const listData: IData[] = [
  {
    title: "Esty ",
    image: "store/esty",
    desc: "Market place",
    detail: "Ecommerce platform with everything you need to sell online",
  },
  {
    title: "Ebay ",
    image: "store/ebay",
    desc: "Market place",
    detail: "Ecommerce platform with everything you need to sell online",
  },
  {
    title: "Woo",
    image: "store/woo",
    desc: "Open source platform",
    detail: "Ecommerce platform with everything you need to sell online",
  },
  {
    title: "Amazone ",
    image: "store/amazone",
    desc: "Market place",
    detail: "Ecommerce platform with everything you need to sell online",
  },
  {
    title: "W ",
    image: "store/w",
    desc: "Market place",
    detail: "Ecommerce platform with everything you need to sell online",
  },
  {
    title: "Esty ",
    image: "store/esty",
    desc: "Market place",
    detail: "Ecommerce platform with everything you need to sell online",
  },
  {
    title: "WIX ",
    image: "store/wix",
    desc: "Platform",
    detail: "Ecommerce platform with everything you need to sell online",
  },
  {
    title: "Esty ",
    image: "store/ebay",
    desc: "Market place",
    detail: "Ecommerce platform with everything you need to sell online",
  },
];
export default Connect;

interface ITemProps extends IData {
  onClick?: (value: IData) => void;
}
export const Item: React.FC<ITemProps> = ({ onClick, ...rest }) => {
  const onHanleClick = (rest: IData) => {
    onClick && onClick(rest);
  };
  return (
    <div className="laptop:w-1/3 phone:w-1/2 w-full desktop:w-1/4 p-1">
      <Items.Wrapper>
        <Items.Heading>
          <SVG name={rest.image} />
          <div>
            <Items.Title>{rest.title}</Items.Title>
            <Items.Desc>{rest.desc}</Items.Desc>
          </div>
        </Items.Heading>
        <Items.Detail>{rest.detail}</Items.Detail>
        <div className="flex justify-center">
          <Button variant="secondary" onClick={e => onHanleClick(rest)}>
            Connect
          </Button>
        </div>
      </Items.Wrapper>
    </div>
  );
};
