import { useState } from "react";
import { RaisingContainer, Title, ContentWrapper, Items } from "./styles";

import FormCharity from "./FormCharity";
import FormMe from "./FormMe";
import FormOrther from "./FormOther";
import SVG from "designs/SVG";

interface IRaisingProps {}

const Raising: React.FC<IRaisingProps> = props => {
  const [active, setActive] = useState<number>(1);

  const onHandleClick = (value: number) => {
    setActive(value);
  };
  return (
    <RaisingContainer>
      <Title>Who are raising money for</Title>
      <ContentWrapper>
        <Items.Wrapper
          active={active === 1 ? true : false}
          onClick={e => onHandleClick(1)}
        >
          <SVG name={active === 1 ? "fundraising/tick" : "fundraising/oval"} />
          Charity
        </Items.Wrapper>
        <Items.Wrapper
          active={active === 2 ? true : false}
          onClick={e => onHandleClick(2)}
        >
          <SVG name={active === 2 ? "fundraising/tick" : "fundraising/oval"} />
          Me
        </Items.Wrapper>
        <Items.Wrapper
          active={active === 3 ? true : false}
          onClick={e => onHandleClick(3)}
        >
          <SVG name={active === 3 ? "fundraising/tick" : "fundraising/oval"} />
          Orther
        </Items.Wrapper>
      </ContentWrapper>
      {active === 1 ? <FormCharity /> : null}
      {active === 2 ? <FormMe /> : null}
      {active === 3 ? <FormOrther /> : null}
    </RaisingContainer>
  );
};

export default Raising;
