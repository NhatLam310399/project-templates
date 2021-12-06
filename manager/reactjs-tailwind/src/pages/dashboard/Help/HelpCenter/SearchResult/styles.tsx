import styled from "styled-components";
import tw from "twin.macro";

export const SearchResultContainer = styled.div`
  ${tw`pt-4 pb-5`}
`;

export const Title = styled.h1`
  ${tw`font-bold text-4xl text-neutral-1 text-center`}
`;

export const BodyWrapper = styled.div`
  ${tw`pt-2`}
`;
export const Item = {
  Wrapper: styled.div`
    ${tw`py-2 border-b-2 border-solid border-neutral-4`}
  `,
  Title: styled.p`
    ${tw`font-normal text-xl text-neutral-1  hover:underline cursor-pointer`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-xl text-neutral-2  pt-1`}
  `,
};
