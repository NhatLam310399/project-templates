import styled from "styled-components";
import tw from "twin.macro";

export const ProductTemplateCardContainer = styled.div`
  ${tw`flex flex-col w-full h-40 border border-solid rounded-lg cursor-pointer border-neutral-3 hover:shadow-md`}
`;

export const ImageWrapper = styled.div`
  ${tw`flex items-start justify-center w-full h-full`}
`;

export const TextWrapper = styled.h4`
  ${tw`h-5 px-2 py-1 text-xl font-medium text-neutral-1`}
`;
