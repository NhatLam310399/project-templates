import styled from "styled-components";
import tw from "twin.macro";

export const ItemsContainer = styled.div`
  ${tw`w-full mb-5`}
`;

export const Title = styled.p`
  ${tw`font-bold text-3xl text-neutral-1 pb-2`}
`;
export const Body = {
  Wrapper: styled.div`
    ${tw`flex flex-wrap `}
  `,
  Desc: styled.div`
    ${tw`font-normal text-xl text-neutral-1 cursor-pointer w-full pr-2 pt-2 hover:underline `}
  `,
  Empty: styled.div`
    ${tw`font-normal text-xl text-neutral-1 w-full pr-2 pt-2 `}
  `,
};
