import styled from "styled-components";
import tw from "twin.macro";

export const BillMethodContainer = styled.div`
  ${tw`pt-2`}
`;

export const OrtherMethod = {
  Wrapper: styled.div``,
  Title: styled.p`
    ${tw`font-bold text-xxl text-neutral-1 pb-1`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-lg text-neutral-1`}
  `,
};

export const Items = {
  Wrapper: styled.div`
    ${tw`p-2 border-2 border-solid border-neutral-4 rounded-md flex justify-between`}
  `,
  Content: styled.p`
    ${tw`flex gap-2 items-center`}
  `,
  HeadingWrapper: styled.div`
    ${tw`flex flex-col gap-[4px]`}
  `,
  Title: styled.p`
    ${tw`font-normal text-lg text-neutral-1`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-lg text-neutral-2`}
  `,
};
