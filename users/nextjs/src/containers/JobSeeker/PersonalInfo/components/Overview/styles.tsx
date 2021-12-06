import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw`relative flex flex-col items-center justify-center w-full py-4 text-left phone:flex-row`}
`;

export const Button = styled.button`
  ${tw`absolute bottom-0 right-0 rounded-full`}
`;

export const Avatar = styled.img`
  ${tw`col-span-2`}
`;

export const AvatarWrapper = styled.div`
  ${tw`relative`}
`;

export const Content = styled.div`
  ${tw`pl-1 phone:pl-2.5`}
`;

export const Item = styled.div`
  ${tw`mb-0.5 flex items-center`}
`;

export const Text = styled.p`
  ${tw`ml-1 font-medium phone:text-20 text-18`}
`;

export const Title = styled.h1`
  ${tw`ml-1 font-bold leading-tight text-primary phone:text-26 text-24`}
`;

export const Score = styled.span`
  ${tw`font-bold text-secondary`}
`;
