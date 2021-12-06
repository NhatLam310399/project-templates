import styled from "styled-components";
import tw from "twin.macro";

export const OverviewContainer = styled.div`
  ${tw`pb-5`}
`;

export const Heading = {
  Wrapper: styled.div`
    ${tw`pb-2`}
  `,
  Title: styled.p`
    ${tw`font-bold text-5xl text-neutral-1`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-lg text-neutral-1 pb-2`}
  `,
};

export const Body = styled.div`
  ${tw`flex gap-4 items-start`}
`;

export const LeftSide = {
  Wrapper: styled.div`
    ${tw`px-1 phone:block hidden`}
  `,
  Step: styled.div`
    ${tw`font-medium text-lg text-neutral-1 pb-2 w-10`}
  `,
};

export const RightSide = {
  Wrapper: styled.div`
    ${tw``}
  `,
  Title: styled.p`
    ${tw`font-bold text-xxl text-neutral-1`}
  `,
  Text: styled.p`
    ${tw`font-normal text-lg text-neutral-1`}
  `,
  Content: styled.div`
    ${tw`pb-2`}
  `,
  Desc: styled.p`
    ${tw`font-medium text-xl text-neutral-1 cursor-pointer`}
  `,
};
