import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";
import { SVG } from "@designs/SVG";

export const HeaderWrapper = styled.nav`
  ${tw`fixed left-0 right-0 z-20 w-full h-6 bg-white`}
`;
export const HeaderContainer = styled.div`
  ${tw`relative flex items-center justify-between w-full h-full `}
`;

export const LogoLink = styled(_Link)`
  ${tw`h-5 w-13`}
`;
export const Text = styled.span`
  ${tw`font-bold uppercase cursor-pointer text-16 text-primary`}
`;

export const Logo = styled.img`
  ${tw`object-cover w-full h-full`}
`;

export const NavigationWrapper = styled.div`
  ${tw`items-center justify-between flex-1 hidden h-full py-1 text-black laptop:flex`}
`;

export const PageNavigation = styled.div`
  ${tw`inline-flex items-center h-full`}
`;

export const AuthenNavigation = styled.div`
  ${tw`inline-flex items-center h-full gap-x-1`}
`;

export const Link = styled(_Link)<{
  highlight?: boolean;
  uppercase?: boolean;
}>`
  ${tw`ml-5 text-16 hover:text-secondary`}
  ${({ highlight }) => (highlight ? tw`font-bold` : tw`font-normal`)}
  ${({ uppercase }) => uppercase && tw`font-bold uppercase text-primary`}
`;

export const Button = styled(_Link)<{
  outline?: boolean;
  fullFill?: boolean;
  isHidden?: boolean;
}>`
  ${tw`flex items-center h-full px-3 font-bold text-16 hover:border-secondary`}
  ${({ outline }) =>
    outline && tw`bg-transparent border border-primary text-primary`}
  ${({ fullFill }) => fullFill && tw`text-white bg-primary hover:bg-secondary`}
  ${({ isHidden }) => isHidden && tw`hidden`}
`;

export const Seprate = styled.span`
  ${tw`h-3 mx-1 border border-grey`}
`;

// Mobile style
export const Mobile = {
  NavigationWrapper: styled.div`
    ${tw`flex items-center justify-end h-full laptop:hidden`}
  `,
  Icon: styled(SVG)`
    ${tw`w-2.5 h-2.5 ml-2 cursor-pointer`}
  `,
};

export const EmployerNavigationWrapper = styled.div`
  ${tw`flex items-center justify-between flex-1`}
`;

export const MobileButtonWrapper = styled.div`
  ${tw`flex`}
`;
export const NotifyContainer = styled.div<{ hasBorderLeft: boolean }>`
  ${tw`px-1 border-r border-grey`}
  ${({ hasBorderLeft }) => hasBorderLeft && tw`pl-2 border-l`}
`;
export const GroupInfo = styled.div`
  ${tw`flex items-center gap-1 `}
`;
