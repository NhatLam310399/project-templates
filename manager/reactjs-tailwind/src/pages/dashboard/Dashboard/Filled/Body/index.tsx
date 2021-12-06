import { useState, useEffect } from "react";
import Section from "../../components/Section";
import Videos from "../../components/Videos";
import ShortCuts from "../../components/Shortcuts";
import { BodyContainer, Content } from "./styles";

import Challenge from "./Challenge";
import Tips from "./Tips";
import Seller from "./Seller";

interface IBodyProps {}

const Body: React.FC<IBodyProps> = props => {
  return (
    <BodyContainer>
      <Content>
        <Section title="Kingify Challenge">
          <Challenge />
        </Section>
        <Section title="Kingify Tips">
          <Tips />
        </Section>
      </Content>
      <Content>
        <Section title="Your go-to shortcuts">
          <ShortCuts />
        </Section>
        <Section title="Videos">
          <Videos />
        </Section>
        <Section title="Best seller product">
          <Seller />
        </Section>
      </Content>
    </BodyContainer>
  );
};

export default Body;
