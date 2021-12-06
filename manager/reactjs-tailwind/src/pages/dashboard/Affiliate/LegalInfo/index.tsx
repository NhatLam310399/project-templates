import {
  LegalInfoContainer,
  Title,
  SubTitle,
  Content,
  Text,
  Dot,
  SubContent,
  Link,
} from "./styles";

import Form from "./Form";
import { Wrapper, Container } from "designs/PageLayout";

interface ILegalInfoProps {}

const LegalInfo: React.FC<ILegalInfoProps> = props => {
  return (
    <Wrapper>
      <Container>
        <LegalInfoContainer>
          <Title>Affiliate: Legal Info</Title>
          <SubTitle>Legal Info</SubTitle>
          <Content>
            <Text>
              In order to receive affiliate payments, you’re required to submit
              a tax form. It is a requirement by the US Internal Revenue Service
              (IRS) that Printful Inc. reports all income paid to our
              independent contractors, including members of the affiliate
              program.
            </Text>
          </Content>
          <Content>
            <Text>
              To do this please fill out the appropriate form and then print it,
              sign it, scan it, and submit it to Printful. We’ll submit the
              necessary data in Form 1099 to the IRS at the end of the year.
            </Text>
          </Content>
          <Content>
            <Text>US residents have to fill out Form W-9.</Text>
          </Content>
          <Content>
            <Text>Non-US residents must provide the following forms:</Text>
            <SubContent>
              <Text>
                <Dot /> W-8BEN for individuals
              </Text>
              <Text>
                <Dot /> W-8BEN for enterprises
              </Text>
            </SubContent>
          </Content>
          <Content>
            <Text>
              {" "}
              If you’re a resident of California and you provide your services
              there, you’re required to fill out Form 590 - Withholding
              Exemption Certificate. This is to certify your exemption from the
              California Franchise Tax. Please consult our FAQ for more details.
            </Text>
          </Content>
          <Content>
            <Text>
              Please consult <Link>our FAQ</Link> for more detail
            </Text>
          </Content>
          <Form />
        </LegalInfoContainer>
      </Container>
    </Wrapper>
  );
};

export default LegalInfo;
