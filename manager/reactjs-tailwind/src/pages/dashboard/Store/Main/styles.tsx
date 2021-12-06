import styled from "styled-components";
import tw from "twin.macro";

export const MainContainer = styled.div`
  ${tw`pb-5`}
`;

export const Heading = {
  Wrapper: styled.div`
    ${tw`pb-2 text-center`}
  `,
  Title: styled.p`
    ${tw`font-bold text-5xl text-neutral-1 pb-1 `}
  `,
  Desc: styled.p`
    ${tw`font-normal text-neutral-2 text-xxl `}
  `,
  Detail: styled.p`
    ${tw`font-bold text-neutral-1 text-xxl text-left`}
  `,
};

export const Body = styled.div`
  ${tw`flex flex-wrap w-full`}
`;

export const Items = {
  Wrapper: styled.div`
    ${tw`px-[16px] py-2 border-2 border-solid border-neutral-4 rounded-md w-full flex justify-start flex-col items-center  hover:shadow-md mx-0`}
    ${tw`phone:-mx-1`}
  `,
  Content: styled.div`
    ${tw`flex flex-wrap pb-2 gap-[8px] min-h-[140px] items-start justify-center `}
  `,
  Title: styled.p`
    ${tw`font-medium text-xl text-neutral-1 pb-2 text-center`}
  `,
};
