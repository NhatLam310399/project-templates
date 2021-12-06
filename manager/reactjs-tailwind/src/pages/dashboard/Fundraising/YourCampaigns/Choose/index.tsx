import {
  ChooseContainer,
  Title,
  Desc,
  Lable,
  Content,
  VideoWrapper,
} from "./styles";

import Button from "designs/Button";
interface IChooseProps {}

const Choose: React.FC<IChooseProps> = props => {
  return (
    <ChooseContainer>
      <Title>Choose Your Fundraiser URL (Website Link)</Title>
      <Desc>
        Note: this is your customized page URL, which can not be updated after
        your fundraiser has launched
      </Desc>
      <Lable>Your fundraiser will live at</Lable>
      <Content.Wrapper>
        <Content.BoxLink>https://customink.com/fundraising/</Content.BoxLink>
        <Content.Box>
          <p className="text-neutral-3">choose-your-url</p>
          <p className="text-neutral-1">100</p>
        </Content.Box>
      </Content.Wrapper>
      <Title>Video</Title>
      <VideoWrapper>
        Paste your video URL here (supports YouTube, Vimeo and DailyMotion)
        <Button variant="secondary" className="phone:w-17 w-full">
          Share
        </Button>
        <Button className="phone:w-17 w-full">Save & Continue</Button>
      </VideoWrapper>
    </ChooseContainer>
  );
};

export default Choose;
