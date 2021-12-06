import styled from "styled-components";
import tw from "twin.macro";

export const StatisticsContainer = styled.div`
  ${tw`pb-5`}
`;

export const Title = styled.p`
  ${tw`font-bold text-5xl text-neutral-1 pb-5`}
`;

export const Grid = {
  Wrapper: styled.div`
    ${tw`pb-4`}
  `,
  Row: styled.div`
    ${tw`flex flex-wrap`}
  `,
  Col: styled.div`
    ${tw` box-border -mx-1 py-4 px-1 desktop:w-1/2 phone:w-1/2 w-full `}
  `,
};

export const Item = {
  Wrapper: styled.div`
    ${tw`flex p-1 flex-col gap-2`}
  `,
  Title: styled.p`
    ${tw`font-bold text-xxl text-neutral-1`}
  `,
  Body: styled.div<{ pb0?: boolean }>`
    ${tw`py-4 border-2 border-solid border-neutral-4 bg-neutral-5 rounded-md w-full flex flex-col gap-2 items-center justify-center`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-lg text-neutral-1`}
  `,
  SubTitle: styled.p`
    ${tw`font-medium text-xl text-neutral-1`}
  `,
};

export const Other = {
  Wrapper: styled.div`
    ${tw`w-full`}
  `,
  Title: styled.p`
    ${tw`font-bold text-xxl text-neutral-1 w-full`}
  `,
  Heading: styled.div`
    ${tw`flex flex-col gap-1 phone:flex phone:justify-between phone:flex-row pb-2`}
  `,
};

export const Table = {
  Wrapper: styled.div`
    ${tw`w-full overflow-auto bg-neutral-5`}
  `,
  Heading: styled.div`
    ${tw`p-1 flex justify-between border-2 border-solid border-neutral-4 border-b-0`}
  `,
  Body: styled.div`
    ${tw`flex flex-col justify-between items-center`}
  `,
};
