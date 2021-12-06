import styled from "styled-components";
import tw from "twin.macro";

export const ConnectContainer = styled.div`
  ${tw`pb-5`}
`;

export const Heading = {
  Wrapper: styled.div`
    ${tw`pb-2`}
  `,
  Title: styled.p`
    ${tw`font-normal text-lg text-neutral-1`}
  `,
};

export const Body = styled.div`
  ${tw`flex flex-wrap w-full -mx-1`}
`;

export const Items = {
  Wrapper: styled.div`
    ${tw`p-2 border-2 border-solid border-neutral-4 rounded-md hover:shadow-md`}
  `,
  Heading: styled.div`
    ${tw`flex items-center pb-1 gap-2`}
  `,
  Title: styled.p`
    ${tw`font-medium text-lg text-neutral-1`}
  `,
  Desc: styled.p`
    ${tw`pt-[4px] font-normal text-md text-neutral-1`}
  `,
  Detail: styled.p`
    ${tw`font-normal text-md text-neutral-1 leading-6 pb-1`}
  `,
};
