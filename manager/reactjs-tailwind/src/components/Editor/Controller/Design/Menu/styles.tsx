import styled from "styled-components";
import tw from "twin.macro";
import BaseButton from "designs/BaseButton";

export const MenuContainer = styled.div`
  ${tw`flex flex-col w-full gap-1 pb-4 border-b border-solid border-neutral-4 `}
`;

export const Row = styled.div<{ capacity?: number }>`
  ${tw`flex flex-row w-full gap-1 `}
`;

export const MenuItem = styled(BaseButton)`
  ${tw`flex flex-col items-center justify-center gap-0.5 px-2 py-1 font-semibold border-2 border-solid rounded-md hover:bg-neutral-5 border-neutral-4 text-neutral-1`}
`;
