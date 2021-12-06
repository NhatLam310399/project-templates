import { useHistory } from "react-router";

import {
  Caption,
  Email,
  HelpBoxStyle,
  HelpBoxContainer,
  HelpContainer,
  SocialContainer,
  SocialItem,
  SocialList,
  SubTitle,
} from "./styles";
import SVG from "designs/SVG";
import Button from "designs/Button";
import { Title } from "designs/Title";
import { Wrapper } from "designs/Wrapper";

import { socialFollowDescription } from "common/constants/help";
import { PATH } from "common/constants/routes";

const Help: React.FC = () => {
  const history = useHistory();

  const handleClickCenter = () => {
    history.push(PATH.HELP_CENTER);
  };

  const helpBoxData = [
    {
      hasIcon: true,
      isFullSize: true,
      title: "Have you checked our Help Center?",
      content:
        "You will find answers to many questions in our FAQ section and video tutorials.",
      method: (
        <Button type="button" size="lg" onClick={handleClickCenter}>
          Open Help Center
        </Button>
      ),
    },
    {
      hasIcon: false,
      isFullSize: false,
      title: "Chat",
      content:
        "You can chat with us from the bottom-right corner of any Kingnify page.",
      method: (
        <Button type="button" size="lg">
          Chat With Us
        </Button>
      ),
    },
    {
      hasIcon: false,
      isFullSize: false,
      title: "Email",
      content: "Whatever your question, we will get back to you.",
      method: <Email>support-fr@printful.com</Email>,
    },
  ];

  return (
    <Wrapper isBackgroundNeutral>
      <HelpContainer>
        <Title>Help</Title>
        <SubTitle>Customer Support</SubTitle>
        <HelpBoxContainer>
          {helpBoxData.map(
            ({ title, content, hasIcon, isFullSize, method }) => (
              <HelpBox
                key={title}
                hasIcon={hasIcon}
                isFullSize={isFullSize}
                title={title}
                content={content}
              >
                {method}
              </HelpBox>
            ),
          )}
        </HelpBoxContainer>
        <SocialContainer>
          <SubTitle>Join our community on social networks!</SubTitle>
          <Caption>
            Follow us to receive product information, marketing tips, tutorials
            and more
          </Caption>
          <SocialList>
            {socialFollowDescription.map(({ name, content }) => (
              <SocialItem.Container key={name}>
                <SocialItem.Image
                  src={require(`assets/images/help/${name}.png`)?.default}
                  alt={name}
                />
                <SocialItem.Name>{name}</SocialItem.Name>
                <SocialItem.TextWrapper>
                  {content.map(({ text }) => (
                    <SocialItem.TextContainer key={text}>
                      <SVG name="common/arrow-right" width="16" height="16" />
                      <SocialItem.Text>{text}</SocialItem.Text>
                    </SocialItem.TextContainer>
                  ))}
                </SocialItem.TextWrapper>
              </SocialItem.Container>
            ))}
          </SocialList>
        </SocialContainer>
      </HelpContainer>
    </Wrapper>
  );
};

export default Help;

const HelpBox: React.FC<{
  title: string;
  content: string;
  hasIcon?: boolean;
  isFullSize?: boolean;
  className?: string;
}> = ({ title, content, hasIcon, isFullSize, className, children }) => {
  return (
    <HelpBoxStyle.Container className={className} isFullSize={isFullSize}>
      {hasIcon && <SVG name="help/support" width="100" height="100" />}
      <HelpBoxStyle.Title>{title}</HelpBoxStyle.Title>
      <HelpBoxStyle.Content isFullSize={isFullSize}>
        {content}
      </HelpBoxStyle.Content>
      <HelpBoxStyle.Method>{children}</HelpBoxStyle.Method>
    </HelpBoxStyle.Container>
  );
};
