import styled from "styled-components";
import tw from "twin.macro";

export const ListHelpCenterTypeContainer = styled.div`
  ${tw`  `}
`;

export const ListCategory = styled.div`
  ${tw`flex gap-2 pt-4 pb-6 justify-center flex-wrap`}
`;
export const CategoryItem = {
  Container: styled.div`
    ${tw`w-1/3 bg-primary-3 flex flex-col items-center py-5.5`}
  `,
  Name: styled.h3`
    ${tw`text-xxl font-bold py-[16px] text-center`}
  `,
};
