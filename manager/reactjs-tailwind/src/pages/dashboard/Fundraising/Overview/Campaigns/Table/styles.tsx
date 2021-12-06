import styled from "styled-components";
import tw from "twin.macro";

export const TableContainer = styled.div`
  ${tw`pb-3`}
`;

export const Heading = {
  Wrapper: styled.div`
    ${tw`px-2 py-1 bg-primary-1 rounded-md flex gap-2 items-center overflow-auto`}
  `,
  Content: styled.div`
    ${tw`gap-2 flex items-center flex-shrink-0 `}
  `,
  Title: styled.p`
    ${tw`font-medium text-lg text-primary-3`}
  `,
  IconWrappre: styled.div`
    ${tw`flex gap-1 items-center`}
  `,
};

export const Status = {
  Wrapper: styled.div`
    ${tw`px-1 py-[4px] bg-primary-3 rounded-md  flex gap-1 items-center`}
  `,
  Title: styled.div`
    ${tw`font-normal text-sm text-neutral-1`}
  `,
  Number: styled.p<{ active?: boolean }>`
    ${tw`font-normal text-sm  px-[4px] py-[1px] rounded-md`}
    ${({ active }) =>
      active
        ? tw`bg-primary-1 text-primary-3`
        : tw`text-neutral-1 bg-neutral-4`}
  `,
};

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
    ${tw`bg-neutral-5 rounded-md relative`}
  `,
  Draft: styled.div`
    ${tw`absolute py-1 px-3 bg-sematic-1 text-primary-3 font-normal text-sm top-2 left-0`}
  `,
  Name: styled.p`
    ${tw`font-medium text-lg text-neutral-1 text-center`}
  `,
  Content: styled.div`
    ${tw`flex gap-2 justify-center pt-1`}
  `,
  Box: styled.div`
    ${tw`py-1 px-2 flex flex-col items-center justify-center bg-neutral-4`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-sm text-neutral-2 text-center`}
  `,
  Number: styled.span`
    ${tw`font-bold text-xxl text-neutral-1 text-center`}
  `,
};
