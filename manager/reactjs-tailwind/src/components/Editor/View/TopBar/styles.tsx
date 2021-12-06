import styled from "styled-components";
import tw from "twin.macro";

export const TopBarContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-full border-b border-solid border-neutral-4`}
`;

export const ListTabs = styled.ul`
  ${tw`flex flex-row items-center gap-2 `}
`;

export const TabItem = styled.li`
  ${tw`relative pb-1 text-lg font-medium border-b-4 border-transparent border-solid cursor-pointer text-neutral-1`}
  &.active, &:hover {
    ${tw`border-neutral-1`}
  }
`;
