import styled from "styled-components";
import tw from "twin.macro";

export const ProductImportContainer = styled.div`
  ${tw`pt-5`}
`;

export const Heading = {
  Wrapper: styled.div`
    ${tw`flex justify-between items-center flex-wrap gap-2`}
  `,
  Total: styled.span`
    ${tw`font-bold text-xl text-neutral-1`}
  `,
  Content: styled.div`
    ${tw`flex gap-1`}
  `,
  Title: styled.p`
    ${tw`font-bold text-xxl text-neutral-1`}
  `,
  CircleSuccess: styled.div`
    ${tw`flex flex-shrink-0 justify-center items-center h-3 w-3 bg-sematic-3 rounded-full text-primary-3 font-normal text-lg`}
  `,
};

export const Tables = {
  Wrapper: styled.div`
    ${tw`pt-5`}
  `,
  Container: styled.table`
    ${tw`p-0 mr-0 w-full`}
  `,
  Thead: styled.thead`
    ${tw` border-b-2 border-solid border-neutral-3`}
  `,
  Tbody: styled.tbody``,
  Tr: styled.tr`
    ${tw`grid grid-cols-3 w-full mb-1`}
  `,
  Th: styled.th`
    ${tw`text-left p-1 font-normal text-neutral-2 text-lg uppercase`}
  `,
  Td: styled.td`
    ${tw`text-left p-1 font-normal text-neutral-1 text-lg `}
  `,
};

export const Orther = {
  Wrapper: styled.div`
    ${tw`pt-5 flex justify-center`}
  `,
};
