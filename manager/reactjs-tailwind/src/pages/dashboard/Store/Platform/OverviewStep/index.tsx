import { useDispatch } from "react-redux";
import {
  OverviewContainer,
  Heading,
  Body,
  LeftSide,
  RightSide,
} from "./styles";
import { Wrapper, Container } from "designs/PageLayout";
import Image from "designs/Image";
import Imgsrc89 from "assets/images/store/image_89.png";
import Imgsrc90 from "assets/images/store/image_90.png";

import { defaultStepStore } from "redux/actions/store";
interface IOverviewProps {
  setStep: (value: number) => void;
}

const Overview: React.FC<IOverviewProps> = ({ setStep }) => {
  const dispatch = useDispatch();
  const onHandleClick = () => {
    setStep(1);
    dispatch(defaultStepStore());
  };
  return (
    <Wrapper>
      <Container>
        <OverviewContainer>
          <Heading.Wrapper>
            <Heading.Desc>
              {" "}
              <span className="text-primary-1">
                Stores / Connect to an eommonerce{" "}
              </span>
              / Esty
            </Heading.Desc>
            <Heading.Title>Connect your Etsy store to Printful</Heading.Title>
          </Heading.Wrapper>
          <Body>
            <LeftSide.Wrapper>
              <LeftSide.Step>Step 1</LeftSide.Step>
              <LeftSide.Step>Step 2</LeftSide.Step>
            </LeftSide.Wrapper>
            <RightSide.Wrapper>
              <RightSide.Content>
                <RightSide.Text>
                  Follow these steps to set up your WooCommerce store through
                  SiteGround and connect it to your Printful account.
                </RightSide.Text>
              </RightSide.Content>
              <RightSide.Content>
                <RightSide.Title>
                  Step 1: Sign up for hosting with SiteGround
                </RightSide.Title>
              </RightSide.Content>
              <RightSide.Content>
                <RightSide.Text>
                  Head over to SiteGround’s website and choose the hosting plan.
                </RightSide.Text>
                <RightSide.Text>
                  | Disclaimer: Printful might earn a commission from signups or
                  purchases completed via the above link. Read more here
                </RightSide.Text>
              </RightSide.Content>
              <RightSide.Content>
                <RightSide.Title>
                  Step 2: Sign up for hosting with SiteGround
                </RightSide.Title>
              </RightSide.Content>
              <RightSide.Content>
                <RightSide.Text>
                  After SiteGround has set everything up for you, all you have
                  to do is connect the WooCommerce store with your Printful
                  account.
                </RightSide.Text>
                <RightSide.Text>
                  1. Open the Printful tab in your WordPress dashboard and click
                  “Connect.”
                </RightSide.Text>
              </RightSide.Content>
              <RightSide.Content>
                {/* <Image src="store/image_89.png" /> */}
                <img src={Imgsrc89} alt="image" />
              </RightSide.Content>
              <RightSide.Content>
                <RightSide.Text>
                  2. Allow access to the Printful plugin
                </RightSide.Text>
              </RightSide.Content>
              <RightSide.Content>
                {/* <Image src="store/image_89.png" /> */}
                <img src={Imgsrc90} alt="image" />
              </RightSide.Content>
              <RightSide.Content>
                <RightSide.Title>
                  Step 3: Sign up for hosting with SiteGround
                </RightSide.Title>
              </RightSide.Content>
              <RightSide.Content>
                <RightSide.Text>
                  hrough the Printful plugin you can automatically create
                  products, their mockup images, descriptions, and pricing with
                  just a few clicks. Start now and add your first product!
                  That's it – you're done!
                </RightSide.Text>
              </RightSide.Content>
              <RightSide.Content>
                <RightSide.Desc onClick={onHandleClick}>
                  Click here to find out how to connect an existing WooCommerce
                  store on your own.
                </RightSide.Desc>
              </RightSide.Content>
            </RightSide.Wrapper>
          </Body>
        </OverviewContainer>
      </Container>
    </Wrapper>
  );
};

export default Overview;
