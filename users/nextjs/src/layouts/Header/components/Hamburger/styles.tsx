import styled from "styled-components";
import tw from "twin.macro";
import { SVG as _SVG } from "@designs/SVG";
import _Link from "@designs/Link";

export const HamburgerContainer = styled.div`
  ${tw`block laptop:hidden`}
`;

export const Icon = styled(_SVG)`
  ${tw`w-2.5 h-2.5 cursor-pointer`}
`;

export const Dropdown = {
  Container: styled.div`
    ${tw`flex flex-col absolute top-0 left-0 right-0 bg-white text-black text-16 font-normal shadow z-50`}
  `,
  CloseIcon: styled(_SVG)`
    ${tw`w-2.5 h-2.5 cursor-pointer ml-auto mb-2 mr-2 mt-2`}
  `,
  Icon: styled(_SVG)`
    ${tw`w-2.5 h-2.5 mr-1`}
  `,
  Navigation: styled.div`
    ${tw`grid gap-2 border-t border-b border-grey py-2`}
  `,
  Link: styled(_Link)<{ secondary?: boolean; separate?: boolean }>`
    ${tw`inline-flex items-center font-medium px-2`}
    ${({ secondary }) => (secondary ? tw`text-secondary` : tw`text-black`)}
    ${({ separate }) => separate && tw`border-r-2 border-body`}
  `,
  Notification: styled.div`
    ${tw`flex items-center cursor-pointer select-none p-2 border-b border-grey font-medium`}
  `,
  Authen: styled.div`
    ${tw`py-2`}
  `,
  Text: styled.p`
    ${tw``}
  `,
  ButtonWrapper: styled.div`
    ${tw`p-2 flex border-t border-grey`}
  `,
  Button: styled.a`
    ${tw`text-secondary py-1 font-bold w-full border border-secondary text-center select-none`}
  `,
  Logout: styled.div`
    ${tw`cursor-pointer p-2 flex items-center font-medium`}
  `,
};
