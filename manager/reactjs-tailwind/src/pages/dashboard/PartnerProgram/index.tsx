import {
  PartnerProgramContainer,
  Heading,
  Body,
  Itemss,
  Orther,
} from "./styles";
import { Wrapper, Container } from "designs/PageLayout";
import PartnerProgramImg from "assets/images/partner-program/partner-program.png";
import AffiliateImg from "assets/images/partner-program/affiliate.png";
import SponsorshipImg from "assets/images/partner-program/sponsorship.png";
import Button from "designs/Button";
import { useRedirect } from "hooks/useRedirect";

interface IPartnerProgramProps {}
interface IData {
  img: string;
  url: string;
  title: string;
  desc: string;
  detail: string[];
}
const PartnerProgram: React.FC<IPartnerProgramProps> = props => {
  return (
    <Wrapper>
      <Container>
        <PartnerProgramContainer>
          <Heading.Wrapper>
            <Heading.Content>
              <Heading.Title>
                Earning rewards with Kingify Partner Program!
              </Heading.Title>
              <Heading.Desc>
                Check out Kingify's Partner programs, join one, start promoting
                Kingify, and earn rewards!
              </Heading.Desc>
            </Heading.Content>
            <Heading.Img src={PartnerProgramImg} className="w-28 h-28" />
          </Heading.Wrapper>
          <Body.Wrapper>
            <Body.Title>
              Choose the program that’s right for you and promote Kingify
            </Body.Title>
            <Body.Content>
              {listData.map((value, index) => {
                return <Item {...value} key={index} />;
              })}
            </Body.Content>
          </Body.Wrapper>
          <Orther.Wrapper>
            <Orther.Title>How it works?</Orther.Title>
            <Orther.Content>
              <Orther.ItemsWrapper>
                <p>1</p>
                <p>Choose the program that’s right for you</p>
              </Orther.ItemsWrapper>
              <Orther.ItemsWrapper>
                <p>2</p>
                <p>
                  Get your endorsement for Affiliate and Ambassador programs and
                  receive your unique referral link, or get it right away with
                  the Referral Program
                </p>
              </Orther.ItemsWrapper>
              <Orther.ItemsWrapper>
                <p>3</p>
                <p>
                  Share the link with your audience or with those around you
                </p>
              </Orther.ItemsWrapper>
              <Orther.ItemsWrapper>
                <p>4</p>
                <p>
                  Get different benefits depending on the program you choose
                </p>
              </Orther.ItemsWrapper>
            </Orther.Content>
          </Orther.Wrapper>
        </PartnerProgramContainer>
      </Container>
    </Wrapper>
  );
};

const listData: IData[] = [
  {
    img: SponsorshipImg,
    url: "/sponsorship",
    title: "Referral Program",
    desc: "Do you want to earn rewards by recommending Kingify to others? Use Kingifys Referral program to refer friends, family, coworkers, or anyone.",
    detail: [
      "$ 5 off for your friends on their first order",
      "$ 5 in Kingify Points to spend on perks",
      "A chance to win up to $ 1000 in Kingify points",
    ],
  },
  {
    img: AffiliateImg,
    url: "/affiliate/overall",
    title: "Affiliate Program",
    desc: "Are you a blogger, YouTuber, or other channel with an audience that could use Kingify? If yes, join our Affiliate Program and earn 10% money on every sale you refer to Kingify!",
    detail: [
      "10% for each order",
      "Recurring commission for 9 months",
      "Referrals and unlimited earnings",
    ],
  },
];
export default PartnerProgram;

export const Item: React.FC<IData> = props => {
  const redirect = useRedirect();
  const onHandleClick = (props: IData) => {
    redirect(props.url);
  };
  return (
    <div className="p-1 laptop:w-1/2 w-full desktop:w-1/3">
      <Itemss.Wrapper>
        <div className="flex justify-center pb-1">
          <Itemss.Img src={props.img} className="w-15 h-10" />
        </div>

        <Itemss.Title>{props.title}</Itemss.Title>
        <Itemss.Desc>{props.desc}</Itemss.Desc>
        <Itemss.Title>What you get:</Itemss.Title>
        <div className="px-1 pb-1">
          {props.detail.map((value, index) => {
            return (
              <Itemss.Detail>
                <span className="font-bold">.</span> {""} {value}
              </Itemss.Detail>
            );
          })}
        </div>
        <Button onClick={e => onHandleClick(props)}>Get started</Button>
      </Itemss.Wrapper>
    </div>
  );
};
