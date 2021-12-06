import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";

export const EmployerInfoContainer = styled.div`
  ${tw`h-full flex items-center`}
`;

export const Button = styled(_Link)<{
  outline?: boolean;
  fullFill?: boolean;
  isHidden?: boolean;
}>`
  ${tw`flex items-center text-16 transform hover:scale-105 h-full px-3 font-bold mr-2`}
  ${({ outline }) =>
    outline && tw`border border-primary bg-transparent text-primary`}
  ${({ fullFill }) => fullFill && tw`bg-primary text-white`}
  ${({ isHidden }) => isHidden && tw`hidden`}
`;

export const UserButton = styled.div`
  ${tw`flex items-center cursor-pointer select-none`}
`;

export const AvatarWrapper = styled.div<{ dropdown?: boolean }>`
  ${tw`w-4 h-4 overflow-hidden rounded-full`}
  ${({ dropdown }) => (dropdown ? tw`mr-2` : tw`mr-1`)}
`;

export const Avatar = styled.img`
  ${tw`w-full h-full`}
`;

export const UserName = styled.p`
  ${tw`text-16 text-primary whitespace-nowrap mr-1`}
`;
