import styled from "styled-components";
import tw from "twin.macro";

export const ProductTempCardContainer = styled.div`
  ${tw`w-full h-full px-1 pb-1 border border-solid rounded-lg cursor-pointer border-neutral-3 hover:shadow-md`}
`;

export const ImageContainer = styled.div`
  ${tw`flex flex-col items-center w-full overflow-hidden h-22`}
`;

export const Content = styled.div`
  ${tw`p-1 text-neutral-1 space-y-0.5`}
`;

export const Title = styled.h3`
  ${tw`text-lg font-semibold `}
`;

export const Text = styled.p`
  ${tw`font-normal text-md`}
`;
