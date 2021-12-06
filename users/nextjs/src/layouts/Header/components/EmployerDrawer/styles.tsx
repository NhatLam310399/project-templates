import styled from "styled-components";
import tw from "twin.macro";
import { SVG } from "@designs/SVG";
import _Link from "@designs/Link";

export const EmployerDrawerContainer = styled.div<{ isOpen?: boolean }>`
  ${tw`absolute top-0 right-0 h-screen bg-white w-40 transform duration-200`}
  ${({ isOpen }) => (isOpen ? tw`translate-x-0` : tw`translate-x-full`)}
`;

export const UserInfo = styled.div`
  ${tw`flex items-center mb-2 p-2`}
`;

export const AvatarWrapper = styled.div`
  ${tw`w-5 h-5 overflow-hidden rounded-full mr-2`}
`;

export const Avatar = styled.img`
  ${tw`w-full h-full`}
`;

export const InfoWrapper = styled.div`
  ${tw`flex-1 h-full `}
`;

export const UserName = styled.p`
  ${tw`text-20 text-primary font-medium mb-0.5`}
`;

export const Email = styled.p`
  ${tw`text-14 font-medium`}
`;

export const CloseButton = styled.div`
  ${tw`w-2.5 h-2.5 cursor-pointer`}
`;

export const CloseIcon = styled(SVG)`
  ${tw`w-full h-full`}
`;

export const Candidate = styled(_Link)`
  ${tw`flex text-16 font-medium p-2 border-t border-grey`}
`;

export const Icon = styled(SVG)`
  ${tw`w-2.5 h-2.5 mr-1`}
`;

export const Logout = styled.p`
  ${tw` flex text-16 font-medium p-2 border-t border-grey cursor-pointer select-none`}
`;
