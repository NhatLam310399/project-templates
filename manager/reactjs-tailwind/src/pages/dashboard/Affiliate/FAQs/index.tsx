import {
  FAQsContainer,
  Title,
  SubTitle,
  Text,
  Dot,
  Content,
  SubContent,
  Link,
} from "./styles";
import { Wrapper, Container } from "designs/PageLayout";
interface IFAQsProps {}

const FAQs: React.FC<IFAQsProps> = props => {
  return (
    <Wrapper>
      <Container>
        <FAQsContainer>
          <Title>Affiliate: FAQs</Title>
          <Title>General</Title>
          <SubTitle>Why am I not seeing a commission?</SubTitle>
          <Content>
            <Text>
              If the customer signed up on Printful within the last 30 days, you
              can claim this user by e-mailing us at affiliate@printful.com. If
              you successfully verify the requested information, we’ll link this
              user to your affiliate account. Please include the following
              information in the email:
            </Text>
            <SubContent>
              <Text>
                <Dot /> Customer's full name and email address
              </Text>
              <Text>
                <Dot /> Store name and URL (if exists)
              </Text>
              <Text>
                <Dot /> A proof of any correspondence between you and customer
                (screenshot of a Facebook chat, Gmail, Outlook etc.
                conversation)
              </Text>
            </SubContent>
          </Content>
          <SubTitle>
            My customer didn’t sign up using my affiliate link. Can I link this
            user to my account?
          </SubTitle>
          <Content>
            <Text>
              Commissions are calculated “on the fly”, based on the current
              situation, which can change. If the order you received the
              commission from gets refunded, we will also subtract your
              commission.
            </Text>
          </Content>
          <SubTitle>Are there orders I don’t get credited for?</SubTitle>
          <Content>
            <Text>
              You don’t get credited for sample orders. You also don’t receive a
              commission for orders submitted on the Inktale marketplace.
            </Text>
          </Content>
          <SubTitle>Is there a minimum for payout?</SubTitle>
          <Content>
            <Text>
              You can request payout when you have at least $25 in commissions.
              Payments will be delivered to you via PayPal in USD. Every payment
              is reviewed and processed manually. Usually, it takes 1-3 business
              days to receive payments.
            </Text>
          </Content>
          <SubTitle>How are commissions calculated?</SubTitle>
          <Content>
            <Text>
              {" "}
              You receive 10% of our fulfillment price. If the order includes
              taxes, these are excluded from the calculations, but discounts are
              included. For example, let's say an affiliated customer’s order
              came in with the following breakdown:
            </Text>
            <SubContent>
              <Text>SUBTOTAL: $15.00</Text>
              <Text>DISCOUNT: -$3.00</Text>
              <Text> SHIPPING & HANDLING: $5.00</Text>
              <Text> TAX: $3.10</Text>
              <Text>TOTAL: $20.10 In this example</Text>
              <Text> your commission would be 10% of $12.</Text>
            </SubContent>
          </Content>
          <SubTitle>
            Are there any restricted promotion methods for Affiliates?
          </SubTitle>
          <Content>
            <Text>
              Please review our <Link> advertising guidelines</Link> for more
              information.
            </Text>
          </Content>
        </FAQsContainer>
        <Title>Taxes</Title>
        <SubTitle>Why am I required to submit a tax form?</SubTitle>
        <Content>
          It is required by the US Internal Revenue Service (IRS) that Printful,
          Inc. reports the income paid to our independent contractors, including
          members of our affiliate program. Note that we will provide
          information only about members of the Printful affiliate program whose
          earnings reach the minimum threshold of USD 600 per year (this amount
          doesn’t include any other source of income - it only pertains to the
          money paid by the Printful affiliate program).
        </Content>
        <SubTitle>
          What form do I have to fill out? What will you do with the data?
        </SubTitle>
        <Content>
          <Text>
            US residents have to fill out Form W9, click here for an example.
            Non-US residents must provide the following forms:
            <SubContent>
              <Text>
                <Dot /> W-8BEN for individuals, click here for an example
              </Text>
              <Text>
                <Dot /> W-8BEN-E for enterprises, click here for an example.
              </Text>
            </SubContent>
          </Text>
        </Content>
        <Content>
          <Text>
            You have to fill out the appropriate form, print it, sign it, scan
            it, and submit it to Printful. At the end of the year, Printful will
            report all sales made by Printful affiliates who have reached the
            annual threshold in Form 1099 and submit it to the IRS.
          </Text>
        </Content>
        <Content>
          <Text>
            These forms won’t be sent to the IRS, Printful will use them for the
            following:
          </Text>
          <SubContent>
            <Text>
              <Dot /> To collect information about our affiliate: name, business
              name (if different), type of business, address, ID number of
              taxpayer
            </Text>
            <Text>
              <Dot /> To help affiliates avoid backup withholding (see question
              4)
            </Text>
            <Text>
              <Dot /> To use the submitted information to fill out Form 1099 and
              report your earnings to the IRS
            </Text>
          </SubContent>
        </Content>
        <Content>
          <Text>
            Information for individuals: By the end of January, Printful is
            sending you the completed Form 1099, and a copy is also being sent
            to the IRS. As you are required by law to file Form 1099 as well,
            you will need this form for tax season.
          </Text>
        </Content>
        <SubTitle>Where can I fill out my tax form?</SubTitle>
        <Content>
          <Text>
            You can fill out the form in your Affiliate Dashboard under Tax &
            Legal. You’ll be provided the correct form to be filled out based on
            your citizenship and employment status. Fill out the form, print it,
            scan it, and upload it to the Tax & Legal section. After you’ve
            submitted the form, it’ll take us 3 business days to verify it. Once
            its verified, you’ll see a verification sign next the submitted
            form.
          </Text>
        </Content>
        <SubTitle>
          <Content>
            <Text>
              {" "}
              If you are a resident of California and provide your services
              there, you must also fill out Form 590, the Withholding Exemption
              Certificate. The purpose of this form is to certify your exemption
              from the California Franchise Tax.
            </Text>
          </Content>
          <Content>
            <Text>
              If you aren’t exempt from the California Franchise Tax and your
              Printful affiliate earnings reach a threshold of USD 1500 per
              year, we will withhold the tax from your payments: 7% for US
              citizens, 12,3% for non-US citizens.
            </Text>
          </Content>
          <Content>
            <Text>
              You can fill out Form 590 in your Affiliate Dashboard under Tax &
              Legal. You’ll be asked to fill out the form if you provide
              services in California. Print out the form, fill it out, scan it,
              and upload it to the Tax & Legal section. After you’ve submitted
              the form, it’ll take us 3 business days to verify it. Once its
              verified, you’ll see a verification sign next the submitted form.
            </Text>
          </Content>
        </SubTitle>
        <SubTitle>
          Additional Form 590 (for services provided in California only)
        </SubTitle>
        <Content>
          <Text>
            If you are a resident of California and provide your services there,
            you must also fill out Form 590, the Withholding Exemption
            Certificate. The purpose of this form is to certify your exemption
            from the California Franchise Tax.
          </Text>
        </Content>
        <Content>
          <Text>
            If you aren’t exempt from the California Franchise Tax and your
            Printful affiliate earnings reach a threshold of USD 1500 per year,
            we will withhold the tax from your payments: 7% for US citizens,
            12,3% for non-US citizens.
          </Text>
        </Content>
        <Content>
          <Text>
            You can fill out Form 590 in your Affiliate Dashboard under Tax &
            Legal. You’ll be asked to fill out the form if you provide services
            in California. Print out the form, fill it out, scan it, and upload
            it to the Tax & Legal section. After you’ve submitted the form,
            it’ll take us 3 business days to verify it. Once its verified,
            you’ll see a verification sign next the submitted form.
          </Text>
        </Content>
        <SubTitle>How often should I update my information?</SubTitle>
        <Content>
          <Text>
            It’s your obligation to update your tax forms as soon as any of your
            tax information has changed.
          </Text>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default FAQs;
