import {
  FooterContainer,
  Copyright,
  SocialMediaContainer,
  FooterWrapper,
  Top,
  Bottom,
  Logo,
  ListNavigation,
} from "./styles";
import SVG from "designs/SVG";

interface IFooterProps {}

const socialMedias: { svgName: string; link: string }[] = [
  {
    svgName: "footer/facebook",
    link: "https://www.facebook.com/",
  },
  {
    svgName: "footer/twitter",
    link: "https://www.facebook.com/",
  },
  {
    svgName: "footer/youtube",
    link: "https://www.facebook.com/",
  },
  {
    svgName: "footer/instagram",
    link: "https://www.facebook.com/",
  },
];

const navigation: {
  name: string;
  link: string;
}[] = [
  {
    name: "Products",
    link: "#",
  },
  {
    name: "Services",
    link: "#",
  },
  {
    name: "Affilicate Program",
    link: "#",
  },
  {
    name: "Referral Program",
    link: "#",
  },
  {
    name: "Policies",
    link: "#",
  },
  {
    name: "Design Maker",
    link: "#",
  },
];

const Footer: React.FC<IFooterProps> = props => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <Top>
          <Logo name="logo/logo-color.png" />
          <ListNavigation>
            {navigation.map(({ name, link }) => (
              <a key={name} href={link}>
                {name}
              </a>
            ))}
          </ListNavigation>
        </Top>
        <Bottom>
          <Copyright>
            Copyright © 2020-2021 Kingify JSC.,. All rights reserved.
          </Copyright>
          <SocialMediaContainer>
            {socialMedias.map(({ svgName, link }) => (
              <a href={link}>
                <SVG name={svgName} />
              </a>
            ))}
          </SocialMediaContainer>
        </Bottom>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
