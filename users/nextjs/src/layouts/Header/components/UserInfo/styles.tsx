import styled from "styled-components";
import tw from "twin.macro";
import { SVG as _SVG } from "@designs/SVG";
import _Link from "@designs/Link";

export const UserInfoContainer = styled.div`
  ${tw``}
`;

export const UserButton = styled.div`
  ${tw`px-1 py-0.5 rounded-xl flex items-center cursor-pointer select-none hover:bg-grey hover:bg-opacity-20`}
`;

export const Icon = styled(_SVG)<{ active?: boolean }>`
  ${tw`w-2.5 h-2.5 transform duration-150`}
  ${({ active }) => active && tw`rotate-180`}
`;

export const UserContainer = styled.div`
  ${tw`p-2`}
`;

export const UserName = styled.p`
  ${tw`text-16 text-primary whitespace-nowrap`}
`;

export const UserWrapper = styled.div`
  ${tw``}
`;

export const AvatarWrapper = styled.div`
  ${tw`w-4 h-4 overflow-hidden rounded-full mr-1`}
`;

export const Avatar = styled.img`
  ${tw`w-full h-full`}
`;

export const Slider = {
  Container: styled.div`
    ${tw`fixed top-0 bottom-0 h-screen z-full w-45 right-0 bg-white shadow box-border`}
  `,
  User: styled.div`
    ${tw`pt-2 pl-2 pr-2 pb-4 flex items-center w-full border-b border-grey`}
  `,
  Avatar: styled.img`
    ${tw`w-4.5 h-4.5 rounded-full mr-2`}
  `,
  InfoWrapper: styled.div`
    ${tw`w-full font-medium`}
  `,
  Name: styled.p`
    ${tw`text-20 text-primary`}
  `,
  Email: styled.p`
    ${tw`text-14 text-body`}
  `,
  Icon: styled(_SVG)`
    ${tw`w-2.5 h-2.5 cursor-pointer mr-1`}
  `,
  Link: styled(_Link)`
    ${tw`p-2 flex items-center border-b border-grey text-16 font-medium hover:bg-grey hover:bg-opacity-20`}
  `,
  Logout: styled.div`
    ${tw`p-2 flex items-center border-b border-grey text-16 font-medium hover:bg-grey hover:bg-opacity-20 cursor-pointer select-none`}
  `,
};

export const Email = styled.p`
  ${tw``}
`;
