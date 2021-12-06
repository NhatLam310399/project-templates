import tw from "twin.macro";
import styled from "styled-components";

export const Container = styled.div`
  ${tw`p-2 mb-2 bg-white cursor-pointer select-none phone:p-4 phone:mb-4`}
`;

export const Title = styled.h1`
  ${tw`font-bold leading-tight text-black phone:text-26 text-24`}
`;

export const ContentWrapper = styled.div`
  ${tw`mt-2 border-2 border-dashed border-body`}
`;

export const Content = styled.div`
  ${tw`flex flex-row items-center p-2 phone:p-4`}
`;

export const Description = styled.div`
  ${tw`mr-auto`}
`;

export const Text = styled.p`
  ${tw`font-normal text-black phone:text-16 text-13`}
`;

export const CVDescription = styled.span`
  ${tw`font-medium phone:text-20 text-16 text-secondary`}
`;
