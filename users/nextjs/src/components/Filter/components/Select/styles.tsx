import styled from "styled-components";
import tw from "twin.macro";
import { Listbox } from "@headlessui/react";

export const Container = styled.div`
  ${tw`w-full `}
`;

export const ListboxButton = styled(Listbox.Button)`
  ${tw`relative w-full text-left cursor-pointer`}
`;

export const ListboxOptionsContainer = styled(Listbox.Options)`
  ${tw`absolute z-30 w-full py-1 mt-1 overflow-auto bg-white border border-solid border-tertiary max-h-60 focus:outline-none scrollbar scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent divide-y divide-line`}
`;

export const Menu = styled.div`
  ${tw`px-2 flex justify-between items-center w-full h-5 text-16 font-normal text-black leading-none bg-white border border-solid border-tertiary`};
`;

export const Text = styled.p`
  ${tw`truncate `}
`;

export const MenuItem = styled.div<{ active?: boolean }>`
  ${tw` w-full px-2 py-1.5 text-16 font-normal cursor-pointer leading-none`}
  ${({ active }) => active && tw`bg-line`}
`;
