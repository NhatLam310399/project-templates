import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw`my-4 `}
`;
export const WrapperBG = styled.div`
  ${tw`p-1 bg-white laptop:p-4`}
`;
export const Title = styled.h3`
  ${tw`mb-4 font-bold text-black text-20 laptop:text-26`}
`;
export const TabItem = styled.div<{ selected: boolean }>`
  ${tw`relative flex items-center justify-center mr-4 cursor-pointer`};
  ${({ selected }) =>
    selected && tw`border-b-3 border-secondary text-secondary`};
  &:not(:last-child) {
    &:after {
      content: "";
      ${tw`absolute w-[1px] bg-black h-full -right-2`}
    }
  }
`;
