import styled from "styled-components";
import tw from "twin.macro";

export const ListMethodContainer = styled.div`
  ${tw`pb-2`}
`;

export const Heading = {
  Wrapper: styled.div`
    ${tw``}
  `,
  Title: styled.p`
    ${tw`font-bold  text-neutral-1 text-5xl`}
  `,
  Desc: styled.p`
    ${tw`font-normal  text-neutral-1 text-lg leading-6 pt-2`}
  `,
};

export const Body = styled.div`
  ${tw`pt-2`}
`;

export const Items = {
  Wrapper: styled.div`
    ${tw`p-2 border-2 border-solid border-neutral-4 rounded-md flex justify-between mb-2`}
  `,
  Content: styled.p`
    ${tw`flex gap-4 items-center`}
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
