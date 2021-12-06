import tw from "twin.macro";
import styled from "styled-components";

export const Container = styled.div`
  ${tw`flex flex-col items-start justify-between p-1 border phone:items-center phone:flex-row laptop:p-2 border-grey`}
`;

export const ImageWrapper = styled.div`
  ${tw`w-10 h-10 border phone:mr-4 laptop:w-16 laptop:h-16 border-grey`}
`;
export const Image = styled.img`
  ${tw`object-cover w-full h-full`}
`;
export const Title = styled.h1`
  ${tw`font-bold text-black phone:text-20 text-16`}
`;

export const Content = styled.div`
  ${tw`flex flex-col items-start justify-center gap-y-1`}
`;
export const TextWrap = styled.div`
  ${tw`flex flex-wrap`}
`;
export const TextContent = styled.p`
  ${tw`relative flex items-center mr-2 font-normal text-black phone:text-16 text-13`}
`;
export const ContentWrapper = styled.div`
  ${tw`flex flex-row items-center justify-start w-full gap-1 laptop:w-auto`}
`;

export const ButtonWrapper = styled.div`
  ${tw`flex items-center justify-start w-full mt-2 phone:justify-end laptop:w-auto laptop:mt-0`}
`;
export const TextButton = styled.p`
  ${tw`flex items-center justify-center h-5 font-medium text-white transition duration-200 cursor-pointer text-13 phone:text-16 w-17 bg-primary hover:bg-secondary`}
`;
