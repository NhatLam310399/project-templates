import styled from "styled-components";
import tw from "twin.macro";

export const SupportContainer = styled.div`
  ${tw`mb-3 px-2 py-3 flex justify-between gap-1 border-2 border-neutral-4 border-solid rounded-md phone:flex-row flex-col`}
`;

export const Content = {
  Wrapper: styled.div`
    ${tw`flex gap-2 `}
  `,
  Box: styled.div`
    ${tw`flex flex-col gap-[5px]`}
  `,
  Title: styled.p`
    ${tw`font-medium text-lg text-neutral-1`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-md text-neutral-2`}
  `,
};
