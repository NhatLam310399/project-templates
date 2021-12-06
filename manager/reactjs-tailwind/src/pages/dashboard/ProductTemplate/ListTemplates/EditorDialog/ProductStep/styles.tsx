import styled from "styled-components";
import tw from "twin.macro";

export const ProductStepContainer = styled.div`
  ${tw`min-h-screen`}
`;

export const Content = styled.div`
  ${tw`relative flex w-full h-full laptop:gap-2`}
`;

export const ListItemsContainer = styled.div`
  ${tw`w-full px-2 pt-3 pb-5`}
`;
export const ListItems = styled.div`
  ${tw`flex-wrap overflow-auto phone:hidden flex flex-row mt-1 ml-3 items-center gap-1`}
`;

export const Item = styled.div<{ isLast: boolean }>`
  ${tw`text-md font-normal cursor-pointer`}
  ${({ isLast }) =>
    isLast ? tw`font-bold text-neutral-1 ` : tw`text-neutral-3 `}
`;
export const Text = styled.p`
  ${tw``}
`;
