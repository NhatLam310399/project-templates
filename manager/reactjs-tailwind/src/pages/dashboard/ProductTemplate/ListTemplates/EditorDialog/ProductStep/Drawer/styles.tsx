import styled, { css } from "styled-components";
import tw from "twin.macro";

export const ListCategoriesDrawerContainer = styled.div`
  ${tw`p-2 min-w-[300px]  hidden phone:block`}
`;
export const List = styled.ul`
  ${tw`flex flex-col`}
`;
export const ItemButton = styled.button<{ selected: boolean }>`
  ${tw`relative flex items-center justify-between w-full gap-2 p-1 text-lg font-bold rounded-sm cursor-pointer select-none text-neutral-1`}
  ${tw`hover:bg-b-1 `}
  ${({ selected }) => selected && tw`bg-b-1`}
`;

export const SubItemButton = styled.button<{ level: number; active: boolean }>`
  ${tw`py-1 pl-2 text-left border-l-2 border-transparent`}
  ${tw`hover:bg-b-1 hover:text-neutral-1`}
 
  ${({ active }) => active && tw`text-neutral-1 border-primary-1`}
  ${({ level }) => level == 1 && tw`font-bold text-neutral-2 text-md`}
  ${({ level }) => level == 2 && tw`ml-1 font-normal text-neutral-2 text-md `}
`;

export const ItemButtonLevel1 = styled.button<{ selected: boolean }>`
  ${tw`relative flex items-center justify-between w-full gap-2 p-1 text-xl font-medium rounded-sm cursor-pointer select-none text-neutral-1`}
  ${tw`hover:bg-b-1 `}
${({ selected }) => selected && tw`bg-b-1`}
`;
