import styled from "styled-components";
import tw from "twin.macro";
import BaseButton from "designs/BaseButton";

export const QuickDesignContainer = styled.div`
  ${tw``}
`;

export const ListDesignContainer = styled.div`
  ${tw``}
`;

export const TabItem = styled.div<{ selected: boolean }>`
  ${tw` text-xl font-medium px-1.5 pb-1 border-b-4 border-solid max-w-15`}
  ${({ selected }) => (selected ? tw`border-neutral-1` : tw`border-neutral-4`)}
`;

export const TabPanelsContainer = styled.div`
  ${tw`  `}
`;
