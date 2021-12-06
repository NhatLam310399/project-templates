import styled from "styled-components";
import tw from "twin.macro";

export const ProductBasicContainer = styled.div`
  ${tw`relative border-2 border-solid rounded-sm cursor-pointer w-22 border-neutral-4`}
  &:hover {
    ${tw`shadow-lg`}
  }
`;
export const Seller = styled.div`
  ${tw`absolute p-1 font-medium rounded-lg right-1 top-2 bg-sematic-1 text-primary-3 text-md`}
`;
export const Image = styled.img`
  ${tw`w-full rounded-tl-sm rounded-tr-sm h-19`}
`;

export const Title = styled.p`
  ${tw`p-1 text-lg font-normal text-neutral-1`}
`;

export const Price = styled.p`
  ${tw`px-1 pb-1 text-lg font-medium text-neutral-1`}
`;
