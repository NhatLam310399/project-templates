import styled from "styled-components";
import tw from "twin.macro";
import BaseButton from "designs/BaseButton";

export const ToolbarContainer = styled.div`
  ${tw`relative z-10 flex flex-col items-center justify-center w-full h-5 bg-primary-3 `}
`;

export const Shadow = styled.div`
  ${tw`h-1.5 left-0 bottom-0 w-full transform -z-1 absolute`}
  box-shadow: 0 5px 13px 3px rgb(0 0 0 / 3%);
  transform: scale(0.95);
`;

export const ListTabs = styled.ul`
  ${tw`flex flex-row items-center justify-center w-full h-full gap-0.5 bg-primary-3`}
`;

export const TabItem = styled(BaseButton)<{ active: boolean }>`
  ${tw`relative flex flex-row items-center h-4 gap-0.5 px-1 text-lg font-medium border-b-4 border-transparent border-solid rounded-md cursor-pointer hover:bg-neutral-4 text-neutral-1`}
  ${({ active }) =>
    active && tw`text-primary-3 bg-primary-1 hover:bg-primary-1`}
`;
