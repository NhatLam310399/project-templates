import styled from "styled-components";
import tw from "twin.macro";

export const GlanceContainer = styled.div`
  ${tw`pb-3`}
`;

export const Title = styled.div`
  ${tw`font-bold text-xxl text-neutral-1`}
`;

export const Body = styled.div`
  ${tw`pt-2`}
`;

export const Grid = {
  Row: styled.div`
    ${tw`flex flex-wrap`}
    margin-left: -8px;
    margin-right: -8px;
  `,
  Col: styled.div`
    ${tw`box-border p-[8px] laptop:w-1/3 w-full`}
  `,
};

export const Items = {
  Wrapper: styled.div`
    ${tw`bg-neutral-5 py-4 flex flex-col justify-center items-center gap-2`}
  `,
  Quantity: styled.p`
    ${tw`font-medium text-5xl text-primary-2 text-center`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-xl text-neutral-2 text-center`}
  `,
  Number: styled.span`
    ${tw`font-medium text-lg text-neutral-1 text-center`}
  `,
};
