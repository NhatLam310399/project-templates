import styled from "styled-components";
import tw from "twin.macro";

export const OrderContainer = styled.div`
  ${tw`bg-primary-3 pb-1`}
`;

export const Heading = {
  Wrapper: styled.div`
    ${tw`flex justify-between items-center pb-1  border-b-2 border-solid border-neutral-4`}
  `,
  Title: styled.p`
    ${tw`font-bold text-xxl text-neutral-1`}
  `,
  Link: styled.p`
    ${tw`text-primary-1 text-xl cursor-pointer`}
    &:hover {
      ${tw`underline`}
    }
  `,
};
export const Title = styled.p`
  ${tw`font-bold text-xxl text-neutral-1`}
`;
export const ActionWrapper = styled.div`
  ${tw`flex gap-2`}
`;
export const Circle = styled.div`
  ${tw`h-4 w-4 rounded-full text-primary-3 bg-sematic-1 font-normal text-xl  text-center leading-[40px]`}
`;
export const DescWrapper = styled.div`
  ${tw`flex gap-1 items-center justify-end cursor-pointer`}
`;
export const Tables = {
  Wrapper: styled.div`
    ${tw`pt-2 overflow-x-scroll laptop:overflow-x-auto`}
  `,
  Container: styled.table`
    ${tw`p-0 mr-0 laptop:w-full w-[1140px] `}
  `,
  Thead: styled.thead`
    ${tw` border-b-2 border-solid border-neutral-4`}
  `,
  Tbody: styled.tbody``,
  Tr: styled.tr`
    ${tw`grid grid-cols-3 w-full mb-1`}
  `,
  Th: styled.th`
    ${tw`text-left p-1 font-normal text-neutral-2 text-lg`}
  `,
  Td: styled.td`
    ${tw`text-left p-2 font-normal text-neutral-2 text-lg border-b-2 border-solid border-neutral-4`}
  `,
};
