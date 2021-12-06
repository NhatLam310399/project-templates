import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";
import { SVG as _SVG } from "@designs/SVG";

export const ContentContainer = styled.div`
  ${tw`fixed top-0 bottom-0 right-0 w-screen py-2 overflow-y-auto duration-150 bg-white phone:w-60 z-full`}
`;

export const Header = styled.div`
  ${tw`flex items-center justify-between px-2 phone:px-3`}
`;

export const Icon = styled(_SVG)`
  ${tw`w-8 h-8`}
`;

export const CloseIcon = styled(_SVG)`
  ${tw`w-2.5 h-2.5 cursor-pointer`}
`;

export const Title = styled.p`
  ${tw`font-bold text-black text-18 phone:text-30`}
`;

export const Login = {
  Wrapper: styled.div`
    ${tw`flex flex-col items-center w-full mt-10 font-bold text-center text-16 phone:text-20`}
  `,
  Title: styled.p`
    ${tw`mb-3 text-primary`}
  `,
  Button: styled(_Link)`
    ${tw`px-3 py-1 font-medium duration-100 border hover:no-underline text-16 border-primary w-max text-primary`}
  `,
};
export const Empty = styled.p`
  ${tw`w-full font-normal text-center text-black text-16`}
`;
export const NotifyContainer = styled.p`
  ${tw`w-full max-h-[90%] overflow-y-auto`}
`;
